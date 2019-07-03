const { compose, omit } = require('ramda')
const { Location } = require('./model')
const { createEntity } = require('../create-entity')
const { findEntityById } = require('../find-entity-by-id')
const { findEntities } = require('../find-entities')
const { updateEntityById } = require('../update-entity-by-id')
const { removeEntityById } = require('../remove-entity-by-id')
const { excludeFilter, latlngFilter, mindistanceFilter, setFilter } = require('./filters')

const transformFields = fields => {
  const location = {
    type: 'Point',
    coordinates: fields.coordinates
  }

  return {
    location,
    ...omit(['coordinates'], fields)
  }
}

const create = compose(createEntity(Location), transformFields)

const update = (entity) => (id, fields) => updateEntityById(entity)(id, transformFields(fields))

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

module.exports = {
  transformFields,
  create,
  findById: findEntityById(Location),
  find: findEntities(Location, setConditions),
  update: update(Location),
  removeById: removeEntityById(Location)
}
