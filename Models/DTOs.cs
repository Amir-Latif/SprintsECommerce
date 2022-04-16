using System.Collections;

namespace SprintsECommerce.Models
{
    public class AssignRole
    {
        public string Email { get; set; }
        public string Role { get; set; }
    }
    public class CredentialsRequest
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public bool RememberMe { get; set; }
    }
    public class ChangePasswordRequest
    {
        public string Email { get; set; }
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }
    public class OrderRequest
    {
        public string PaymentMethod { get; set; }
        public string? Voucher { get; set; }
        // Required if the customer is adding to a current order
        public string? OrderId { get; set; }
        public string Action { get; set; }
        public string? ProductId { get; set; }
    }
    public class ReviewRequest
    {
        public string Review { get; set; }
        public string ProductId { get; set; }
        public int Rating { get; set; }
        public string Action { get; set; }
    }
    public class ManageProductRequest
    {
        public string? ProductId { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public string Brand { get; set; }
        public string? Description { get; set; }
        public IFormFileCollection? Images { get; set; }
        public string? Color { get; set; }
        public int Price { get; set; }
        public string? StockAvailability { get; set; }
        // Days needed to deliver the product
        public int DeliveryNotice { get; set; }
        public string Action { get; set; }
    }
    public class GetOrdersRequest
    {
        public string OrderStatus { get; set; }
        public string CreationDate { get; set; }
        public string UserEmail { get; set; }
    }
    public class ManageOrderRequest
    {
        public string OrderId { get; set; }
        public string Status { get; set; }
    }
    public class CustomerActivities
    {
        public string Email { get; set; }
        public string Status { get; set; }
        public string JoiningDate { get; set; }
    }
    public class ManageCustomer
    {
        public string Email { get; set; }
        public string Status { get; set; }
    }
    public class ManageBrandCategory
    {
        public string Name { get; set; }
        public IFormFileCollection? Images { get; set; }
        public string? Color { get; set; }
        public string Action { get; set; }
    }
    public class StatsRequest
    {
        public string Criteria { get; set; }
    }
    public class SearchProduct
    {
        public string Query { get; set; }
    }
    public class GetCategoryProducts
    {
        public string Category { get; set; }
    }
    public class CartProcessing
    {
        public string ProductId { get; set; }
    }
    public class ManageVoucher
    {
        public string? Voucher { get; set; }
        public string Action { get; set; }
        public string? Expiry { get; set; }
        public int? Discount { get; set; }
    }
}
