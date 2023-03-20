import Route from '@ioc:Adonis/Core/Route'


Route.group(() => {


  Route.group(() => {
    Route.resource('products', 'ProductsController').only(['index', 'show']);
  })



}).prefix('/:tenant').middleware('tenantRequest');








