const test = require('tape')
const {
  defaultFilter,
  excludeFilter,
  latlngFilter,
  mindistanceFilter
} = require('./filters')

const filters = {
  some: 'other filter'
}

test('defaultFilter() should add key value pair to filters', (t) => {
  const expected = {
    some: 'other filter',
    new: 'filter'
  }

  const result = defaultFilter('new', 'filter', filters)

  t.deepEqual(result, expected, 'should add key value pair to filters')
  t.end()
})

test('excludeFilter() should add filter in correct format', (t) => {
  const exclude = 'one,two,three'

  const expected = {
    some: 'other filter',
    _id: {
      $nin: ['one', 'two', 'three']
    }
  }

  const result = excludeFilter(null, exclude, filters)

  t.deepEqual(result, expected, 'should add filter in correct format')
  t.end()
})

test('latlngFilter() should add filter in correct format', (t) => {
  const latlng = '1234,5678'

  const expected = {
    some: 'other filter',
    location: {
      $near: {
        $geometry: { type: 'Point', coordinates: [ '5678', '1234' ] }
      }
    }
  }

  const result = latlngFilter(null, latlng, filters)

  t.deepEqual(result, expected, 'should add filter in correct format')
  t.end()
})

test('mindistanceFilter() should add filter in correct format', (t) => {
  const mindistance = '10000'

  const expected = {
    some: 'other filter',
    location: {
      $near: {
        $minDistance: '10000'
      }
    }
  }

  const result = mindistanceFilter(null, mindistance, filters)

  t.deepEqual(result, expected, 'should add filter in correct format')
  t.end()
})
