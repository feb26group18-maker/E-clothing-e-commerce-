using System.ComponentModel.DataAnnotations;

namespace AuthService.Models.DTOs
{
    public class SellerRegisterRequest
    {
        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Enter valid email")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Mobile is required")]
        public string Mobile { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; } = string.Empty;

        [Required(ErrorMessage = "ShopName is required")]
        public string ShopName { get; set; } = string.Empty;

        [Required(ErrorMessage = "GST Number is required")]
        public string GstNumber { get; set; } = string.Empty;

        [Required(ErrorMessage = "Address is required")]
        public string BusinessAddress { get; set; } = string.Empty;
    }
}
