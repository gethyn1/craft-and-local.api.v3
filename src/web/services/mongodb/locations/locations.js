const { compose, map, evolve, then } = require('ramda')
const { Location } = require('./model')
const { createEntity } = require('../create-entity')
const { findEntityById } = require('../find-entity-by-id')
const { findEntities } = require('../find-entities')
const { updateEntityById } = require('../update-entity-by-id')
const { removeEntityById } = require('../remove-entity-by-id')
const { excludeFilter, radiusFilter, setFilter } = require('./filters')
const { thenTransformEntity, normaliseMongoDbProps } = require('../transform-result')

const setCategoryFilter = setFilter('categories')
const setExcludeFilter = setFilter('exclude', excludeFilter)
const setRadiusFilter = setFilter('radius', radiusFilter)

const setConditions = ({ categories, exclude, latlng, radius }) =>
  compose(
    setExcludeFilter(exclude),
    setCategoryFilter(categories),
    setRadiusFilter({ latlng, radius })
  )({})

// TODO unit test normaliseCategories
const normaliseCategories = evolve({ categories: map(normaliseMongoDbProps) })

const create = compose(thenTransformEntity, createEntity(Location))

const updateById = compose(thenTransformEntity, updateEntityById(Location))

const findById = compose(thenTransformEntity, findEntityById(Location))

const findTransformations = {
  entities: map(normaliseCategories)
}

const find = compose(then(evolve(findTransformations)), findEntities(Location, setConditions))

const removeById = compose(thenTransformEntity, removeEntityById(Location))

module.exports = {
  create,
  findById,
  find,
  updateById,
  removeById
}
