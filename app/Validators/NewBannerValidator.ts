import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class NewBannerValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    img: schema.string(),
    active: schema.boolean.optional()
  })


  public messages: CustomMessages = {}
}
