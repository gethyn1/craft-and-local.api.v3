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

const setFilter = (key, fn = defaultFilter) => (value) => (filters) =>
  isNilOrEmpty(value) ? filters : fn(key, value, filters)

module.exports = {
  defaultFilter,
  excludeFilter,
  latlngFilter,
  mindistanceFilter,
  setFilter
}
