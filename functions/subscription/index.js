const firebase = require("../firebase.js")
const db = firebase.db
const stripe = firebase.stripe

// const FIVE_THOUSAND_YEN_PLAN = 'FIVE_THOUSAND_YEN_PLAN'
// const TEN_THOUSAND_YEN_PLAN = 'TEN_THOUSAND_YEN_PLAN'
// const TWENTY_THOUSAND_YEN_PLAN = 'TWENTY_THOUSAND_YEN_PLAN'

var createSubscribe = async (email, token, uid, ownerId, plan) => {
  var params = {
    email: email,
    source: token,
    metadata: {
      uid: uid,
      ownerId: ownerId
    }
  }
  if (!plan) return false
  console.log('start createSubscribe', JSON.stringify(params))
  console.log('plan:', plan)
  var customer = await stripe.customers.create(params)
  console.log('customer:', customer.id)
  var subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ plan: plan, quantity: 1 }]
  })
  console.log(`subscription complete: ${email}`)
  return subscription
}

createSubscribe()

module.exports = createSubscribe