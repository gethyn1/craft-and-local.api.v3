const { compose } = require('ramda')
const { Producer } = require('./model')

const {
  excludeFilter,
  latlngFilter,
  mindistanceFilter,
  setFilter
} = require('./filters')

const setCategoryFilter = setFilter('categories')
const setExcludeFilter = setFilter('exclude', excludeFilter)
const setLatlngFilter = setFilter('latlng', latlngFilter)
const setMindistanceFilter = setFilter('mindistance', mindistanceFilter)

const find = async ({ categories, exclude, latlng, limit, mindistance }) => {
  try {
    const filters = compose(
      setMindistanceFilter(mindistance),
      setLatlngFilter(latlng),
      setExcludeFilter(exclude),
      setCategoryFilter(categories)
    )({})

    const results = await Producer
      .find(filters)
      .limit(parseInt(limit, 10))
      .exec()

    return {
      statusCode: 200,
      status: 'success',
      data: {
        producers: results
      }
    }
  } catch (error) {
    throw new Error(error.errmsg)
  }
}

module.exports = {
  find
}
