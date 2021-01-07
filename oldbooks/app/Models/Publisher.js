'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')


class Publisher extends Model {
  books() {
    return this.hasMany('App/Models/Book')
  }
}

module.exports = Publisher
