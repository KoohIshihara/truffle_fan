import firebase from 'firebase/app'

import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'

// var config = {
//   apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
//   authDomain: process.env.VUE_APP_FIREBASE_AUTHDOMAIN,
//   databaseURL: process.env.VUE_APP_FIREBASE_DATABASEURL,
//   projectId: process.env.VUE_APP_FIREBASE_PROJECTID,
//   storageBucket: process.env.VUE_APP_FIREBASE_STORAGEBUCKET,
//   messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGINGSENDERID
// }

// Prod
// const config = {
//   apiKey: 'AIzaSyBHmMs1jbWcDNCy4BByX37azJBEFrny7aw',
//   authDomain: 'restaurant-subscription-prod.firebaseapp.com',
//   databaseURL: 'https://restaurant-subscription-prod.firebaseio.com',
//   projectId: 'restaurant-subscription-prod',
//   storageBucket: 'restaurant-subscription-prod.appspot.com',
//   messagingSenderId: '310783782226'
// }
// const stripeKey = 'pk_live_ap7LjEiAjKrgZrUgZef2GfM600eq6xrzbi'
// const api = 'https://us-central1-restaurant-subscription-prod.cloudfunctions.net'

// Craft Beer
// const config = {
//   apiKey: 'AIzaSyANGw-PRnJJoowvPlivdWXy0HnZsgYFvaA',
//   authDomain: 'craftbeer-truffle-fan.firebaseapp.com',
//   databaseURL: 'https://craftbeer-truffle-fan.firebaseio.com',
//   projectId: 'craftbeer-truffle-fan',
//   storageBucket: 'craftbeer-truffle-fan.appspot.com',
//   messagingSenderId: '1049738252061'
// }
// const stripeKey = 'pk_live_ap7LjEiAjKrgZrUgZef2GfM600eq6xrzbi'
// const api = 'https://us-central1-craftbeer-truffle-fan.cloudfunctions.net'

// Dev
const config = {
  apiKey: 'AIzaSyDrUcZQXk4uHJxWPf1gQDcAfLJh1vrblb8',
  authDomain: 'restaurant-subscription-dev.firebaseapp.com',
  databaseURL: 'https://restaurant-subscription-dev.firebaseio.com',
  projectId: 'restaurant-subscription-dev',
  storageBucket: 'restaurant-subscription-dev.appspot.com',
  messagingSenderId: '413090111870'
}
const stripeKey = 'pk_test_1psNbfMG1VXdfb8XlP3a7Zdb00vquL8lhg'
const api = 'https://us-central1-restaurant-subscription-dev.cloudfunctions.net'
// const api = 'http://localhost:5000/restaurant-subscription-dev/us-central1'

const firebaseApp = firebase.initializeApp(config)

const strage = firebaseApp.storage()
const auth = firebaseApp.auth()
const firestore = firebaseApp.firestore()

export default firebaseApp.firestore()
// export {strage}
export { firestore, firebase, strage, auth, api, stripeKey }
