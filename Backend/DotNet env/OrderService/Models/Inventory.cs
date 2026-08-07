namespace OrderService.Models;

public class Inventory
{
    public int Id { get; set; }
    public int SellerId { get; set; }
    public int ProductId { get; set; }
    public int StockQuantity { get; set; }
    public DateTime LastUpdated { get; set; } = DateTime.UtcNow;
}
