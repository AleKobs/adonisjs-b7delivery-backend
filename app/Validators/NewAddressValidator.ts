import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class NewAddressValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    'street' : schema.string(),
    'street_number' : schema.string(),
    'district_id' : schema.number(),
    'city' : schema.string(),
    'state' : schema.string(),
    'complement' : schema.string.optional()
  })

  public messages: CustomMessages = {}
}
