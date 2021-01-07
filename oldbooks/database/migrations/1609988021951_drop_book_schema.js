'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DropBookSchema extends Schema {
  up () {
   this.drop('books');
  }

  down () {
    this.table('drop_books', (table) => {
      // reverse alternations
    })
  }
}

module.exports = DropBookSchema
