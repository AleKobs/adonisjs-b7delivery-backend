import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Tenant from './Tenant'
import Category from './Category'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public categoryId: number

  @column()
  public img: string

  @column()
  public price: number

  @column()
  public description: string

  @column()
  public isDeleted: boolean

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>

  @column({serializeAs: null})
  public tenantId: number

  @belongsTo(() => Tenant)
  public tenant: BelongsTo<typeof Tenant>
}
