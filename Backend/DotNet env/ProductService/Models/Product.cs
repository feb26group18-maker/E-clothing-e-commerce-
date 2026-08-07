namespace ProductService.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string? ImageUrl { get; set; }
    public string? Brand { get; set; }
    public int SellerId { get; set; }
    public int CategoryId { get; set; }
    public int? SubcategoryId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Category? Category { get; set; }
    public Subcategory? Subcategory { get; set; }
}
