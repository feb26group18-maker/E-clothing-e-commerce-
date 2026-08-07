var builder = WebApplication.CreateBuilder(args);

// Enforce port 9090
builder.WebHost.UseUrls("http://localhost:9090");

// 1. Add YARP Reverse Proxy
builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

// 2. Configure CORS for React frontend (3000 / 5173)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

app.UseCors("AllowFrontend");

app.MapGet("/", () => Results.Ok(new { status = "Eclothing API Gateway Running", port = 9090 }));

app.MapReverseProxy();

app.Run();
