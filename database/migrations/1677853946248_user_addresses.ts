import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'user_addresses'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('street')
      table.string('street_number')
      table.string('zipcode')
      table.integer('district_id').unsigned().references('id').inTable('districts').onDelete('CASCADE')
      table.string('city')
      table.string('state')
      table.string('complement')


    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
