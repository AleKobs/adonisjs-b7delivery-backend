import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Banner from 'App/Models/Banner'
import NewBannerValidator from 'App/Validators/NewBannerValidator'

export default class BannersController {
  public async index({auth, response}: HttpContextContract) {
    const tenant = await auth.user

    const banners = await Banner.query().where('tenant_id', tenant!.id)
    response.json({error: [], banners})
  }

  public async store({auth, request, response}: HttpContextContract) {
    const tenant = await auth.user
    const data = await request.validate(NewBannerValidator);

    const newBanner = await Banner.create({...data, tenantId: tenant!.id});

    response.json({error: [], newBanner})
  }

  public async update({request, auth, response}: HttpContextContract) {
    const data = await request.validate(NewBannerValidator);
    const tenant = await auth.user;
    const bannerId = await request.params().id;

    const oldBanner = await Banner.query().where('id', bannerId).where('tenant_id', tenant!.id).first()
    if (!oldBanner) return response.status(401).json({error: [{message: 'Banner Inválido'}]});

    const newBanner = await oldBanner.merge(data).save();

    response.json({error: [], newBanner})
  }

  public async destroy({auth, request, response}: HttpContextContract) {
    const tenant = await auth.user
    const bannerId = await request.params().id;

    const oldBanner = await Banner.query().where('id', bannerId).where('tenant_id',tenant!.id).first()
    if (!oldBanner) { response.status(401).json({error: [{message: 'Não permitido'}]}); return; }

    await oldBanner.delete();
    response.json({error: []})
  }
}
