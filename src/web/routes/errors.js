const wrapError = ({ message, statusCode }) => Object.assign(new Error(), {
  message,
  statusCode
})

module.exports = {
  wrapError
}
