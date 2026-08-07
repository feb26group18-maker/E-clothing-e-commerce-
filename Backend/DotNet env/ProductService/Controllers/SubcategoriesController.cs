using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductService.Data;
using ProductService.Models;

namespace ProductService.Controllers;

[ApiController]
[Route("subcategories")]
public class SubcategoriesController : ControllerBase
{
    private readonly ProductDbContext _context;

    public SubcategoriesController(ProductDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Subcategory>>> GetSubcategories()
    {
        return await _context.Subcategories.ToListAsync();
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Subcategory>> GetSubcategoryById(int id)
    {
        var subcategory = await _context.Subcategories.FindAsync(id);
        if (subcategory == null)
        {
            return NotFound(new { message = $"Subcategory with ID {id} not found." });
        }
        return subcategory;
    }

    [HttpGet("category/{categoryId:int}")]
    public async Task<ActionResult<IEnumerable<Subcategory>>> GetSubcategoriesByCategory(int categoryId)
    {
        return await _context.Subcategories
            .Where(s => s.CategoryId == categoryId)
            .ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Subcategory>> AddSubcategory([FromBody] Subcategory subcategory)
    {
        _context.Subcategories.Add(subcategory);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetSubcategoryById), new { id = subcategory.Id }, subcategory);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateSubcategory(int id, [FromBody] Subcategory subcategory)
    {
        var existing = await _context.Subcategories.FindAsync(id);
        if (existing == null)
        {
            return NotFound(new { message = $"Subcategory with ID {id} not found." });
        }

        existing.Name = subcategory.Name;
        existing.Description = subcategory.Description;
        existing.CategoryId = subcategory.CategoryId;

        await _context.SaveChangesAsync();
        return Ok(existing);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteSubcategory(int id)
    {
        var subcategory = await _context.Subcategories.FindAsync(id);
        if (subcategory == null)
        {
            return NotFound(new { message = $"Subcategory with ID {id} not found." });
        }

        _context.Subcategories.Remove(subcategory);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Subcategory deleted successfully" });
    }
}
