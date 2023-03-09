import Route from '@ioc:Adonis/Core/Route'


Route.group(() => {
  // User
  Route.post('/user/register', 'AuthUsersController.register');
  Route.post('/user/login', 'AuthController.loginUser');

  // Tenant
  Route.post('/tenant/register', 'AuthTenantsController.register');
  Route.post('/tenant/login', 'AuthController.loginTenant');

  // Check
  Route.get('/check', 'AuthController.check');
}).prefix('/auth')






