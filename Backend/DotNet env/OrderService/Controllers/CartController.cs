using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrderService.Data;
using OrderService.Models;

namespace OrderService.Controllers;

[ApiController]
[Route("cart")]
public class CartController : ControllerBase
{
    private readonly OrderDbContext _context;

    public CartController(OrderDbContext context)
    {
        _context = context;
    }

    [HttpGet("{customerId:int}")]
    public async Task<ActionResult<IEnumerable<CartItem>>> GetCartItems(int customerId)
    {
        return await _context.CartItems
            .Where(c => c.CustomerId == customerId)
            .ToListAsync();
    }

    [HttpPost("add")]
    public async Task<ActionResult<CartItem>> AddToCart(
        [FromQuery] int customerId,
        [FromQuery] int productId,
        [FromQuery] int quantity = 1,
        [FromBody] CartItem? bodyItem = null)
    {
        int cId = customerId > 0 ? customerId : (bodyItem?.CustomerId ?? 0);
        int pId = productId > 0 ? productId : (bodyItem?.ProductId ?? 0);
        int qty = quantity > 0 ? quantity : (bodyItem?.Quantity ?? 1);

        if (cId <= 0 || pId <= 0)
        {
            return BadRequest(new { message = "Invalid customerId or productId." });
        }

        var existing = await _context.CartItems
            .FirstOrDefaultAsync(c => c.CustomerId == cId && c.ProductId == pId);

        if (existing != null)
        {
            existing.Quantity += qty;
            await _context.SaveChangesAsync();
            return Ok(existing);
        }

        var newItem = new CartItem
        {
            CustomerId = cId,
            ProductId = pId,
            Quantity = qty
        };

        _context.CartItems.Add(newItem);
        await _context.SaveChangesAsync();
        return Ok(newItem);
    }

    [HttpPut("update/{cartId:int}")]
    public async Task<IActionResult> UpdateCartQuantity(int cartId, [FromQuery] int quantity)
    {
        var item = await _context.CartItems.FindAsync(cartId);
        if (item == null)
        {
            return NotFound(new { message = $"Cart item {cartId} not found." });
        }

        if (quantity <= 0)
        {
            _context.CartItems.Remove(item);
        }
        else
        {
            item.Quantity = quantity;
        }

        await _context.SaveChangesAsync();
        return Ok(item);
    }

    [HttpDelete("remove/{cartId:int}")]
    public async Task<IActionResult> RemoveFromCart(int cartId)
    {
        var item = await _context.CartItems.FindAsync(cartId);
        if (item == null)
        {
            return NotFound(new { message = $"Cart item {cartId} not found." });
        }

        _context.CartItems.Remove(item);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Cart item removed successfully" });
    }

    [HttpDelete("clear/{customerId:int}")]
    public async Task<IActionResult> ClearCart(int customerId)
    {
        var items = await _context.CartItems
            .Where(c => c.CustomerId == customerId)
            .ToListAsync();

        _context.CartItems.RemoveRange(items);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Cart cleared successfully" });
    }
}
