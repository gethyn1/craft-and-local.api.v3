const buildSuccessResponse = (result) => ({
  status: 'ok',
  data: result
})

const buildErrorResponse = (errors) => ({
  status: 'ok',
  errors,
  data: null
})

module.exports = {
  buildSuccessResponse,
  buildErrorResponse
}
