const findEntities = (Entity) => async () => {
  try {
    const results = await Entity
      .find()
      .exec()

    return {
      statusCode: 200,
      status: 'success',
      data: {
        entities: results
      }
    }
  } catch (error) {
    throw new Error(error.errmsg)
  }
}

module.exports = {
  findEntities
}
