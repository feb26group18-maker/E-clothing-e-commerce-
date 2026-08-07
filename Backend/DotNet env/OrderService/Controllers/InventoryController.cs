using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrderService.Data;
using OrderService.Models;

namespace OrderService.Controllers;

[ApiController]
[Route("inventory")]
public class InventoryController : ControllerBase
{
    private readonly OrderDbContext _context;

    public InventoryController(OrderDbContext context)
    {
        _context = context;
    }

    [HttpGet("seller/{sellerId:int}")]
    public async Task<ActionResult<IEnumerable<Inventory>>> GetInventoryBySeller(int sellerId)
    {
        return await _context.Inventories
            .Where(i => i.SellerId == sellerId)
            .ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Inventory>> AddOrUpdateInventory([FromBody] Inventory inventory)
    {
        var existing = await _context.Inventories
            .FirstOrDefaultAsync(i => i.SellerId == inventory.SellerId && i.ProductId == inventory.ProductId);

        if (existing != null)
        {
            existing.StockQuantity = inventory.StockQuantity;
            existing.LastUpdated = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return Ok(existing);
        }

        inventory.LastUpdated = DateTime.UtcNow;
        _context.Inventories.Add(inventory);
        await _context.SaveChangesAsync();

        return Ok(inventory);
    }

    [HttpPut("{inventoryId:int}")]
    public async Task<IActionResult> UpdateInventoryQuantity(int inventoryId, [FromQuery] int stockQuantity)
    {
        var inventory = await _context.Inventories.FindAsync(inventoryId);
        if (inventory == null)
        {
            return NotFound(new { message = $"Inventory entry {inventoryId} not found." });
        }

        inventory.StockQuantity = stockQuantity;
        inventory.LastUpdated = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        return Ok(inventory);
    }

    [HttpDelete("{inventoryId:int}")]
    public async Task<IActionResult> DeleteInventory(int inventoryId)
    {
        var inventory = await _context.Inventories.FindAsync(inventoryId);
        if (inventory == null)
        {
            return NotFound(new { message = $"Inventory entry {inventoryId} not found." });
        }

        _context.Inventories.Remove(inventory);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Inventory entry deleted successfully" });
    }
}
