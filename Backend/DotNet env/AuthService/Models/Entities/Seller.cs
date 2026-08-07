using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuthService.Models.Entities
{
    [Table("seller")]
    public class Seller
    {
        [Key]
        [Column("s_id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SellerId { get; set; }

        [Column("u_id")]
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; } = null!;

        [Required]
        [MaxLength(150)]
        [Column("shop_name")]
        public string ShopName { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        [Column("gst_number")]
        public string GstNumber { get; set; } = string.Empty;

        [Required]
        [MaxLength(255)]
        [Column("business_address")]
        public string BusinessAddress { get; set; } = string.Empty;
    }
}
