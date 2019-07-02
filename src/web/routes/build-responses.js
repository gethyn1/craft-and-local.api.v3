const buildSuccessResponse = (result) => ({
  statusCode: 200,
  status: 'success',
  data: {
    [Array.isArray(result) ? 'entities' : 'entity']: result
  }
})

module.exports = {
  buildSuccessResponse
}
