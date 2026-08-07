using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrderService.Data;
using OrderService.Models;

namespace OrderService.Controllers;

[ApiController]
[Route("wishlist")]
public class WishlistController : ControllerBase
{
    private readonly OrderDbContext _context;

    public WishlistController(OrderDbContext context)
    {
        _context = context;
    }

    [HttpGet("{customerId:int}")]
    public async Task<ActionResult<IEnumerable<WishlistItem>>> GetWishlist(int customerId)
    {
        return await _context.WishlistItems
            .Where(w => w.CustomerId == customerId)
            .ToListAsync();
    }

    [HttpPost("add")]
    public async Task<ActionResult<WishlistItem>> AddToWishlist(
        [FromQuery] int customerId,
        [FromQuery] int productId,
        [FromBody] WishlistItem? bodyItem = null)
    {
        int cId = customerId > 0 ? customerId : (bodyItem?.CustomerId ?? 0);
        int pId = productId > 0 ? productId : (bodyItem?.ProductId ?? 0);

        if (cId <= 0 || pId <= 0)
        {
            return BadRequest(new { message = "Invalid customerId or productId." });
        }

        var existing = await _context.WishlistItems
            .FirstOrDefaultAsync(w => w.CustomerId == cId && w.ProductId == pId);

        if (existing != null)
        {
            return Ok(existing);
        }

        var newItem = new WishlistItem
        {
            CustomerId = cId,
            ProductId = pId
        };

        _context.WishlistItems.Add(newItem);
        await _context.SaveChangesAsync();
        return Ok(newItem);
    }

    [HttpDelete("remove/{wishlistId:int}")]
    public async Task<IActionResult> RemoveFromWishlist(int wishlistId)
    {
        var item = await _context.WishlistItems.FindAsync(wishlistId);
        if (item == null)
        {
            return NotFound(new { message = $"Wishlist item {wishlistId} not found." });
        }

        _context.WishlistItems.Remove(item);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Wishlist item removed successfully" });
    }
}
