import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class NewProductValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string(),
    categoryId: schema.number(),
    price : schema.number(),
    img: schema.string.optional(),
    description: schema.string.optional()
  })

  public messages: CustomMessages = {}
}
