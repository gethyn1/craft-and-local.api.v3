const { assocPath, compose, isNil, isEmpty, or, reverse, split } = require('ramda')

const isNilOrEmpty = (value) => or(isNil(value), isEmpty(value))

const NEAR_PATH = ['location', '$near']
const GEOMETRY_PATH = [...NEAR_PATH, '$geometry']

const defaultFilter = (key, value, filters) => ({
  ...filters,
  [key]: value
})

const excludeFilter = (key, value, filters) => ({
  ...filters,
  _id: {
    $nin: value.split(',')
  }
})

const latlngFilter = (key, value, filters) => {
  const lnglat = compose(reverse, split(','))(value)

  return compose(
    assocPath([...GEOMETRY_PATH, 'type'], 'Point'),
    assocPath([...GEOMETRY_PATH, 'coordinates'], lnglat)
  )(filters)
}

const mindistanceFilter = (key, value, filters) => assocPath([...NEAR_PATH, '$minDistance'], value, filters)

const maxdistanceFilter = (key, value, filters) => assocPath([...NEAR_PATH, '$maxDistance'], value, filters)

const latlngStringToLnglat = compose(reverse, split(','))

// https://docs.mongodb.com/manual/tutorial/calculate-distances-using-spherical-geometry-with-2d-geospatial-indexes/
const kmToRadius = km => km / 6378.1

const radiusFilter = (key, value, filters) => {
  const { radius, latlng } = value

  return (isNil(radius) || isNil(latlng))
    ? filters
    : assocPath(
      ['location', '$geoWithin', '$centerSphere'],
      [latlngStringToLnglat(latlng), kmToRadius(radius)],
      filters
    )
}

const setFilter = (key, fn = defaultFilter) => (value) => (filters) =>
  isNilOrEmpty(value) ? filters : fn(key, value, filters)

module.exports = {
  defaultFilter,
  excludeFilter,
  latlngFilter,
  mindistanceFilter,
  maxdistanceFilter,
  radiusFilter,
  setFilter
}
