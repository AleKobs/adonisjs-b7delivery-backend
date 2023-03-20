import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import Order from './Order'

export default class OrderProduct extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public orderId: number

  @belongsTo(() => Order)
  public order: BelongsTo<typeof Order>


  @column()
  public productId: number

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>


  @column()
  public productPrice: number

  @column()
  public quantity: number

}
