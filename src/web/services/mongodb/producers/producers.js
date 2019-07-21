const { compose } = require('ramda')
const { Producer } = require('./model')
const { createEntity } = require('../create-entity')
const { findEntity } = require('../find-entity')
const { findEntities } = require('../find-entities')
const { updateEntity } = require('../update-entity')
const { removeEntityById } = require('../remove-entity-by-id')
const { thenTransformEntities, thenTransformEntity } = require('../transform-result')

const create = compose(thenTransformEntity, createEntity(Producer))
const findOne = compose(thenTransformEntity, findEntity(Producer))
const find = compose(thenTransformEntities, findEntities(Producer))
const update = compose(thenTransformEntity, updateEntity(Producer))
const removeById = removeEntityById(Producer)

module.exports = {
  create,
  findOne,
  find,
  update,
  removeById
}
