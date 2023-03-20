import Route from '@ioc:Adonis/Core/Route'


Route.group(() => {

    // Gestão de Banners / Promoções
    Route.group(() => {
      Route.resource('banners', 'BannersController').only(['index', 'destroy', 'store']);
    }).middleware('auth:tenant')


  // Gestão de categorias
  Route.group(() => {
    Route.resource('categories', 'CategoriesController').only([ 'destroy', 'index', 'store']);
  }).middleware('auth:tenant')



  // Gestão de produtos
  Route.group(() => {
    Route.resource('products', 'ProductsController').only(['update', 'store', 'destroy']);
  }).middleware('auth:tenant');



}).prefix('/tenant')






