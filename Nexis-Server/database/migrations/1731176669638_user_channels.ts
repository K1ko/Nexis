import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'user_channels'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('user_id').unsigned().references('id')
      table.integer('channel_id').unsigned().references('id')
      table.boolean('is_admin').notNullable().defaultTo(false)
      table.integer('kick_count').notNullable().defaultTo(0)
      table.boolean('is_banned').notNullable().defaultTo(false)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
