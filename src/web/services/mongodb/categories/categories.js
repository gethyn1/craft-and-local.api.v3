const { Category } = require('./model')
const { createEntity } = require('../create-entity')
const { findEntityById } = require('../find-entity-by-id')
const { findEntities } = require('../find-entities')
const { updateEntityById } = require('../update-entity-by-id')
const { removeEntityById } = require('../remove-entity-by-id')

const create = createEntity(Category)
const findById = findEntityById(Category)
const find = findEntities(Category)
const updateById = updateEntityById(Category)
const removeById = removeEntityById(Category)

module.exports = {
  create,
  findById,
  find,
  updateById,
  removeById
}
