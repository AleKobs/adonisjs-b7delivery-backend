import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import AuthUserRegisterValidator from 'App/Validators/AuthUserRegisterValidator'

export default class AuthUsersController {

  public async register({request, response, auth}: HttpContextContract) {
    const data = await request.validate(AuthUserRegisterValidator);
    const user = await User.create(data);
    const token = await auth.login(user);

    response.json({
      success:true,
      user,
      token
    })
  }

}
