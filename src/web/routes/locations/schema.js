const Joi = require('@hapi/joi')
const { COORDINATES, ADDRESS, TITLE, DESCRIPTION, CATEGORIES, ALIAS, INSTAGRAM_HANDLE, TWITTER_HANDLE, EMAIL, TELEPHONE, WEBSITE } = require('./keys')

const LOCATION_VALIDATION_KEYS = {
  [COORDINATES]: Joi.array().ordered(
    Joi.number().min(-90).max(90).required(),
    Joi.number().min(-180).max(180).required()
  ),
  [ADDRESS]: Joi.string().max(100),
  [TITLE]: Joi.string().min(1).max(50),
  [DESCRIPTION]: Joi.string().max(500),
  [CATEGORIES]: Joi.array().items(Joi.string().alphanum()),
  [ALIAS]: Joi.string().max(100),
  [INSTAGRAM_HANDLE]: Joi.string().alphanum().min(1).max(50),
  [TWITTER_HANDLE]: Joi.string().alphanum().min(1).max(50),
  [EMAIL]: Joi.string().email(),
  // TODO: implement proper phone number validation
  [TELEPHONE]: Joi.number().min(1).max(20),
  [WEBSITE]: Joi.string().uri().min(1).max(100)
}

const CREATE_LOCATION_VALIDATION_KEYS = {
  ...LOCATION_VALIDATION_KEYS,
  [ADDRESS]: Joi.string().max(100).required(),
  [TITLE]: Joi.string().min(1).max(50).required()
}

module.exports = {
  UPDATE_LOCATION_SCHEMA: Joi.object().keys(LOCATION_VALIDATION_KEYS),
  CREATE_LOCATION_SCHEMA: Joi.object().keys(CREATE_LOCATION_VALIDATION_KEYS)
}
