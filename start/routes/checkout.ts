import Route from '@ioc:Adonis/Core/Route'


Route.group(() => {




  Route.resource('checkout', 'OrdersController').only(['store', 'show']);



}).prefix('/:tenant').middleware(['tenantRequest', 'auth']);








