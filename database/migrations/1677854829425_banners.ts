import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'banners'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('tenant_id').unsigned().references('id').inTable('tenants').onDelete('CASCADE')
      table.boolean('active').defaultTo(true);
      table.string('img').notNullable();

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
