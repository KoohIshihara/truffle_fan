<template lang="pug">
  div.wrap-module-register-card.px18.py24
    div.f.fc.mb16
      h4 {{planLabel}}
    div.wrap-email
      v-text-field(label="email"
        placeholder="メールアドレスを入力"
        v-model="email"
        :rules="emailRules"
        append-icon="mail")
    div.wrap-card-form
      form(action="/charge" method="post" id="payment-form")
        div(class="form-row")
          label(for="card-element") カード番号
          div(id="card-element")
          div(id="card-errors" role="alert")
        button お支払い
    div(v-if="isSaving").wrap-now-saving.f.fh
      v-progress-circular(color="primary" indeterminate)

</template>

<style lang="scss" scoped>
.wrap-module-register-card {
  position: relative;
  min-width: 280px;
  border-radius: 3px;
  background: #fff;
  .wrap-card-form {
    #card-element {
      padding: 12px 0 2px 0;
      margin-bottom: 14px;
      border-bottom: solid 1px #999;
    }
    button {
      font-size: 12px !important;
      background: #1967d2;
      color: #fff;
      border-radius: 3px;
      padding: 6px 12px;
    }
    // .CardField-input-wrapper {
    //   border-bottom: solid 1px #999;
    //   padding-bottom: 4px;
    // }
  }
  .wrap-now-saving {
    z-index: 1001;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #fff;
  }
}
</style>

<script>
import db, { stripeKey, api } from '@/components/utils/firebase'
const stripe = Stripe(stripeKey)
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateAuth, mapActions: mapActionsAuth } = createNamespacedHelpers('auth')

export default {
  components: {
  },
  computed: {
    ...mapStateAuth(['uid'])
  },
  data () {
    return {
      showModal: true,
      plan: 'FIVE_THOUSAND_YEN_PLAN',
      planLabel: '',
      email: '',
      emailRules: [ v => /.+@.+/.test(v) || 'Invalid Email address' ],
      card: null,
      isSaving: false
    }
  },
  created () {
    var moduleShop = this.$parent.$parent.$parent.$refs.module_shop
    var selectedPlan = moduleShop.selectedPlan
    switch (selectedPlan) {
      case 'FIVE_THOUSAND_YEN_PLAN':
        this.plan = 'FIVE_THOUSAND_YEN_PLAN'
        this.planLabel = '月額5,000円プラン'
        break
      case 'TEN_THOUSAND_YEN_PLAN':
        this.plan = 'TEN_THOUSAND_YEN_PLAN'
        this.planLabel = '月額10,000円プラン'
        break
      case 'TWENTY_THOUSAND_YEN_PLAN':
        this.plan = 'TWENTY_THOUSAND_YEN_PLAN'
        this.planLabel = '月額20,000円プラン'
        break
    }
  },
  mounted () {
    var elements = stripe.elements()
    var style = {
      base: {
        fontSize: '16px',
        color: "#32325d",
      }
    }

    this.card = elements.create('card', { style: style })

    this.card.mount('#card-element')

    this.card.addEventListener('change', this.cardValidate)

    var form = document.getElementById('payment-form')
    form.addEventListener('submit', this.formSubmit)
  },
  methods: {
    ...mapActionsAuth(['signOut', 'updateEmail']),
    cardValidate (event) {
      var displayError = document.getElementById('card-errors')
      if (event.error) {
        displayError.textContent = event.error.message
      } else {
        displayError.textContent = ''
      }
    },
    async formSubmit () {
      this.isSaving = true

      if (this.email === '') {
        alert('メールアドレスを入力してください。')
      }

      event.preventDefault()
      var token = await stripe.createToken(this.card).then(function (result) {
        if (result.error) {
          var errorElement = document.getElementById('card-errors')
          errorElement.textContent = result.error.message
          return 'error'
        } else {
          // トークンをサーバに送信
          // this.stripeTokenHandler(result.token)
          return result.token
        }
      })

      if (token === 'error') {
        alert('クレジットカードが認証できませんでした。')
        this.isSaving = false
      }

      console.log('params', {
        email: this.email,
        token: token.id,
        uid: this.uid,
        ownerId: this.$route.params.ownerId,
        plan: this.plan
      })

      var params = {
        email: this.email,
        token: token.id,
        uid: this.uid,
        ownerId: this.$route.params.ownerId,
        plan: this.plan
      }
      if (this.$route.params.inviterId) params.inviterId = this.$route.params.inviterId
      const response = await fetch(`${api}/createSubscription`, {
        method: 'POST',
        // mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(params)
      })
      await response.json()

      this.updateEmail(this.email)

      alert('登録が完了しました！')

      this.$emit('openModalWindow', 'editFanUser')

      this.isSaving = false
    }
  }
}
</script>
