const mongoose = require('mongoose')

const BAKERY_CATEGORY_ID = mongoose.Types.ObjectId()
const VEG_BOX_CATEGORY_ID = mongoose.Types.ObjectId()

// TO DO: define proper addresses / coordinates for test locations
const LOCATION_A = {
  title: 'Mama\'s Little Bakery',
  location: {
    type: 'Point',
    coordinates: [41.8781, 87.6298]
  },
  categories: [BAKERY_CATEGORY_ID],
  address: 'Chicago, IL',
  alias: 'First Street'
}

const LOCATION_B = {
  title: 'The Remote Bakery',
  location: {
    type: 'Point',
    coordinates: [53.7632, 2.7044]
  },
  categories: [BAKERY_CATEGORY_ID],
  address: 'Number 5, Remote Place, LA22 9BU',
  alias: 'Near the lake'
}

const LOCATION_C = {
  title: 'The Organic Turnip Co',
  location: {
    type: 'Point',
    coordinates: [52.1121, 2.3121]
  },
  categories: [VEG_BOX_CATEGORY_ID],
  address: '33, Rural Location, IV1 1AW',
  alias: ''
}

module.exports = {
  LOCATION_A,
  LOCATION_B,
  LOCATION_C,
  BAKERY_CATEGORY_ID
}
