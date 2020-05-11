
// const stripe = require('stripe')('sk_test_A2S6ydNR0varCYRbrxOWpG37004yM20zfB')
const stripe = require('stripe')('sk_live_yrTYOTKOhvueVRcbpptBnK6o006MejiN9T')

const RESTAURANT_SUBSCRIPTION = 'RESTAURANT_SUBSCRIPTION'
const FIVE_THOUSAND_YEN_PLAN = 'FIVE_THOUSAND_YEN_PLAN'
const TEN_THOUSAND_YEN_PLAN = 'TEN_THOUSAND_YEN_PLAN'
const FIF_TEEN_THOUSAND_YEN_PLAN = 'FIF_TEEN_THOUSAND_YEN_PLAN'
const TWENTY_THOUSAND_YEN_PLAN = 'TWENTY_THOUSAND_YEN_PLAN'

// const products = [
//   {
//     id: RESTAURANT_SUBSCRIPTION,
//     name: 'RestaurantSubscription',
//     type: 'service',
//     statement_descriptor: 'APPSOCIALLY',
//     unit_label: '件'
//   }
// ]

const MONTH = 'month'

const membershipPlans = [
  // {
  //   id: FIVE_THOUSAND_YEN_PLAN,
  //   interval: MONTH,
  //   product: RESTAURANT_SUBSCRIPTION,
  //   amount: 5500,
  //   usage_type: 'licensed'
  // },
  // {
  //   id: TEN_THOUSAND_YEN_PLAN,
  //   interval: MONTH,
  //   product: RESTAURANT_SUBSCRIPTION,
  //   amount: 11000,
  //   usage_type: 'licensed'
  // },
  {
    id: FIF_TEEN_THOUSAND_YEN_PLAN,
    interval: MONTH,
    product: RESTAURANT_SUBSCRIPTION,
    amount: 16500,
    usage_type: 'licensed'
  },
  // {
  //   id: TWENTY_THOUSAND_YEN_PLAN,
  //   interval: MONTH,
  //   product: RESTAURANT_SUBSCRIPTION,
  //   amount: 22000,
  //   usage_type: 'licensed'
  // }
]

async function addStripe() {
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

addStripe()