const { compose } = require('ramda')
const { Category } = require('./model')
const { createEntity } = require('../create-entity')
const { findEntityById } = require('../find-entity-by-id')
const { findEntities } = require('../find-entities')
const { updateEntityById } = require('../update-entity-by-id')
const { removeEntityById } = require('../remove-entity-by-id')
const { thenTransformEntities, thenTransformEntity } = require('../transform-result')

const create = compose(thenTransformEntity, createEntity(Category))
const findById = compose(thenTransformEntity, findEntityById(Category))
const find = compose(thenTransformEntities, findEntities(Category))
const updateById = compose(thenTransformEntity, updateEntityById(Category))
const removeById = compose(thenTransformEntity, removeEntityById(Category))

module.exports = {
  create,
  findById,
  find,
  updateById,
  removeById
}
