# angular_commmentBoard
This is an AngularJS based SPA project, bootstrap with AAL, focus on the usage of controller, service, directive, and custom directive encapsulation. On the business logic level, focus on register, login, logout, email and password validation, update profile and password, file(image) cut and upload, .etc. The techs cover AngularJS(ui-router,Angular-Async-Loader, requirejs ), mongodb+mongoose , node+express, jquery, ajax, bootstrap .etc.

### Set up database

Create an empty database,for example "myangulardb", then connect it:

```bash
mongod --dbpath "C:\myangulardb"

```

```bash
mongoose.connect('mongodb://localhost/myangulardb',...)
```

### Run

```bash
node app.js

```

### Test

Test admin client: http://127.0.0.1:3000

