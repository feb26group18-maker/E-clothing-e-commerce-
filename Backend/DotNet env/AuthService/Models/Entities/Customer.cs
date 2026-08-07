using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuthService.Models.Entities
{
    [Table("customer")]
    public class Customer
    {
        [Key]
        [Column("c_id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CustomerId { get; set; }

        [Column("u_id")]
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; } = null!;

        [Required]
        [MaxLength(255)]
        [Column("address")]
        public string Address { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        [Column("city")]
        public string City { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        [Column("state")]
        public string State { get; set; } = string.Empty;

        [Required]
        [MaxLength(10)]
        [Column("pincode")]
        public string Pincode { get; set; } = string.Empty;
    }
}
