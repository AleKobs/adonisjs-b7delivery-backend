import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Tenant from './Tenant'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public tenantId: number

  @belongsTo(() => Tenant)
  public tenant: BelongsTo<typeof Tenant>


}
