import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'

import Product from 'App/Models/Product'
import NewProductValidator from 'App/Validators/NewProductValidator'

export default class ProductsController {
  public async index({ request, response }: HttpContextContract) {
    const products = await Product.query()
      .where('tenant_id', request.tenant.id)
      .where('is_deleted', false)
      .preload('category')
    response.json({ error: [], products })
  }

  public async show({ request, response }: HttpContextContract) {
    const productId = request.params().id
    console.log(productId)

    const product = await Product.query()
      .where('tenant_id', request.tenant.id)
      .where('id', productId)
      .preload('category')
      .first()
    if (!product)
      return response.status(404).json({ error: [{ message: 'Produto não encontrado' }] })
    response.json({ error: [], product })
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const tenant = await auth.user
    const data = await request.validate(NewProductValidator)

    const hasCategory = await Category.query()
      .where('id', data.categoryId)
      .where('tenant_id', tenant!.id)
      .first()
    if (!hasCategory)
      return response.status(401).json({ error: [{ message: 'Categoria Inválida' }] })

    const newProduct = await Product.create({ ...data, tenantId: tenant!.id })

    response.json({
      success: true,
    })
  }

  public async update({ request, auth, response }: HttpContextContract) {
    const data = await request.validate(NewProductValidator)
    const tenant = await auth.user
    const productId = await request.params().id
    console.log(tenant!.id, productId)

    const hasCategory = await Category.query()
      .where('id', data.categoryId)
      .where('tenant_id', tenant!.id)
      .first()
    if (!hasCategory)
      return response.status(401).json({ error: [{ message: 'Categoria Inválida' }] })

    const oldProduct = await Product.query()
      .where('id', productId)
      .where('tenant_id', tenant!.id)
      .where('is_deleted', false)
      .first()
    if (!oldProduct) return response.status(401).json({ error: [{ message: 'Produto Inválido' }] })

    const newProduct = await oldProduct.merge(data).save()

    response.json({
      success: true,
    })
  }
}
