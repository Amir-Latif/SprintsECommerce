using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using SprintsECommerce.Data;
using SprintsECommerce.Models;
using SprintsECommerce.Services;
using SprintsECommerce.Services.SendGrid;

var builder = WebApplication.CreateBuilder(args);

// === Add services to the container. === //
var services = builder.Services;
var configuration = builder.Configuration;

// DB Context
if (builder.Environment.IsDevelopment())
{
    services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(configuration.GetConnectionString("Development")));
}
else
{
    services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(configuration.GetConnectionString("Production")));
}

// Identity
services
    .AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// Controllers
services.AddControllers();

// SendGrid Service
services.Configure<AuthMessageSenderOptions>(configuration.GetSection("SendGrid"));
services.AddTransient<IEmailSender, EmailSender>();

// === Build the app === //
var app = builder.Build();

if (builder.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapFallbackToFile("index.html");

app.Run();
