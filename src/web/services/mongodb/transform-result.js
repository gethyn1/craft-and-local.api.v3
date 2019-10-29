const { assoc, compose, map, omit, path, then } = require('ramda')

const omitMongoDbProps = omit(['__v', '_id'])

const normaliseId = (document) => assoc('id', path(['_id'], document), document)

const normaliseMongoDbProps = compose(omitMongoDbProps, normaliseId)

const transformResult = (document) => normaliseMongoDbProps(document.toObject())

const thenTransformEntities = then(map(transformResult))

const thenTransformEntity = then(transformResult)

module.exports = {
  normaliseMongoDbProps,
  transformResult,
  thenTransformEntities,
  thenTransformEntity
}
