const { find } = require('./find')
const { findOne } = require('./find-one')
const { create } = require('./create')
const { update } = require('./update')
const { removeByID } = require('./delete')
const { authenticate } = require('./authenticate')

module.exports = {
  find,
  findOne,
  create,
  update,
  removeByID,
  authenticate
}
