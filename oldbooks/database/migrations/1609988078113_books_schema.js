'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BooksSchema extends Schema {
  up () {
    this.create('books', (table) => {
       table.increments()
      // title varchar(100) NOT NULL
      table.string('title', 100).notNullable();
      // condition tinyint NOT NULL DEFAULT 1
      table.integer('condition').defaultTo(1).notNullable()
      table.integer('price').defaultTo(0).notNullable()
      table.integer('publisher_id').unsigned().notNullable();
      table.foreign('publisher_id').references('countries.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('books')
  }
}

module.exports = BooksSchema
