using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SprintsECommerce.Data;
using SprintsECommerce.Models;
using System.Text;

namespace SprintsECommerce.Controllers
{
    [ApiController]
    [Authorize(Roles = "admin")]
    [Route("api/admin")]
    public class AdminController : ControllerBase
    {
        #region Fields & Constructor
        private readonly ApplicationDbContext _db;
        private readonly UserManager<User> _userManager;

        public AdminController(
            ApplicationDbContext db,
            UserManager<User> userManager
            )
        {
            _db = db;
            _userManager = userManager;
        }
        #endregion

        #region Assign Role
        [HttpPost("assignRole")]
        public async Task<IActionResult> AssignRole(AssignRole request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user is null) return NotFound("User not found");

            Roles roles = new();
            if (!roles.Contains(request.Role)) return BadRequest();

            IdentityResult result = await _userManager.AddToRoleAsync(user, request.Role);
            if (result.Succeeded) return Ok();
            else return new ObjectResult(result.Errors.ToArray()[0]) { StatusCode = 406 };
        }
        #endregion    

        #region Customer Activities
        [HttpPost("getCustomerActivities")]
        public IActionResult GetCustomerActivities(CustomerActivities request)
        {
            var users = _userManager.Users.ToArray();

            if (request.JoiningDate.Length > 0)
                users = users.Where(e => e.JoiningDate.ToShortDateString() == DateTime.Parse(request.JoiningDate).ToShortDateString()).ToArray();
            if (request.Email.Length > 0)
                users = users.Where(e => e.Email == request.Email).ToArray();
            if (request.Status.Length > 0)
                users = users.Where(e => e.Status == request.Status).ToArray();

            return Ok(users.Select(e => new
            {
                e.Email,
                Orders = _db.Orders.Where(o => o.User == e).ToArray(),
                CartContent = _db.Carts.Where(o => o.User == e).ToArray(),
                Reviews = _db.Reviews.Where(o => o.User == e).ToArray(),
                e.JoiningDate
            }));
        }
        #endregion

        #region Manage Customers
        // To manage user statuses
        [HttpPost("manageCustomer")]
        public async Task<IActionResult> ManageCustomer(ManageCustomer request)
        {
            // Request Validation
            UserStatuses userStatuses = new();
            if (!userStatuses.Contains(request.Status)) return BadRequest();

            var user = _userManager.FindByEmailAsync(request.Email).Result;
            if (user is null) return NotFound("User does not exist");

            // HttpPost Action
            user.Status = request.Status;
            await _db.SaveChangesAsync();
            return Ok();
        }
        #endregion

        #region Get Products
        [HttpGet("getProducts")]
        public IActionResult GetProducts()
        {
            var products = _db.Products.ToArray();
            return Ok(_db.Products.Select(e => new
            {
                productId = e.Id,
                e.Name,
                e.Description,
                category = e.Category.Name,
                brand = e.Brand.Name,
                e.Price,
                e.Color,
                e.Reviews,
                orderId = e.Order.Id,
                e.DateAdded,
                e.StockAvailability,
                e.DateReturned,
                e.ReasonOfReturn,
            }).ToArray());
        }
        #endregion

        #region Get Orders
        [HttpPost("getOrders")]
        public IActionResult GetOrders(GetOrdersRequest request)
        {
            OrderStatus orderStatus = new();
            var orders = _db.Orders.ToArray();

            if (request.OrderStatus is not null)
            {
                if (!orderStatus.Contains(request.OrderStatus)) return BadRequest();
                orders = orders.Where(e => e.Status == request.OrderStatus).ToArray();
            }
            if (request.UserEmail is not null)
                orders = orders.Where(e => e.User.UserName == request.UserEmail).ToArray();
            if (request.CreationDate is not null)
                orders = orders.Where(e => e.Date.ToShortDateString() == DateTime.Parse(request.CreationDate).ToShortDateString()).ToArray();

            return Ok(orders);
        }
        #endregion

