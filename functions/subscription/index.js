const firebase = require("../firebase.js")
const db = firebase.db
const stripe = firebase.stripe

var createSubscribe = async (email, token, uid, ownerId) => {
  var params = {
    email: email,
    source: token,
    metadata: {
      uid: uid,
      ownerId: ownerId
    }
  }
  console.log('start createSubscribe', JSON.stringify(params))
  var customer = await stripe.customers.create(params)
  console.log('customer:', customer.id)
  var subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [ { plan: "TEN_THOUSAND_YEN_PLAN" } ]
  })
  console.log(`subscription complete: ${email}`)
  return subscription
}

// createSubscribe()

module.exports = createSubscribe