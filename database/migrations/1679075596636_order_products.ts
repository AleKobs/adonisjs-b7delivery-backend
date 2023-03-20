import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'order_products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('order_id').unsigned().references('id').inTable('orders').onDelete('CASCADE')
      table.integer('product_id').unsigned().references('id').inTable('products').onDelete('products').onDelete('CASCADE');
      table.float('product_price');
      table.integer('quantity').defaultTo(1);
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
