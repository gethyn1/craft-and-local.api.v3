const { compose, omit } = require('ramda')
const { Location } = require('./model')
const { createEntity } = require('../create-entity')
const { findEntityById } = require('../find-entity-by-id')
const { findEntities } = require('../find-entities')
const { updateEntityById } = require('../update-entity-by-id')
const { removeEntityById } = require('../remove-entity-by-id')

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

module.exports = {
  transformFields,
  create,
  findById: findEntityById(Location),
  find: findEntities(Location),
  update: update(Location),
  removeById: removeEntityById(Location)
}
