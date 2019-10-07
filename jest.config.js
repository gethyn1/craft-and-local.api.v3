const { defaults } = require('jest-config')

module.exports = {
  ...defaults,
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/web/**/test/**/*.integration.test.js']
}
