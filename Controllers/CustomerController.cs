using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SprintsECommerce.Data;
using SprintsECommerce.Models;

namespace SprintsECommerce.Controllers
{
    [ApiController]
    [Authorize(Roles = "admin,customer")]
    [Route("api/product")]
    public class CustomerController : ControllerBase
    {
        #region Fields & Constructor
        private readonly ApplicationDbContext _db;
        private readonly UserManager<User> _userManager;
        private readonly IEmailSender _emailSender;

        public CustomerController(
            ApplicationDbContext db,
            UserManager<User> userManager,
            IEmailSender emailSender
)
        {
            _db = db;
            _userManager = userManager;
            _emailSender = emailSender;
        }
        #endregion

        #region Search Product
        [HttpPost("searchProduct")]
        public IActionResult SearchProduct(SearchProduct request)
        {
            if (request.Query.Length == 0) return BadRequest();

            var product = _db.Products
                .Where(e => e.Name.Contains(request.Query))
                .Select(e => new
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
                }).ToArray();

            if (product is not null) return Ok(product);
            else return NotFound();
        }
        #endregion

        #region Get Category Products
        [HttpPost("getCategoryProducts")]
        public IActionResult GetCategoryProducts(GetCategoryProducts request)
        {
            _db.Products.Where(e => e.Category.Name == request.Category).Load();
            _db.Brands.Load();
            _db.Orders.Load();
            _db.Reviews.Load();
            Category? category = _db.Categories
                .Where(e => e.Name == request.Category)
                .FirstOrDefault();
            if (category is null) return NotFound("No such a category");
            else if (category.Products.Count > 0) return Ok(category.Products.Select(e => new
            {
                productId = e.Id,
                e.Name,
                e.Description,
                brand = e.Brand?.Name,
                e.Price,
                e.Color,
                reviews = e.Reviews?.ToArray(),
                orderId = e.Order?.Id,
                e.DateAdded,
                e.StockAvailability,
                e.DateReturned,
                e.ReasonOfReturn,
            }));
            else return NotFound("No products are currently present in this category");
        }
        #endregion

        #region Add to Cart
        [HttpPost("addToCart")]
        public async Task<IActionResult> AddToCart(CartProcessing request)
        {
            IdentityUser user = await _userManager.GetUserAsync(HttpContext.User);
            var product = _db.Products.FirstOrDefault(e => e.Id == request.ProductId);

            if (product is null) return new ObjectResult("Product not found!") { StatusCode = 404 };
            else if (product.StockAvailability == false)
                return new ObjectResult("Product is out of stock!") { StatusCode = 406 };

            _db.Carts.Add(new Cart
            {
                UserId = user.Id,
                ProductId = request.ProductId
            });

            _db.Products.First(e => e.Id == request.ProductId).StockAvailability = false;

            await _db.SaveChangesAsync();
            return Ok();
        }
        #endregion

        #region Remove From Cart

        [HttpPost("removeFromCart")]
        public async Task<IActionResult> RemoveFromCart(CartProcessing request)
        {
            if (_db.Products.FirstOrDefault(e => e.Id == request.ProductId) is null)
                return BadRequest();

            IdentityUser user = await _userManager.GetUserAsync(HttpContext.User);
            Cart cart = _db.Carts.First(e => e.ProductId == request.ProductId && e.User == user);
            _db.Carts.Remove(cart);

            _db.Products.First(e => e.Id == request.ProductId).StockAvailability = true;

            await _db.SaveChangesAsync();
            return Ok();
        }
        #endregion

