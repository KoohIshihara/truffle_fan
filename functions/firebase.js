const admin = require('firebase-admin')

// Prod
admin.initializeApp({
  apiKey: 'AIzaSyBHmMs1jbWcDNCy4BByX37azJBEFrny7aw',
  authDomain: 'restaurant-subscription-prod.firebaseapp.com',
  databaseURL: 'https://restaurant-subscription-prod.firebaseio.com',
  projectId: 'restaurant-subscription-prod',
  storageBucket: 'restaurant-subscription-prod.appspot.com',
  messagingSenderId: '310783782226'
})
const stripeKey = 'sk_live_yrTYOTKOhvueVRcbpptBnK6o006MejiN9T'
const domain = 'https://app.truffle.fan/'

// Craft Beer
// admin.initializeApp({
//   apiKey: 'AIzaSyANGw-PRnJJoowvPlivdWXy0HnZsgYFvaA',
//   authDomain: 'craftbeer-truffle-fan.firebaseapp.com',
//   databaseURL: 'https://craftbeer-truffle-fan.firebaseio.com',
//   projectId: 'craftbeer-truffle-fan',
//   storageBucket: 'craftbeer-truffle-fan.appspot.com',
//   messagingSenderId: '1049738252061'
// })
// const stripeKey = 'sk_live_yrTYOTKOhvueVRcbpptBnK6o006MejiN9T'
// const domain = 'https://craftbeer.truffle.fan/'

// Dev
// admin.initializeApp({
//   apiKey: 'AIzaSyDrUcZQXk4uHJxWPf1gQDcAfLJh1vrblb8',
//   authDomain: 'restaurant-subscription-dev.firebaseapp.com',
//   databaseURL: 'https://restaurant-subscription-dev.firebaseio.com',
//   projectId: 'restaurant-subscription-dev',
//   storageBucket: 'restaurant-subscription-dev.appspot.com',
//   messagingSenderId: '413090111870'
// })
// const stripeKey = 'sk_test_A2S6ydNR0varCYRbrxOWpG37004yM20zfB'
// const domain = 'https://restaurant-subscription-dev.firebaseapp.com/'

const stripe = require('stripe')(stripeKey)

const db = admin.firestore()
db.settings({
  timestampsInSnapshots: true
})

// export { db, stripe }
module.exports = { db, stripe, domain }