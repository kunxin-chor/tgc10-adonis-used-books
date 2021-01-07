'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PublishersSchema extends Schema {
  up () {
    this.table('publishers', (table) => {
      // alter table
      table.integer('country_id').unsigned().notNullable();
      table.foreign('country_id').references('countries.id');
    })
  }

  down () {
    this.table('publishers', (table) => {
      // reverse alternations
    })
  }
}

module.exports = PublishersSchema
