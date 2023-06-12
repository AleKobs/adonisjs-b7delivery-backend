import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Tenant from 'App/Models/Tenant'
import AuthTenantRegisterValidator from 'App/Validators/AuthTenantRegisterValidator'

export default class AuthTenantsController {
  public async register({ request, response, auth }: HttpContextContract) {
    const data = await request.validate(AuthTenantRegisterValidator)
    const tenant = await Tenant.create(data)
    const token = await auth.use('tenant').login(tenant)

    response.json({
      success: true,
      tenant,
      token,
    })
  }

  public async getTenant({ request, response }: HttpContextContract) {
    const tenantId = request.tenant.id

    const tenant = await Tenant.query().where('id', tenantId).first()

    const returnTenantData = {
      slug: tenant?.slug,
      name: tenant?.name,
      mainColor: tenant?.mainColor,
      secondColor: tenant?.secondColor,
    }

    response.json(returnTenantData)
  }
}
