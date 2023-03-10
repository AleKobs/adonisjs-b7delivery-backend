import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tenants'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('slug').unique().notNullable()
      table.enum('status', ['ONLINE', 'OFFLINE']).defaultTo('ONLINE')
      table.string('name')
      table.string('main_color').defaultTo('#000000')
      table.string('second_color').defaultTo('#555555')

      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()



      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
