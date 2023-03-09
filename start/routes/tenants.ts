import Route from '@ioc:Adonis/Core/Route'


Route.group(() => {


  Route.group(() => {
    Route.resource('categories', 'CategoriesController').only(['index', 'destroy', 'store']);
  }).middleware('auth:tenant')





}).prefix('/tenant')






