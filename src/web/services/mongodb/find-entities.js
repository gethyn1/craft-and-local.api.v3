const setConditionsNoop = () => ({})

const findEntities = (Entity, setConditions = setConditionsNoop) => async (query) => {
  try {
    const entities = await Entity
      .find(setConditions(query))
      .exec()

    return entities
  } catch (error) {
    throw error
  }
}

module.exports = {
  findEntities
}
