import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthLoginValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string([rules.email()]),
    password: schema.string()
  })


  public messages: CustomMessages = {
    'password.*': 'Senha inválida',
    'email.email': 'Informe um e-mail válido',
  }
}
