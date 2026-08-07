using AuthService.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace AuthService.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Role> Roles { get; set; } = null!;
        public DbSet<Customer> Customers { get; set; } = null!;
        public DbSet<Seller> Sellers { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Role entity
            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("roles");
                entity.HasKey(r => r.RoleId);
                entity.Property(r => r.RoleName)
                      .HasConversion<string>()
                      .HasColumnName("role_name")
                      .IsRequired();
                entity.HasIndex(r => r.RoleName).IsUnique();

                // Seed default roles
                entity.HasData(
                    new Role { RoleId = 1, RoleName = RoleName.Admin },
                    new Role { RoleId = 2, RoleName = RoleName.Seller },
                    new Role { RoleId = 3, RoleName = RoleName.Customer }
                );
            });

            // Configure User entity
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");
                entity.HasKey(u => u.UserId);
                entity.HasIndex(u => u.Email).IsUnique();
                entity.HasIndex(u => u.Mobile).IsUnique();

                entity.HasOne(u => u.Role)
                      .WithMany()
                      .HasForeignKey(u => u.RoleId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // Configure Customer entity
            modelBuilder.Entity<Customer>(entity =>
            {
                entity.ToTable("customer");
                entity.HasKey(c => c.CustomerId);

                entity.HasOne(c => c.User)
                      .WithOne()
                      .HasForeignKey<Customer>(c => c.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // Configure Seller entity
            modelBuilder.Entity<Seller>(entity =>
            {
                entity.ToTable("seller");
                entity.HasKey(s => s.SellerId);
                entity.HasIndex(s => s.GstNumber).IsUnique();

                entity.HasOne(s => s.User)
                      .WithOne()
                      .HasForeignKey<Seller>(s => s.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