        #region Manage Product
        [HttpPost("manageProduct")]
        public async Task<IActionResult> ManageProduct([FromForm] ManageProductRequest request)
        {
            Actions actions = new();
            Brand? brand = _db.Brands.FirstOrDefault(e => e.Name == request.Brand);
            Category? category = _db.Categories.FirstOrDefault(e => e.Name == request.Category);
            Product? product = _db.Products.FirstOrDefault(e => e.Id == request.ProductId);

            // Validations
            if (category is null)
                return BadRequest("Invalid Category");
            if (brand is null)
                return BadRequest("Invalid Brand");
            if (request.Price < 0)
                return BadRequest("Invalid price");
            if (request.DeliveryNotice < 1)
                return BadRequest("Invalid delivery notice");
            if ((request.Action == actions.Remove || request.Action == actions.Update) && request.ProductId is null)
                return BadRequest("Kindly provide the productId");

            // Saving the image
            StringBuilder imagePaths = new();
            ImageTypes imageTypes = new();

            if (request.Images is not null)
            {
                for (int i = 0; i < request.Images.Count; i++)
                {
                    IFormFile? image = request.Images[i];
                    if (!imageTypes.Contains(Path.GetExtension(image.FileName)[1..].ToUpper()))
                        return BadRequest("Invalid Image Type");

                    if (image.Length > 0)
                    {
                        string imageName = $"product-{request.Name}-{i}{Path.GetExtension(image.FileName)}";
                        string imagePath = Path.Combine($"{Directory.GetCurrentDirectory()}\\wwwroot\\images\\products", imageName);

                        using var stream = System.IO.File.Create(imagePath);
                        await image.CopyToAsync(stream);
                        imagePaths.Append($"images/products/{imageName};");
                    }
                }
            }

            if (product is not null && request.Action == actions.Update)
            {
                product.Name = request.Name;
                product.Price = request.Price;
                product.DeliveryNotice = request.DeliveryNotice;
                product.CategoryId = category.Id;
                product.BrandId = brand.Id;
                product.Color = request.Color ?? null;
                product.Description = request.Description ?? null;
                product.Images = imagePaths.ToString() ?? null;
                product.StockAvailability = request.StockAvailability == "on";

                await _db.SaveChangesAsync();
                return Ok();
            }
            else if (product is not null && request.Action == actions.Remove)
            {
                _db.Products.Remove(product);
                await _db.SaveChangesAsync();
                return Ok();
            }
            else if (product is null && request.Action == actions.Add)
            {
                _db.Products.Add(new Product
                {
                    Name = request.Name,
                    Price = request.Price,
                    DeliveryNotice = request.DeliveryNotice,
                    CategoryId = category.Id,
                    BrandId = brand.Id,
                    Color = request.Color ?? null,
                    Description = request.Description ?? null,
                    Images = imagePaths.Length == 0 ? null : imagePaths.ToString(),
                    StockAvailability = request.StockAvailability == "on"
                });

                await _db.SaveChangesAsync();
                return Ok();
            }
            else return BadRequest();
        }
        #endregion

        #region Manage Order Status
        [HttpPost("manageOrderStatus")]
        public async Task<IActionResult> ManageOrderStatus(ManageOrderRequest request)
        {
            OrderStatus statuses = new();
            if (!statuses.Contains(request.Status))
                return BadRequest();

            var order = _db.Orders.FirstOrDefault(e => e.Id == request.OrderId);
            if (order is null)
                return NotFound("This order does not exist");

            order.Status = request.Status;
            await _db.SaveChangesAsync();
            return Ok();
        }
        #endregion

        #region Statistics
        [HttpPost("getStats")]
        public IActionResult GetStats(StatsRequest request)
        {
            Stats stats = new();
            OrderStatus orderStatus = new();
            UserStatuses userStatuses = new();

            if (request.Criteria == stats.TotalIncome)
                return Ok(_db.Orders.Where(e => e.Status == orderStatus.Delivered).Select(e => e.Money).Sum());
            else if (request.Criteria == stats.UsersCount)
                return Ok(_db.Users.Count(e => e.Status != userStatuses.Suspended));
            else if (request.Criteria == stats.NewCustomersCount)
                return Ok(_db.Users.Count(e => DateTime.Now.AddDays(-7) <= e.JoiningDate));
            else if (request.Criteria == stats.TodayOrdersCount)
                return Ok(_db.Orders.Count(e => e.Date == DateTime.Now));
            else if (request.Criteria == stats.OrdersCount)
                return Ok(_db.Orders.Count());

            else return BadRequest();
        }
        #endregion

        #region Manage Category
        [HttpPost("manageCategory")]
        public async Task<IActionResult> ManageCategory([FromForm] ManageBrandCategory request)
        {
            var category = _db.Categories.FirstOrDefault(e => e.Name == request.Name);
            Actions actions = new();

            if (category is not null && request.Action == actions.Remove)
                _db.Categories.Remove(category);
            else if (category is not null & request.Action == actions.Add)
                return new ObjectResult("Category already exists") { StatusCode = 405 };

            StringBuilder imagePaths = new();
            ImageTypes imageTypes = new();

            if (request.Images is not null)
            {
                for (int i = 0; i < request.Images.Count; i++)
                {
                    IFormFile? image = request.Images[i];
                    if (!imageTypes.Contains(Path.GetExtension(image.FileName)[1..].ToUpper()))
                        return BadRequest("Invalid Image Type");
                    if (image.Length > 0)
                    {
                        string imageName = $"category-{request.Name}-{i}{Path.GetExtension(image.FileName)}";
                        string imagepath = Path.Combine($"{Directory.GetCurrentDirectory()}\\wwwroot\\images\\categories", imageName);

                        using var stream = System.IO.File.Create(imagepath);
                        await image.CopyToAsync(stream);
                        imagePaths.Append($"images/categories/{imageName};");
                    }
                }
            }

            if (category is not null && request.Action == actions.Update)
            {
                category.Name = request.Name;
                category.Image = imagePaths.Length == 0 ? null : imagePaths.ToString();
                category.Color = request.Color;
            }
            else if (category is null && request.Action == actions.Add)
            {
                _db.Categories.Add(new Category
                {
                    Name = request.Name,
                    Image = imagePaths.Length == 0 ? null : imagePaths.ToString(),
                    Color = request.Color
                });
            }

            else return BadRequest();

            await _db.SaveChangesAsync();
            return Ok();
        }
        #endregion

