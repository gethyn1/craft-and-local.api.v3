const { defaults } = require('jest-config')

module.exports = {
  ...defaults,
  testEnvironment: 'node',
  testMatch: ['**/integration-test.js']
}
