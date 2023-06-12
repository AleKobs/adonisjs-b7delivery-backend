import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Tenant from './Tenant'
import Product from './Product'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column({ serializeAs: null })
  public tenantId: number

  @hasMany(() => Product)
  public products: HasMany<typeof Product>

  @belongsTo(() => Tenant)
  public tenant: BelongsTo<typeof Tenant>
}