        #region Manage Brand
        [HttpPost("manageBrand")]
        public async Task<IActionResult> ManageBrand([FromForm] ManageBrandCategory request)
        {
            var brand = _db.Brands.FirstOrDefault(e => e.Name == request.Name);
            Actions actions = new();

            if (brand is not null && request.Action == actions.Remove)
                _db.Brands.Remove(brand);
            else if (brand is not null & request.Action == actions.Add)
                return new ObjectResult("Brand already exists") { StatusCode = 405 };

            StringBuilder imagePaths = new();
            ImageTypes imageTypes = new();

            if (request.Images is not null)
            {
                for (int i = 0; i < request.Images.Count; i++)
                {
                    IFormFile? image = request.Images[i];
                    if (!imageTypes.Contains(Path.GetExtension(image.FileName)[1..].ToUpper()))
                        return BadRequest("Invalid Image Type");

                    if (image.Length > 0)
                    {
                        string imageName = $"brand-{request.Name}-{i}{Path.GetExtension(image.FileName)}";
                        string imagepath = Path.Combine($"{Directory.GetCurrentDirectory()}\\wwwroot\\images\\brands", imageName);

                        using var stream = System.IO.File.Create(imagepath);
                        await image.CopyToAsync(stream);
                        imagePaths.Append($"images/brands/{imageName};");
                    }
                }
            }

            if (brand is not null && request.Action == actions.Update)
            {
                brand.Name = request.Name;
                brand.Image = imagePaths.Length == 0 ? null : imagePaths.ToString();
                brand.Color = request.Color;
            }
            else if (brand is null && request.Action == actions.Add)
            {
                _db.Brands.Add(new Brand
                {
                    Name = request.Name,
                    Image = imagePaths.Length == 0 ? null : imagePaths.ToString(),
                    Color = request.Color
                });
            }

            else return BadRequest();

            await _db.SaveChangesAsync();
            return Ok();
        }
        #endregion

        #region Manage Voucher
        [HttpPost("manageVoucher")]
        public async Task<IActionResult> ManageVoucher([FromForm] ManageVoucher request)
        {
            Actions actions = new();
            Voucher? voucher = _db.Vouchers.FirstOrDefault(e => e.Name == request.Voucher);

            // Validations
            if (!actions.Contains(request.Action))
                return BadRequest();
            if (request.Action == actions.Remove && request.Voucher is null)
                return BadRequest("Missing Voucher");
            if ((request.Action == actions.Update || request.Action == actions.Remove) && voucher is null)
                return new ObjectResult("Invalid voucher") { StatusCode = 403 };
            if ((request.Action == actions.Add || request.Action == actions.Update) &&
                (request.Discount is null || request.Expiry!.Length < 10 || request.Expiry is null))
                return new ObjectResult("Invalid discount") { StatusCode = 403 };
            if (request.Discount is not null and < 1 or > 100)
                return BadRequest();

            // Operations
            if (request.Action == actions.Add)
            {
                if (voucher is not null && voucher.Expiry > DateTime.Now)
                    return new ObjectResult("This voucher already exists and not expired. Try \"Update\" instead of \"Add\" and extend the expiry date if you need") { StatusCode = 405 };

                else
                    _db.Vouchers.Add(new Voucher()
                    {
                        Name = request.Voucher!,
                        Discount = (int)request.Discount!,
                        Expiry = DateTime.Parse(request.Expiry!).ToUniversalTime(),
                    });
            }

            else if (request.Action == actions.Update)
            {
                voucher!.Name = request.Voucher!;
                voucher.Discount = (int)request.Discount!;
                voucher.Expiry = DateTime.Parse(request.Expiry!).ToUniversalTime();
            }

            else if (request.Action == actions.Remove)
            {
                _db.Vouchers.Remove(voucher!);
            }

            else return BadRequest();

            await _db.SaveChangesAsync();
            return Ok();
        }
        #endregion
    }
}
