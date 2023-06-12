import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.resource('products', 'ProductsController').only(['index', 'show'])
  })

  Route.get('/', 'AuthTenantsController.getTenant')
})
  .prefix('/:tenant')
  .middleware('tenantRequest')
