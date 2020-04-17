
// const stripe = require('stripe')('sk_test_A2S6ydNR0varCYRbrxOWpG37004yM20zfB')
const stripe = require('stripe')('sk_live_yrTYOTKOhvueVRcbpptBnK6o006MejiN9T')

const RESTAURANT_SUBSCRIPTION = 'RESTAURANT_SUBSCRIPTION'
const FIVE_THOUSAND_YEN_PLAN = 'FIVE_THOUSAND_YEN_PLAN'
const TEN_THOUSAND_YEN_PLAN = 'TEN_THOUSAND_YEN_PLAN'
const TWENTY_THOUSAND_YEN_PLAN = 'TWENTY_THOUSAND_YEN_PLAN'

const products = [
  {
    id: RESTAURANT_SUBSCRIPTION,
    name: 'RestaurantSubscription',
    type: 'service',
    statement_descriptor: 'TRUFFLE_TECHNOLOGIES',
    unit_label: '件'
  }
]

const MONTH = 'month'

const membershipPlans = [
  {
    id: FIVE_THOUSAND_YEN_PLAN,
    interval: MONTH,
    product: RESTAURANT_SUBSCRIPTION,
    amount: 5000,
    usage_type: 'licensed'
  },
  {
    id: TEN_THOUSAND_YEN_PLAN,
    interval: MONTH,
    product: RESTAURANT_SUBSCRIPTION,
    amount: 10000,
    usage_type: 'licensed'
  },
  {
    id: TWENTY_THOUSAND_YEN_PLAN,
    interval: MONTH,
    product: RESTAURANT_SUBSCRIPTION,
    amount: 20000,
    usage_type: 'licensed'
  }
]

/**
 * Check if all plans exist on stripe already
 */
async function testForEntities() {
  const allLocalPlanIds = membershipPlans.map(p => p.id)
  const plan = await stripe.plans.list()
  const allStripePlanIds = !!plan && !!plan.data ? plan.data.map(p => p.id) : []
  return allLocalPlanIds.every(p => allStripePlanIds.includes(p))
}

async function setupStripe() {
  console.log('Generating products...')
  const productsP = products.map(product => {
    return stripe.products.create(product)
  })

  try {
    await Promise.all(productsP)
  } catch (err) {
    if (err.code !== 'resource_already_exists') {
      throw err
    }
  }

  console.log('Product generation complete!')

  console.log('Generating plans...')
  const plansP = membershipPlans.map(plan => {
    return stripe.plans.create({
      ...plan,
      currency: 'jpy'
    })
  })

  try {
    await Promise.all(plansP)
  } catch (err) {
    if (err.code !== 'resource_already_exists') {
      throw err
    }
  }

  console.log('Plan generation complete!')
}

async function setupStripeIfNecessary() {
  const isSetup = await testForEntities()
  if (!isSetup) {
    return setupStripe()
  } else {
    console.log('Stripe is already setup, skipping setup step.')
  }
}

setupStripeIfNecessary()
