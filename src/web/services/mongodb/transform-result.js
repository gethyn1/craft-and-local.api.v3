const { assoc, compose, map, omit, path, then } = require('ramda')

const omitMongoDbProps = omit(['__v', '_id'])

const normaliseId = (document) => assoc('id', path(['_id'], document), document)

const transformResult = (document) => compose(omitMongoDbProps, normaliseId)(document.toObject())

const thenTransformEntities = then(map(transformResult))

const thenTransformEntity = then(transformResult)

module.exports = {
  transformResult,
  thenTransformEntities,
  thenTransformEntity
}
