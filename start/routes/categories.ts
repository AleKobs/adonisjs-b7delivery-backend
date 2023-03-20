import Route from '@ioc:Adonis/Core/Route'


Route.group(() => {


  Route.get('categories', 'CategoriesController.getAllCategories')



}).prefix('/:tenant').middleware('tenantRequest');








