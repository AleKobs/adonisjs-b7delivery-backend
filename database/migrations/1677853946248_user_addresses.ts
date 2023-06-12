import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'user_addresses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('address')
      table.string('number')
      table.string('cep')
      table.string('neighborhood')

      table.string('city')
      table.string('state')
      table.string('complement')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
