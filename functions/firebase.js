const admin = require('firebase-admin')

// Prod
// admin.initializeApp({
//   apiKey: 'AIzaSyAQRp7aGpHULGvhktoE9N0Lbva6JlVF5Ow',
//   authDomain: 'daily-task-prod.firebaseapp.com',
//   databaseURL: 'https://daily-task-prod.firebaseio.com',
//   projectId: 'daily-task-prod',
//   storageBucket: 'daily-task-prod.appspot.com',
//   messagingSenderId: '377537491385'
// })

// Dev
admin.initializeApp({
  apiKey: 'AIzaSyDrUcZQXk4uHJxWPf1gQDcAfLJh1vrblb8',
  authDomain: 'restaurant-subscription-dev.firebaseapp.com',
  databaseURL: 'https://restaurant-subscription-dev.firebaseio.com',
  projectId: 'restaurant-subscription-dev',
  storageBucket: 'restaurant-subscription-dev.appspot.com',
  messagingSenderId: '413090111870'
})
var stripeKey = 'sk_test_A2S6ydNR0varCYRbrxOWpG37004yM20zfB'
var stripe = require('stripe')(stripeKey)

const db = admin.firestore()
db.settings({
  timestampsInSnapshots: true
})

// export { db, stripe }
module.exports = { db, stripe }