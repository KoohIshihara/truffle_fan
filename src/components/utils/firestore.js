import { firebase } from './firebase'
import 'firebase/firestore'

// Initialize Cloud Firestore through Firebase
const firestore = firebase.firestore()

// Disable deprecated features
firestore.settings({
  timestampsInSnapshots: true
})

export { firestore }
