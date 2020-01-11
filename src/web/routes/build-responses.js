const { omit } = require('ramda')

const buildSuccessResponse = (result) => ({
  status: 'ok',
  data: result.entities || result.entity || result,
  meta: result.entities || result.entity ? omit(['entities', 'entity'], result) : {}
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
