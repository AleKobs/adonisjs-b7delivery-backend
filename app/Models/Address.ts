import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import District from './District'

export default class Address extends BaseModel {

  public static table = 'user_addresses'

  @column({ isPrimary: true })
  public id: number

  @column()
  public street: string

  @column()
  public street_number: string

  @column()
  public zipcode: string

  @column()
  public city: string

  @column()
  public state: string

  @column()
  public complement: string

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public districtId: number

  @belongsTo(() => District)
  public district: BelongsTo<typeof District>


}
