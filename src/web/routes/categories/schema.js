const Joi = require('@hapi/joi')
const { TITLE, SLUG } = require('./keys')

// TODO: unit test with safe-regex
const KEBAB_CASE_REGEX = /^[0-9a-z-]+$/

const CATEGORY_VALIDATION_KEYS = {
  [TITLE]: Joi.string().min(1).max(20),
  [SLUG]: Joi.string().pattern(KEBAB_CASE_REGEX).min(1).max(20)
}

const CREATE_CATEGORY_VALIDATION_KEYS = {
  [TITLE]: Joi.string().min(1).max(20).required(),
  [SLUG]: Joi.string().pattern(KEBAB_CASE_REGEX).min(1).max(20).required()
}

module.exports = {
  UPDATE_CATEGORY_SCHEMA: Joi.object().keys(CATEGORY_VALIDATION_KEYS),
  CREATE_CATEGORY_SCHEMA: Joi.object().keys(CREATE_CATEGORY_VALIDATION_KEYS)
}
