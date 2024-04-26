using Salon.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(opcije =>
{
    opcije.AddPolicy("CorsPolicy",
        builder =>
            builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
    );

});

builder.Services.AddDbContext<SalonContext>(o =>
{
    o.UseSqlServer(builder.Configuration.GetConnectionString("SalonContext"));
});



var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
app.UseSwagger();
app.UseSwaggerUI(o =>
{
    o.DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.None);
});
//}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();


app.UseStaticFiles();
app.UseDefaultFiles();
app.MapFallbackToFile("index.html");

app.Run();
