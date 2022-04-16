namespace SprintsECommerce.Models
{
    public class SprintType
    {
        public bool Contains(string property)
        {
            if (GetType().GetProperty(property) is null) return false;
            else return true;
        }
    }
    public class UserStatuses : SprintType
    {
        public string Active { get; } = "Active";
        public string Deactivated { get; } = "Deactivated";
        public string Suspended { get; } = "Suspended";
    }
    public class Roles : SprintType
    {
        public string Admin { get; } = "Admin";
        public string Customer { get; } = "Customer";
    }
    public class OrderStatus : SprintType
    {
        public string UnderReview { get; } = "UnderReview";
        public string OnTheWay { get; } = "OnTheWay";
        public string Cancelled { get; } = "Cancelled";
        public string Delivered { get; } = "Delivered";
    }
    public class OrderTypes : SprintType
    {
        public string Purchase { get; } = "Purchase";
        public string Return { get; } = "Return";
    }
    public class PaymentMethod : SprintType
    {
        public string COD { get; } = "COD";
        public string PayPal { get; } = "PayPal";
    }
    public class Actions : SprintType
    {
        public string Add { get; } = "Add";
        public string Update { get; } = "Update";
        public string Remove { get; } = "Remove";
        public string Cancel { get; } = "Cancel";
    }
    public class Stats : SprintType
    {
        // Except for suspended users
        public string UsersCount { get; } = "UsersCount";
        public string OrdersCount { get; } = "OrdersCount";
        // In last 7 days
        public string TotalIncome { get; } = "TotalIncome";
        // In last 7 days
        public string NewCustomersCount { get; } = "NewCustomersCount";
        public string TodayOrdersCount { get; } = "TodayOrdersCount";

    }
    public class ImageTypes : SprintType
    {
        public string JPG { get; }
        public string JPEG { get; }
        public string APNG { get; }
        public string PNG { get; }
        public string GIF { get; }

    }
}
