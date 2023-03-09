import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Address from 'App/Models/Address'
import Category from 'App/Models/Category'
import District from 'App/Models/District'
import NewAddressValidator from 'App/Validators/NewAddressValidator'
import NewCategoryValidator from 'App/Validators/NewCategoryValidator'

export default class CategoriesController {
  public async index({ auth, response }: HttpContextContract) {
    const tenant = await auth.user

    const categories = await Category.query().where('tenant_id', tenant!.id)
    response.json({categories})
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const tenant = await auth.user
    const data = await request.validate(NewCategoryValidator);


    const newCategory = await Category.create({...data, tenantId: tenant!.id});

    response.json({error: [], newCategory})

  }

  public async update({request, auth, response}: HttpContextContract) {
    const data = await request.validate(NewCategoryValidator);
    const tenant = await auth.user;
    const categoryId = await request.params().id;


    const category = await Category.query().where('id', categoryId).where('user_id', tenant!.id).first()
    await category?.merge(data).save();
    response.json({error: [], category})
  }

  public async destroy({ request, auth, response }: HttpContextContract) {
    const tenant = await auth.user
    const categoryId = request.params().id

    if (!categoryId || !tenant) {
      return response.badRequest()
    }

    const address = await Category.query().where('id', categoryId).where('tenant_id', tenant.id).first()

    await address?.delete()

    response.json({ error: [] })
  }
}
