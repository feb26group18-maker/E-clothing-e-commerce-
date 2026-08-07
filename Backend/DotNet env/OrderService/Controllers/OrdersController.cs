using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrderService.Data;
using OrderService.Models;

namespace OrderService.Controllers;

[ApiController]
[Route("orders")]
public class OrdersController : ControllerBase
{
    private readonly OrderDbContext _context;

    public OrdersController(OrderDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Order>>> GetAllOrders()
    {
        return await _context.Orders
            .Include(o => o.OrderItems)
            .OrderByDescending(o => o.OrderDate)
            .ToListAsync();
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Order>> GetOrderById(int id)
    {
        var order = await _context.Orders
            .Include(o => o.OrderItems)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (order == null)
        {
            return NotFound(new { message = $"Order with ID {id} not found." });
        }

        return order;
    }

    [HttpGet("customer/{customerId:int}")]
    public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByCustomer(int customerId)
    {
        return await _context.Orders
            .Include(o => o.OrderItems)
            .Where(o => o.CustomerId == customerId)
            .OrderByDescending(o => o.OrderDate)
            .ToListAsync();
    }

    [HttpGet("seller/{sellerId:int}")]
    public async Task<ActionResult<IEnumerable<Order>>> GetOrdersBySeller(int sellerId)
    {
        return await _context.Orders
            .Include(o => o.OrderItems)
            .Where(o => o.SellerId == sellerId)
            .OrderByDescending(o => o.OrderDate)
            .ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Order>> PlaceOrder([FromBody] Order order)
    {
        order.OrderDate = DateTime.UtcNow;
        if (string.IsNullOrEmpty(order.Status))
        {
            order.Status = "PENDING";
        }
        if (string.IsNullOrEmpty(order.PaymentStatus))
        {
            order.PaymentStatus = "UNPAID";
        }

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetOrderById), new { id = order.Id }, order);
    }

    [HttpPost("payment/{orderId:int}")]
    public async Task<IActionResult> ProcessPayment(int orderId, [FromBody] object? paymentData)
    {
        var order = await _context.Orders.FindAsync(orderId);
        if (order == null)
        {
            return NotFound(new { message = $"Order with ID {orderId} not found." });
        }

        order.PaymentStatus = "PAID";
        order.Status = "PROCESSING";
        await _context.SaveChangesAsync();

        return Ok(new { message = "Payment processed successfully", orderId, status = order.Status, paymentStatus = order.PaymentStatus });
    }

    [HttpPut("{orderId:int}/status")]
    public async Task<IActionResult> UpdateOrderStatus(int orderId, [FromQuery] string status)
    {
        var order = await _context.Orders.FindAsync(orderId);
        if (order == null)
        {
            return NotFound(new { message = $"Order with ID {orderId} not found." });
        }

        order.Status = status.ToUpper();
        await _context.SaveChangesAsync();

        return Ok(new { message = "Order status updated successfully", orderId, status = order.Status });
    }

    [HttpPut("{orderId:int}/deliver")]
    public async Task<IActionResult> DeliverOrder(int orderId)
    {
        var order = await _context.Orders.FindAsync(orderId);
        if (order == null)
        {
            return NotFound(new { message = $"Order with ID {orderId} not found." });
        }

        order.Status = "DELIVERED";
        await _context.SaveChangesAsync();

        return Ok(new { message = "Order delivered successfully", orderId, status = order.Status });
    }
}
