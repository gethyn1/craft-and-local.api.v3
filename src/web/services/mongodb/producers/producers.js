const { Producer } = require('./model')
const { createEntity } = require('../create-entity')
const { findEntity } = require('../find-entity')
const { findEntities } = require('../find-entities')
const { updateEntity } = require('../update-entity')
const { removeEntityById } = require('../remove-entity-by-id')

module.exports = {
  create: createEntity(Producer),
  findOne: findEntity(Producer),
  find: findEntities(Producer),
  update: updateEntity(Producer),
  removeById: removeEntityById(Producer)
}
