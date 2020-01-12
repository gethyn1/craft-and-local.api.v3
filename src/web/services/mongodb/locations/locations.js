const { compose, map, evolve, then } = require('ramda')
const { Location } = require('./model')
const { createEntity } = require('../create-entity')
const { findEntityById } = require('../find-entity-by-id')
const { findEntities } = require('../find-entities')
const { updateEntityById } = require('../update-entity-by-id')
const { removeEntityById } = require('../remove-entity-by-id')
const { excludeFilter, latlngFilter, mindistanceFilter, setFilter } = require('./filters')
const { normaliseMongoDbProps } = require('../transform-result')

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

// TODO unit test normaliseCategories
const normaliseCategories = evolve({ categories: map(normaliseMongoDbProps) })

const create = createEntity(Location)

const updateById = updateEntityById(Location)

const findById = findEntityById(Location)

const find = compose(then(map(normaliseCategories)), findEntities(Location, setConditions))

const removeById = removeEntityById(Location)

module.exports = {
  create,
  findById,
  find,
  updateById,
  removeById
}
