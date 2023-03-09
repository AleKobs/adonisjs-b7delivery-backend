import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Tenant from './Tenant'

export default class District extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public price: number

  @belongsTo(() => Tenant)
  public tenant: BelongsTo<typeof Tenant>

}
