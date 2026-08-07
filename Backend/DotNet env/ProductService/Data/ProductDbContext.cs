using Microsoft.EntityFrameworkCore;
using ProductService.Models;

namespace ProductService.Data;

public class ProductDbContext : DbContext
{
    public ProductDbContext(DbContextOptions<ProductDbContext> options) : base(options) { }

    public DbSet<Product> Products => Set<Product>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Subcategory> Subcategories => Set<Subcategory>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(c => c.Id);
            entity.Property(c => c.Name).IsRequired().HasMaxLength(100);
        });

        modelBuilder.Entity<Subcategory>(entity =>
        {
            entity.HasKey(s => s.Id);
            entity.Property(s => s.Name).IsRequired().HasMaxLength(100);

            entity.HasOne(s => s.Category)
                  .WithMany(c => c.Subcategories)
                  .HasForeignKey(s => s.CategoryId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(p => p.Id);
            entity.Property(p => p.Name).IsRequired().HasMaxLength(150);
            entity.Property(p => p.Price).HasColumnType("decimal(18,2)");

            entity.HasOne(p => p.Category)
                  .WithMany(c => c.Products)
                  .HasForeignKey(p => p.CategoryId)
                  .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(p => p.Subcategory)
                  .WithMany(s => s.Products)
                  .HasForeignKey(p => p.SubcategoryId)
                  .OnDelete(DeleteBehavior.SetNull);
        });

        // Seed Data
        modelBuilder.Entity<Category>().HasData(
            new Category { Id = 1, Name = "Men", Description = "Men's Clothing & Accessories", ImageUrl = "https://images.unsplash.com/photo-1490578474895-699bc4e2cf59" },
            new Category { Id = 2, Name = "Women", Description = "Women's Fashion & Apparel", ImageUrl = "https://images.unsplash.com/photo-1483985988355-763728e1935b" },
            new Category { Id = 3, Name = "Kids", Description = "Kids' Wear & Toys", ImageUrl = "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea" }
        );

        modelBuilder.Entity<Subcategory>().HasData(
            new Subcategory { Id = 1, CategoryId = 1, Name = "T-Shirts", Description = "Casual & Graphic Tees" },
            new Subcategory { Id = 2, CategoryId = 1, Name = "Jeans", Description = "Denim Trousers & Pants" },
            new Subcategory { Id = 3, CategoryId = 2, Name = "Dresses", Description = "Evening & Casual Dresses" },
            new Subcategory { Id = 4, CategoryId = 2, Name = "Tops", Description = "Blouses & Shirts" },
            new Subcategory { Id = 5, CategoryId = 3, Name = "Boys Wear", Description = "Shirts & Shorts" }
        );

        modelBuilder.Entity<Product>().HasData(
            new Product { Id = 1, CategoryId = 1, SubcategoryId = 1, SellerId = 1, Name = "Classic Black Tee", Description = "Premium 100% cotton crewneck t-shirt.", Price = 29.99m, Brand = "UrbanWear", ImageUrl = "https://images.unsplash.com/photo-1521572267360-ee0c2909d518", CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
            new Product { Id = 2, CategoryId = 1, SubcategoryId = 2, SellerId = 1, Name = "Slim Fit Blue Jeans", Description = "Comfortable stretch denim jeans.", Price = 59.99m, Brand = "DenimCo", ImageUrl = "https://images.unsplash.com/photo-1542272604-780c36856842", CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
            new Product { Id = 3, CategoryId = 2, SubcategoryId = 3, SellerId = 2, Name = "Floral Summer Dress", Description = "Lightweight floral print midi dress.", Price = 49.99m, Brand = "BloomFashion", ImageUrl = "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1", CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) }
        );
    }
}
