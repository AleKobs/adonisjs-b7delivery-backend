import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Banner extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public tenantId: number

  @column()
  public img: string

  @column()
  public active: boolean
}
