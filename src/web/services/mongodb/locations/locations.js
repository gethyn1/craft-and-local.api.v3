const { compose } = require('ramda')
const { Location } = require('./model')
const { createEntity } = require('../create-entity')
const { findEntityById } = require('../find-entity-by-id')
const { findEntities } = require('../find-entities')
const { updateEntityById } = require('../update-entity-by-id')
const { removeEntityById } = require('../remove-entity-by-id')
const { excludeFilter, latlngFilter, mindistanceFilter, setFilter } = require('./filters')
const { thenTransformEntities, thenTransformEntity } = require('../transform-result')

const setCategoryFilter = setFilter('categories')
const setExcludeFilter = setFilter('exclude', excludeFilter)
const setLatlngFilter = setFilter('latlng', latlngFilter)
const setMindistanceFilter = setFilter('mindistance', mindistanceFilter)

const setConditions = ({ categories, exclude, latlng, mindistance }) =>
  compose(
    setMindistanceFilter(mindistance),
    setLatlngFilter(latlng),
    setExcludeFilter(exclude),
    setCategoryFilter(categories)
  )({})

const create = compose(thenTransformEntity, createEntity(Location))

const updateById = compose(thenTransformEntity, updateEntityById(Location))

const findById = compose(thenTransformEntity, findEntityById(Location))

const find = compose(thenTransformEntities, findEntities(Location, setConditions))

const removeById = compose(thenTransformEntity, removeEntityById(Location))

module.exports = {
  create,
  findById,
  find,
  updateById,
  removeById
}
