using System.Collections.Generic;
using System.Threading.Tasks;
using AuthService.Models.DTOs;
using AuthService.Models.Entities;

namespace AuthService.Services
{
    public interface IUserService
    {
        Task<string> RegisterCustomerAsync(CustomerRegisterRequest request);
        Task<string> RegisterSellerAsync(SellerRegisterRequest request);
        Task<LoginResponse?> LoginAsync(LoginRequest request);
        Task<List<User>> GetAllUsersAsync();
        Task<User?> GetUserByIdAsync(int id);
        Task<string> DeleteUserAsync(int id);
        Task<string> UpdateCustomerAsync(int id, UpdateCustomerRequest request);
        Task<string> UpdateSellerAsync(int id, UpdateSellerRequest request);
        Task<SellerProfileResponse?> GetSellerProfileAsync(int userId);
    }
}
