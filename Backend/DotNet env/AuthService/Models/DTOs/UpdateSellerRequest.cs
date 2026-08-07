namespace AuthService.Models.DTOs
{
    public class UpdateSellerRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Mobile { get; set; } = string.Empty;

        public string ShopName { get; set; } = string.Empty;
        public string GstNumber { get; set; } = string.Empty;
        public string BusinessAddress { get; set; } = string.Empty;
    }
}
