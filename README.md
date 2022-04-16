# ECommerce

Online store

## Installation

1. Clone the code
2. Make sure you have the necessary environments instlaled in your system; [.NET 6](https://dotnet.microsoft.com/en-us/download), [Node 16](https://nodejs.org/en/download/) & [PostgreSQL Database](https://www.postgresql.org/download/)
3. Register to [SendGrid](https://sendgrid.com/) mail service
3. Open ```appsettings.json``` and update your email, password and mail service key in ```SendGrid``` section
also update your database username and password in ```ConnectionStrings/Development``` section
4. Run ```cd ClientApp/``` then ```yarn install``` to install the front end dependencies
5. Run ```cd ..```\
then run the application by\
```dotnet run``` or ```dotnet watch run``` for development purposes

## Contributing
Developed by Sprints Team 8
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
