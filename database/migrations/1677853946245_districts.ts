import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'districts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('tenant_id').unsigned().references('id').inTable('tenants').onDelete('CASCADE')
      table.string('name').notNullable()
      table.float('price')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
