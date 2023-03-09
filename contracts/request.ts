import Tenant from "App/Models/Tenant";

declare module '@ioc:Adonis/Core/Request' {
  interface RequestContract {
    tenant: Tenant
  }
}
