namespace OrderService.Models;

public class Order
{
    public int Id { get; set; }
    public int CustomerId { get; set; }
    public int? SellerId { get; set; }
    public DateTime OrderDate { get; set; } = DateTime.UtcNow;
    public decimal TotalAmount { get; set; }
    public string Status { get; set; } = "PENDING"; // PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED
    public string ShippingAddress { get; set; } = string.Empty;
    public string PaymentStatus { get; set; } = "UNPAID"; // UNPAID, PAID, FAILED

    public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}
