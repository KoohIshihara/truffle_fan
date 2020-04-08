
const stripe = require('stripe')('sk_test_A2S6ydNR0varCYRbrxOWpG37004yM20zfB')
// const stripe = require('stripe')('sk_live_aNk3sFovFEiRjHgewJjpEYeA00gg1jwxmM')

const RESTAURANT_SUBSCRIPTION = 'RESTAURANT_SUBSCRIPTION'
const TEN_THOUSAND_YEN_PLAN = 'TEN_THOUSAND_YEN_PLAN'

const products = [
  {
    id: RESTAURANT_SUBSCRIPTION,
    name: 'RestaurantSubscription',
    type: 'service',
    statement_descriptor: 'APPSOCIALLY',
    unit_label: '件'
  }
]

const MONTH = 'month'

const membershipPlans = [
  {
    id: TEN_THOUSAND_YEN_PLAN,
    interval: MONTH,
    product: RESTAURANT_SUBSCRIPTION,
    amount: 10000,
    usage_type: 'metered'
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
