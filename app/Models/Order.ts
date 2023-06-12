import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Address from './Address'
import Tenant from './Tenant'
import OrderProduct from './OrderProduct'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public tenant_id: number

  @belongsTo(() => Tenant)
  public tenant: BelongsTo<typeof Tenant>

  @column()
  public user_id: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public address_id: number

  @belongsTo(() => Address)
  public address: BelongsTo<typeof Address>

  @column()
  public payment_method: string

  @column()
  public payment_money_return: number

  @column()
  public delivery_price: number

  @column()
  public subtotal: number

  @column()
  public status: number

  @hasMany(() => OrderProduct, {
    foreignKey: 'orderId',
  })
  public products: HasMany<typeof OrderProduct>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
