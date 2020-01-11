const { assoc, compose, omit, path } = require('ramda')

const omitMongoDbProps = omit(['__v', '_id'])

const normaliseId = (document) => assoc('id', path(['_id'], document), document)

const normaliseMongoDbProps = compose(omitMongoDbProps, normaliseId)

const transformResult = (document) => normaliseMongoDbProps(document.toObject())

module.exports = {
  normaliseMongoDbProps,
  transformResult
}
