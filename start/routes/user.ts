import Route from '@ioc:Adonis/Core/Route'


Route.group(() => {


  Route.group(() => {
    Route.resource('addresses', 'AddressesController').only(['index', 'show', 'update', 'destroy', 'store']);
  }).middleware('auth:user')

}).prefix('/user')






