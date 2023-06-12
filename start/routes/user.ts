import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.resource('addresses', 'AddressesController').only([
      'index',
      'show',
      'update',
      'destroy',
      'store',
    ])
  }).middleware('auth:user')

  Route.get('/orders', 'OrdersController.indexUser').middleware('auth:user')
  Route.get('/orders/{id}', 'OrdersController.showUser').middleware('auth:user')
}).prefix('/user')
