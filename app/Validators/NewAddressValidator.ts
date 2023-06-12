import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class NewAddressValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    address: schema.string(),
    number: schema.string(),
    cep: schema.string(),
    city: schema.string(),
    neighborhood: schema.string(),
    state: schema.string(),
    complement: schema.string.optional(),
  })

  public messages: CustomMessages = {}
}
