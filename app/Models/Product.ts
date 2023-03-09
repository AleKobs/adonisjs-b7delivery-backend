import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Tenant from './Tenant'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public categoryId: number

  @column()
  public tenantId: number

  @belongsTo(() => Tenant)
  public tenant: BelongsTo<typeof Tenant>
}
