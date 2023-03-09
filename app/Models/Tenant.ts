import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'
import { TenantStatus } from 'Contracts/enums'
/**
 *
 *   table.increments('id')
      table.string('slug').unique()
      table.enum('status', ['ONLINE', 'OFFLINE']).defaultTo('ONLINE')
      table.string('name')
      table.string('main_color').defaultTo('#000000')
 *
 */
export default class Tenant extends BaseModel {
  public _type = 'tenant';


  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public slug : string

  @column()
  public name: string

  @column()
  public status: TenantStatus

  @column({ serializeAs: 'mainColor'})
  public mainColor: string

  @column({ serializeAs: 'secondColor'})
  public secondColor: string


  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (tenant: Tenant) {
    if (tenant.$dirty.password) {
      tenant.password = await Hash.make(tenant.password)
    }
  }
}
