import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tenant from 'App/Models/Tenant';

export default class TenantRequest {

  public async handle({
    request,
    response,
    params
  }: HttpContextContract, next: () => Promise<void>) {

    const requestTenant = params.tenant;
    if (!requestTenant) {
      response.status(401).json({
        error: 'Invalid tenant'
      });
      return;
    }


    const databaseTenant = await Tenant.findBy('slug', requestTenant);
    if (!databaseTenant) {
      response.status(401).json({
        error: 'Invalid tenant'
      });
      return;
    }
    request.tenant = requestTenant;

    await next()
  }
}
