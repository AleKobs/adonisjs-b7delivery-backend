import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('tenant_id').unsigned().references('id').inTable('tenants').onDelete('CASCADE')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('address_id').unsigned().references('id').inTable('user_addresses').onDelete('CASCADE')
      table.string('payment_method')
      table.float('payment_money_return').nullable()
      table.float('delivery_price').nullable()
      table.float('subtotal').nullable()
      table.string('status').nullable()

      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
