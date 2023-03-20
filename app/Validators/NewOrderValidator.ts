import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class NewOrderValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    address_id: schema.number(),
    payment_method: schema.string(),
    payment_money_return: schema.number.optional(),
    delivery_price: schema.number.optional(),
    subtotal: schema.number.optional(),
    products: schema.array().members(schema.object().members({
      productId: schema.number(),
      quantity: schema.number(),
    }))
  })
  public messages: CustomMessages = {}
}
