'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Country extends Model {
  publishers() {
    return this.hasMany('App/Models/Publisher')
  }
}

module.exports = Country
