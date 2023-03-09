import { AuthenticationException } from '@adonisjs/auth/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/**
 * Auth middleware is meant to restrict un-authenticated access to a given route
 * or a group of routes.
 *
 * You must register this middleware inside `start/kernel.ts` file under the list
 * of named middleware.
 */
export default class AuthTenant {
  /**
   * The URL to redirect to when request is Unauthorized
   */
  protected redirectTo = '/login'

  /**
   * Authenticates the current HTTP request against a custom set of defined
   * guards.
   *
   * The authentication loop stops as soon as the user is authenticated using any
   * of the mentioned guards and that guard will be used by the rest of the code
   * during the current request.
   */
  protected async authenticate(auth: HttpContextContract['auth']) {




    if (await auth.use('tenant').check()) {
      return true
    }


    /**
     * Unable to authenticate using any guard
     */
    throw new AuthenticationException(
      'Unauthorized access',
      'E_UNAUTHORIZED_ACCESS',
      this.redirectTo,
    )
  }

  /**
   * Handle request
   */
  public async handle (
    { auth }: HttpContextContract,
    next: () => Promise<void>,
  ) {
    /**
     * Uses the user defined guards or the default guard mentioned in
     * the config file
     */
    await this.authenticate(auth)
    await next()
  }
}
