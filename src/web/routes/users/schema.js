const Joi = require('@hapi/joi')
const { EMAIL, PASSWORD } = require('./keys')

const USER_VALIDATION_KEYS = {
  [EMAIL]: Joi.string().email(),
  [PASSWORD]: Joi.string().min(5).max(100)
}

const CREATE_USER_VALIDATION_KEYS = {
  [EMAIL]: Joi.string().email().required(),
  [PASSWORD]: Joi.string().min(5).max(100).required()
}

module.exports = {
  UPDATE_USER_SCHEMA: Joi.object().keys(USER_VALIDATION_KEYS),
  CREATE_USER_SCHEMA: Joi.object().keys(CREATE_USER_VALIDATION_KEYS)
}
