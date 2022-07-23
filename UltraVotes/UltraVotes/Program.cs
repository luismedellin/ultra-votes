using UltraVotes.Core.Services;
using UltraVotes.Data;
using UltraVotes.Data.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

#region Libraries Configuration
builder.Services.AddSingleton<DapperContext>();
#endregion
#region My Services
builder.Services.AddTransient<IUnitOfWork, UnitOfWork>();
builder.Services.AddTransient<IMasterDataRepository, MasterDataRepository>();
builder.Services.AddTransient<IMasterVoteRepository, MasterVoteRepository>();
builder.Services.AddTransient<IUserRepository, UserRepository>();

builder.Services.AddTransient<IMasterVoteService, MasterVoteService>();
builder.Services.AddTransient<IMasterDataService, MasterDataService>();
#endregion
builder.Services.AddControllersWithViews();
builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
{
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseCors("corsapp");
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
