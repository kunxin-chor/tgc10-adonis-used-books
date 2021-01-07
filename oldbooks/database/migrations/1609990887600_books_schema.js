'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BooksSchema extends Schema {
  up () {
    this.table('books', (table) => {
      // alter table
      table.integer('publisher_id').unsigned().notNullable();
      table.foreign('publisher_id').references('publishers.id');
    })
  }

  down () {
    this.table('books', (table) => {
      // reverse alternations
    })
  }
}

module.exports = BooksSchema
