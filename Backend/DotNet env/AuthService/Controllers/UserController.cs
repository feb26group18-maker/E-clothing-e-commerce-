using System.Threading.Tasks;
using AuthService.Models.DTOs;
using AuthService.Services;
using Microsoft.AspNetCore.Mvc;

namespace AuthService.Controllers
{
    [ApiController]
    [Route("users")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // Get All Users
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }

        // Get User By Id
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound(new { message = "User Not Found" });
            }
            return Ok(user);
        }

        // Soft Delete User
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var result = await _userService.DeleteUserAsync(id);
            if (result == "User Not Found")
            {
                return NotFound(new { message = result });
            }
            return Ok(result);
        }

        // Update Customer
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateCustomer(int id, [FromBody] UpdateCustomerRequest request)
        {
            var result = await _userService.UpdateCustomerAsync(id, request);
            if (result.Contains("Not Found"))
            {
                return NotFound(new { message = result });
            }
            return Ok(result);
        }

        // Update Seller
        [HttpPut("seller/{id:int}")]
        public async Task<IActionResult> UpdateSeller(int id, [FromBody] UpdateSellerRequest request)
        {
            var result = await _userService.UpdateSellerAsync(id, request);
            if (result.Contains("Not Found"))
            {
                return NotFound(new { message = result });
            }
            return Ok(result);
        }

        // Get Seller Profile
        [HttpGet("seller/profile/{id:int}")]
        public async Task<IActionResult> GetSellerProfile(int id)
        {
            var profile = await _userService.GetSellerProfileAsync(id);
            if (profile == null)
            {
                return NotFound(new { message = "Seller Profile Not Found" });
            }
            return Ok(profile);
        }
    }
}
