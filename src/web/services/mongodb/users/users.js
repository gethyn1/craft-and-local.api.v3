const { compose, map, omit, then } = require('ramda')
const { User } = require('./model')
const { createEntity } = require('../create-entity')
const { findEntityById } = require('../find-entity-by-id')
const { findEntities } = require('../find-entities')
const { updateEntityById } = require('../update-entity-by-id')
const { removeEntityById } = require('../remove-entity-by-id')
const { thenTransformEntities, thenTransformEntity } = require('../transform-result')

const omitPassword = omit(['password'])

const thenOmitPassword = then(omitPassword)

const create = compose(thenTransformEntity, createEntity(User))
const findById = compose(thenOmitPassword, thenTransformEntity, findEntityById(User))
const find = compose(then(map(omitPassword)), thenTransformEntities, findEntities(User))
const updateById = compose(thenOmitPassword, thenTransformEntity, updateEntityById(User))
const removeById = compose(thenOmitPassword, thenTransformEntity, removeEntityById(User))

module.exports = {
  create,
  findById,
  find,
  updateById,
  removeById
}
