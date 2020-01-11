const { propOr } = require('ramda')
const { transformResult } = require('./transform-result')

const setConditionsNoop = () => ({})

const DEFAULT_QUERY_LIMIT = 50

const findEntities = (Entity, setConditions = setConditionsNoop) => async (query) => {
  const limit = parseInt(propOr(DEFAULT_QUERY_LIMIT, 'limit', query), 10)

  try {
    const queryConditions = setConditions(query)

    const entities = await Entity
      .find(queryConditions)
      .limit(limit)
      .exec()

    return entities.map(transformResult)
  } catch (error) {
    throw error
  }
}

module.exports = {
  findEntities
}
