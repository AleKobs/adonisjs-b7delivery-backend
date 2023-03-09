import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Address from 'App/Models/Address'
import District from 'App/Models/District'
import NewAddressValidator from 'App/Validators/NewAddressValidator'

export default class AddressesController {
  public async index({ auth, response }: HttpContextContract) {
    const user = await auth.user

    const userAddress = await Address.query().where('user_id', user!.id)
    response.json({ address: userAddress })
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const data = await request.validate(NewAddressValidator)
    const user = await auth.user!

    const district = await District.find(data.district_id)
    if (!district) {
      return response.badRequest()
    }

    let newAddress = await Address.create({ ...data, userId: user.id })

    response.json({ error: [], newAddress })
  }

  public async show({ request, auth, response }: HttpContextContract) {
    const user = await auth.user
    const addressId = request.params().id
    if (!addressId || !user) {
      return response.badRequest()
    }

    const address = await Address.query().where('id', addressId).where('user_id', user.id).first()

    response.json({ error: [], address })
  }

  public async update({request, auth, response}: HttpContextContract) {
    const data = await request.validate(NewAddressValidator);
    const user = await auth.user;
    const addressId = await request.params().id;

    const district = await District.find(data.district_id);
    if (!district) {
      return response.badRequest();
    }
    const address = await Address.query().where('id', addressId).where('user_id', user!.id).first()
    await address?.merge(data).save();
    response.json({error: [], address})
  }

  public async destroy({ request, auth, response }: HttpContextContract) {
    const user = await auth.user
    const addressId = request.params().id

    if (!addressId || !user) {
      return response.badRequest()
    }

    const address = await Address.query().where('id', addressId).where('user_id', user.id).first()

    await address?.delete()

    response.json({ error: [] })
  }
}
