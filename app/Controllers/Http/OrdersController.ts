import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Address from 'App/Models/Address'
import Order from 'App/Models/Order'
import OrderProduct from 'App/Models/OrderProduct'
import Product from 'App/Models/Product'
import NewOrderValidator from 'App/Validators/NewOrderValidator'

export default class OrdersController {
  public async index({}: HttpContextContract) {}

  public async store({ auth, request, response }: HttpContextContract) {
    const tenantId = request.tenant.id
    const userId = auth.user!.id

    const data = await request.validate(NewOrderValidator)
    const userAddress = await Address.query().where('id', data.address_id).first()
    if (!userAddress) {
      return response.badRequest({ error: [{ mesage: 'Invalid User Address' }] })
    }

    // REFACTOR TO MATCH CEP
    // const delivery_price = userAddress.district.price
    const delivery_price = 0
    //let subtotal = delivery_price

    let subtotal = delivery_price
    let productArray = <any>[]

    for (const product of data.products) {
      const actualProduct = await Product.query()
        .where('tenant_id', tenantId)
        .where('id', product.productId)
        .first()
      if (!actualProduct || product.quantity < 1) {
        return response.badRequest({ error: [{ message: 'Invalid product or quantity' }] })
      }

      subtotal += actualProduct.price * product.quantity
      productArray.push({
        id: actualProduct.id,
        price: actualProduct.price,
        quantity: product.quantity,
      })
    }

    const newOrder = await Order.create({
      tenant_id: tenantId,
      user_id: userId,
      address_id: data.address_id,
      payment_method: data.payment_method,
      payment_money_return: data.payment_money_return,
      delivery_price,
      subtotal,
      status: 1,
    })

    productArray.forEach(async (product) => {
      await OrderProduct.create({
        orderId: newOrder.id,
        productId: product.id,
        quantity: product.quantity,
        productPrice: product.price,
      })
    })

    return response.json({ error: [], newOrder })
  }

  public async show({ params, response, auth }: HttpContextContract) {
    const orderId = params.id
    const userId = auth.user!.id

    try {
      const order = await Order.query()
        .preload('products', (query) => query.preload('product'))
        .where('id', orderId)
        .andWhere('user_id', userId)
        .first()

      if (!order) {
        return response.status(404).json({ error: 'Order not found' })
      }

      return response.json(order)
    } catch (error) {
      return response.status(400).json({ error: 'Invalid order' })
    }
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
