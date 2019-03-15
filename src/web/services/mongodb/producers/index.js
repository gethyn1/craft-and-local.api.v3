const { find } = require('./find')
const { findOne } = require('./find-one')
const { update } = require('./update')
const { create } = require('./create')
const { removeByID } = require('./delete')

module.exports = {
  find,
  findOne,
  update,
  create,
  removeByID
}