        #region Create/Add to/Remove from/ Cancel Order
        [HttpPost("manageOrder")]
        public async Task<IActionResult> Purchase(OrderRequest request)
        {
            OrderTypes orderTypes = new();
            IdentityUser user = await _userManager.GetUserAsync(HttpContext.User);
            var voucher = _db.Vouchers.FirstOrDefault(e => e.Name == request.Voucher);
            Actions actions = new();

            // Validate Actions
            if (!actions.Contains(request.Action))
                return BadRequest();

            // Check voucher validity
            if (voucher is not null && voucher.Expiry < DateTime.Now)
                return new ObjectResult("This voucher is expired") { StatusCode = 403 };

            // Validating PaymentMethods
            PaymentMethod paymentMethods = new();
            if (!paymentMethods.Contains(request.PaymentMethod))
                return BadRequest();

            // Validate Cart being not void
            var cartProducts = _db.Carts.Where(e => e.UserId == user.Id).ToArray();
            if (cartProducts is null)
                return BadRequest();

            // Validate if Remove product
            if (request.Action == actions.Remove && request.ProductId is not null)
                return BadRequest("Product Id is required");

            // Process payment
            var order = _db.Orders.FirstOrDefault(e => e.Id == request.OrderId);

            if (order is not null && request.Action == actions.Cancel)
                _db.Orders.Remove(order);

            else if (order is null && request.Action == actions.Add)
            {
                order = new Order()
                {
                    Type = orderTypes.Purchase,
                    UserId = user.Id,
                    Money = 0,
                    PaymentMethod = request.PaymentMethod
                };
            }

            else if (order is not null && request.Action == actions.Remove && request.ProductId is not null)
            {
                order.Products.Remove(_db.Products.First(e => e.Id == request.ProductId));
            }

            foreach (Cart cartProduct in cartProducts)
            {
                Product product = _db.Products.First(e => e.Id == cartProduct.ProductId);
                product.Order = order!;
                order!.Money += product.Price;
                _db.Carts.Remove(cartProduct);
            }

            if (voucher is not null)
                order!.Money = order.Money * voucher!.Discount / 100;

            if (request.OrderId is null)
                _db.Orders.Add(order!);

            await _db.SaveChangesAsync();

            // Send Confirmation Email
            string htmlMessage
                = @$"
                    <p>Kindly find below the transaction Id</p>
                    <p>{order!.Id}</p>
                    <p>Total Cost: {order.Money}</p>
                    <p>Status: Under Review</p>
                ";

            await _emailSender.SendEmailAsync(user.Email, "Order Details", htmlMessage);

            return Ok();
        }
        #endregion

        #region Review Product

        [HttpPost("manageReview")]
        public async Task<IActionResult> ManageReview(ReviewRequest request)
        {
            Actions actions = new();
            // Validations
            if (!actions.Contains(request.Action))
                return BadRequest();
            if (request.Rating > 5 || request.Rating < 0)
                return BadRequest("Rating must be between 0 and 10");
            if (!(request.Review.Length > 10))
                return BadRequest("Review must contain more than 10 characters");
            if (!_db.Products.Any(e => e.Id == request.ProductId))
                return BadRequest("Invalid product ID");

            User user = await _userManager.GetUserAsync(HttpContext.User);
            var productReviews = _db.Reviews.Where(e => e.ProductId == request.ProductId).ToArray();
            var review = _db.Reviews.FirstOrDefault(e => e.ProductId == request.ProductId && e.User == user);

            if (request.Action == actions.Add)
            {
                _db.Reviews.Add(new Review()
                {
                    User = user,
                    CustomerReview = request.Review,
                    ProductId = request.ProductId,
                    Rating = productReviews is null ? request.Rating : (productReviews.Sum(e => e.Rating) + request.Rating) / ((productReviews.Count() + 1) * 5) * 5
                });
            }
            else if (request.Action == actions.Update)
            {
                review!.CustomerReview = request.Review;
                review.Rating = (productReviews.Sum(e => e.Rating) + request.Rating) / ((productReviews.Count() + 1) * 5) * 5;
            }
            else if (request.Action == actions.Remove && review is not null)
                _db.Reviews.Remove(review);

            await _db.SaveChangesAsync();

            return Ok();
        }

        #endregion
    }
}
