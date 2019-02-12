# Example microservice
Microservice which is the core of our application. Everything happens here. This is the public accessible API.

### Environmental variables

```
{
    "LISTEN_PORT": , //Default is 3001. Not required
    "APP_ENV": "", //Available options: dev, staging, prod
    "APP_PATH": "", //Subdirectory on which app should be available. Leave empty for /
    "DB_USERNAME": "", //MySQL database environmentals
    "DB_PASSWORD": "",
    "DB_NAME": "",
    "DB_HOSTNAME": "",
    "MAIL_HOST": "",
    "MAIL_LOGIN": "",
    "MAIL_PASSWORD": "",
    "FRONTEND_URL":"" //Base url of the app frontend
}
```

### Documentation

Application documentation available on staging and dev environments on path: **/docs**.
Password is required to access.

### Database

In order to perform database migration you need to use command:

```
sequelize db:migrate --env "dev/prod/staging"
```

