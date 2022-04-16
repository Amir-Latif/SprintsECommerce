using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace SprintsECommerce.Models
{
    public class User : IdentityUser
    {
        public string Status { get; set; } = "Active";
        public DateTime JoiningDate { get; set; } = DateTime.UtcNow;
    }
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Image { get; set; }
        public string? Color { get; set; }
        public virtual ICollection<Product> Products { get; set; }
    }
    public class Brand
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Image { get; set; }
        public string? Color { get; set; }
        public virtual ICollection<Product> Products { get; set; }
    }
    public class Product
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Name { get; set; }
        public int CategoryId { get; set; }
        public virtual Category Category { get; set; }
        public int BrandId { get; set; }
        public virtual Brand Brand { get; set; }
        public string? Description { get; set; }
        public string? Images { get; set; }
        public string? Color { get; set; }
        public int Price { get; set; }
        public bool StockAvailability { get; set; } = true;
        // Days needed to deliver the product
        public int DeliveryNotice { get; set; }
        public string? OrderId { get; set; }
        public virtual Order Order { get; set; }
        public string? ReasonOfReturn { get; set; }
        public DateTime DateAdded { get; set; } = DateTime.UtcNow;
        public DateTime? DateReturned { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
    }
    public class Review
    {
        public int Id { get; set; }
        public string ProductId { get; set; }
        public virtual Product Product { get; set; }
        public string UserId { get; set; }
        public virtual User User { get; set; }
        public string CustomerReview { get; set; }
        public int Rating { get; set; }
        public DateTime Date { get; set; } = DateTime.UtcNow;
    }
    public class Cart
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public virtual User User { get; set; }
        public string ProductId { get; set; }
        public virtual Product Product { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
    public class Order
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        // to purchase or to return
        public string Type { get; set; }
        public string UserId { get; set; }
        public virtual User User { get; set; }
        public int? VoucherId { get; set; }
        public virtual Voucher Voucher { get; set; }
        public int Money { get; set; }
        public string PaymentMethod { get; set; }
        public string Status { get; set; } = "underreview";
        public DateTime Date { get; set; } = DateTime.UtcNow;
        public virtual ICollection<Product> Products { get; set; }
    }
    public class Voucher
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Discount { get; set; }
        public DateTime Expiry { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
