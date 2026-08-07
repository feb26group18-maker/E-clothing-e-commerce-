using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuthService.Data;
using AuthService.Models.DTOs;
using AuthService.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace AuthService.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;
        private readonly IJwtService _jwtService;

        public UserService(ApplicationDbContext context, IJwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        public async Task<string> RegisterCustomerAsync(CustomerRegisterRequest request)
        {
            // Step 1: Check Email
            if (await _context.Users.AnyAsync(u => u.Email == request.Email))
            {
                return "Email already exists";
            }

            // Step 2: Check Mobile
            if (await _context.Users.AnyAsync(u => u.Mobile == request.Mobile))
            {
                return "Mobile already exists";
            }

            // Step 3: Get Customer Role
            var role = await _context.Roles.FirstOrDefaultAsync(r => r.RoleName == RoleName.Customer);
            if (role == null)
            {
                role = new Role { RoleName = RoleName.Customer };
                _context.Roles.Add(role);
                await _context.SaveChangesAsync();
            }

            // Step 4: Create User Object with BCrypt password hashing
            var user = new User
            {
                Name = request.Name,
                Email = request.Email,
                Mobile = request.Mobile,
                Password = BCrypt.Net.BCrypt.HashPassword(request.Password),
                RoleId = role.RoleId,
                Role = role,
                Status = 1,
                CreatedAt = DateTime.UtcNow,
                IsDeleted = 0
            };

            // Step 5: Save User
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Step 6: Create Customer Object
            var customer = new Customer
            {
                UserId = user.UserId,
                User = user,
                Address = request.Address,
                City = request.City,
                State = request.State,
                Pincode = request.Pincode
            };

            // Step 7: Save Customer
            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return "Customer Registered Successfully";
        }

        public async Task<string> RegisterSellerAsync(SellerRegisterRequest request)
        {
            // Step 1: Check Email
            if (await _context.Users.AnyAsync(u => u.Email == request.Email))
            {
                return "Email already exists";
            }

            // Step 2: Check Mobile
            if (await _context.Users.AnyAsync(u => u.Mobile == request.Mobile))
            {
                return "Mobile already exists";
            }

            // Step 3: Check GST Number
            if (await _context.Sellers.AnyAsync(s => s.GstNumber == request.GstNumber))
            {
                return "GST Number already exists";
            }

            // Step 4: Get Seller Role
            var role = await _context.Roles.FirstOrDefaultAsync(r => r.RoleName == RoleName.Seller);
            if (role == null)
            {
                role = new Role { RoleName = RoleName.Seller };
                _context.Roles.Add(role);
                await _context.SaveChangesAsync();
            }

            // Step 5: Create User Object (Status = 0: Waiting for admin approval)
            var user = new User
            {
                Name = request.Name,
                Email = request.Email,
                Mobile = request.Mobile,
                Password = BCrypt.Net.BCrypt.HashPassword(request.Password),
                RoleId = role.RoleId,
                Role = role,
                Status = 0,
                CreatedAt = DateTime.UtcNow,
                IsDeleted = 0
            };

            // Step 6: Save User
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Step 7: Create Seller Object
            var seller = new Seller
            {
                UserId = user.UserId,
                User = user,
                ShopName = request.ShopName,
                GstNumber = request.GstNumber,
                BusinessAddress = request.BusinessAddress
            };

            // Step 8: Save Seller
            _context.Sellers.Add(seller);
            await _context.SaveChangesAsync();

            return "Seller Registered Successfully";
        }

        public async Task<LoginResponse?> LoginAsync(LoginRequest request)
        {
            var user = await _context.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Email == request.Email && u.IsDeleted == 0);

            if (user == null)
            {
                return null;
            }

            // Verify password using BCrypt (or plain text fallback if legacy)
            bool isValidPassword = false;
            try
            {
                isValidPassword = BCrypt.Net.BCrypt.Verify(request.Password, user.Password);
            }
            catch
            {
                isValidPassword = (user.Password == request.Password);
            }

            if (!isValidPassword)
            {
                return null;
            }

            var token = _jwtService.GenerateToken(user);

            return new LoginResponse
            {
                Token = token,
                UserId = user.UserId,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role?.RoleName.ToString() ?? "Customer",
                Status = user.Status
            };
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _context.Users
                .Include(u => u.Role)
                .Where(u => u.IsDeleted == 0)
                .ToListAsync();
        }

        public async Task<User?> GetUserByIdAsync(int id)
        {
            return await _context.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.UserId == id && u.IsDeleted == 0);
        }

        public async Task<string> DeleteUserAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return "User Not Found";
            }

            user.IsDeleted = 1;
            await _context.SaveChangesAsync();
            return "User Deleted Successfully";
        }

        public async Task<string> UpdateCustomerAsync(int id, UpdateCustomerRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserId == id && u.IsDeleted == 0);
            if (user == null)
            {
                return "User Not Found";
            }

            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.UserId == id);
            if (customer == null)
            {
                return "Customer Not Found";
            }

            // Update Users table
            user.Name = request.Name;
            user.Email = request.Email;
            user.Mobile = request.Mobile;

            // Update Customer table
            customer.Address = request.Address;
            customer.City = request.City;
            customer.State = request.State;
            customer.Pincode = request.Pincode;

            await _context.SaveChangesAsync();

            return "Customer Updated Successfully";
        }

        public async Task<string> UpdateSellerAsync(int id, UpdateSellerRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserId == id && u.IsDeleted == 0);
            if (user == null)
            {
                return "User Not Found";
            }

            var seller = await _context.Sellers.FirstOrDefaultAsync(s => s.UserId == id);
            if (seller == null)
            {
                return "Seller Not Found";
            }

            // Update Users table
            user.Name = request.Name;
            user.Email = request.Email;
            user.Mobile = request.Mobile;

            // Update Seller table
            seller.ShopName = request.ShopName;
            seller.GstNumber = request.GstNumber;
            seller.BusinessAddress = request.BusinessAddress;

            await _context.SaveChangesAsync();

            return "Seller Updated Successfully";
        }

        public async Task<SellerProfileResponse?> GetSellerProfileAsync(int userId)
        {
            var seller = await _context.Sellers
                .Include(s => s.User)
                .FirstOrDefaultAsync(s => s.UserId == userId);

            if (seller == null || seller.User == null)
            {
                return null;
            }

            var user = seller.User;
            return new SellerProfileResponse(
                user.UserId,
                user.Name,
                user.Email,
                user.Mobile,
                seller.ShopName,
                seller.GstNumber,
                seller.BusinessAddress
            );
        }
    }
}
