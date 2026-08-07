namespace AuthService.Models.DTOs
{
    public class SellerProfileResponse
    {
        public int UserId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Mobile { get; set; } = string.Empty;

        public string ShopName { get; set; } = string.Empty;
        public string GstNumber { get; set; } = string.Empty;
        public string BusinessAddress { get; set; } = string.Empty;

        public SellerProfileResponse() { }

        public SellerProfileResponse(int userId, string name, string email, string mobile, string shopName, string gstNumber, string businessAddress)
        {
            UserId = userId;
            Name = name;
            Email = email;
            Mobile = mobile;
            ShopName = shopName;
            GstNumber = gstNumber;
            BusinessAddress = businessAddress;
        }
    }
}
