using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductService.Data;
using ProductService.Models;

namespace ProductService.Controllers;

[ApiController]
[Route("categories")]
public class CategoriesController : ControllerBase
{
    private readonly ProductDbContext _context;

    public CategoriesController(ProductDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
    {
        return await _context.Categories
            .Include(c => c.Subcategories)
            .ToListAsync();
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Category>> GetCategoryById(int id)
    {
        var category = await _context.Categories
            .Include(c => c.Subcategories)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (category == null)
        {
            return NotFound(new { message = $"Category with ID {id} not found." });
        }

        return category;
    }

    [HttpPost]
    public async Task<ActionResult<Category>> AddCategory([FromBody] Category category)
    {
        _context.Categories.Add(category);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetCategoryById), new { id = category.Id }, category);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateCategory(int id, [FromBody] Category category)
    {
        var existing = await _context.Categories.FindAsync(id);
        if (existing == null)
        {
            return NotFound(new { message = $"Category with ID {id} not found." });
        }

        existing.Name = category.Name;
        existing.Description = category.Description;
        existing.ImageUrl = category.ImageUrl;

        await _context.SaveChangesAsync();
        return Ok(existing);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        var category = await _context.Categories.FindAsync(id);
        if (category == null)
        {
            return NotFound(new { message = $"Category with ID {id} not found." });
        }

        _context.Categories.Remove(category);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Category deleted successfully" });
    }
}
