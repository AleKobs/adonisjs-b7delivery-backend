import { uuid } from 'uuidv4';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tenant from 'App/Models/Tenant';
import User from 'App/Models/User';
import AuthLoginValidator from 'App/Validators/AuthLoginValidator';
import AuthTenantRegisterValidator from 'App/Validators/AuthTenantRegisterValidator';

import ForgotPasswordRequestValidator from 'App/Validators/ForgotPasswordRequestValidator';
import ForgotPasswordTokenRequestValidator from 'App/Validators/ForgotPasswordTokenRequestValidator';

export default class AuthController {


  public async registerTenant({request, response, auth}: HttpContextContract) {
    const data = await request.validate(AuthTenantRegisterValidator);
    const tenant = await Tenant.create(data);
    const token = await auth.use('tenant').login(tenant);

    response.json({
      error: [],
      token
    })
  }
  public async loginTenant({request, response, auth}: HttpContextContract) {
    const data = await request.validate(AuthLoginValidator);
    const token = await auth.use('tenant').attempt(data.email, data.password);

    response.json({
      error: [],
      token
    })
  }

  public async registerUser({request, response, auth}: HttpContextContract) {
    const data = await request.validate(AuthLoginValidator);
    const user = await User.create(data);
    const token = await auth.login(user);

    response.json({
      error: [],
      token
    })
  }
  public async loginUser({request, response, auth}: HttpContextContract) {
    const data = await request.validate(AuthLoginValidator);
    const token = await auth.use('user').attempt(data.email, data.password);

    response.json({
      error: [],
      token
    })
  }

  public async loginAdmin({request, response, auth}: HttpContextContract) {
    const data = await request.validate(AuthLoginValidator);
    const token = await auth.use('user').attempt(data.email, data.password);

    response.json({
      error: [],
      token
    })
  }

  public async forgotPassword({request, response}: HttpContextContract) {
    const data = await request.validate(ForgotPasswordRequestValidator)
    let user = await User.findBy('email', data.email)

    if (user) {
      const randomString =  (Math.random() + 1).toString(36).substring(7);
      user.recoveryToken = uuid();
      //TODO: Enviar um email com o hash ja´gerado.
      user.save();
    }

    response.json({
      error: [],
      message: 'E-mail enviado com sucesso'
    })
   }

  public async forgotPasswordToken({request, response}) {

    const data = await request.validate(ForgotPasswordTokenRequestValidator);

    const user = await User.query().where('email', data.email).where('remeberToken', data.token).first();
    if (user) {
      user.password = data.password;
      user.save();
      return response.json({
        error : [],
        message: 'Senha alterada com sucesso'
      });
      return;
    }

    return response.json({
      error : [{message: 'Combinação de email e token inválidas.'}],
    });

  }

  public async check({auth, response}: HttpContextContract) {
    const user = auth.user;
    if (!user) {
      response.unauthorized();
      return;
    }
    response.json({error: [], data: user, type: user._type})
    return;
  }


}
