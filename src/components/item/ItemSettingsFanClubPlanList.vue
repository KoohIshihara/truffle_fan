<template lang="pug">
  div.wrap-settings-fan-club-plan-list.f.mb8
    div.wrap-remove.pt8
      v-icon(@click='removeMenu' color='#999') close
    div
      v-select(:items='prices' v-model='price').mb8
      v-text-field(placeholder='特典の説明を入力' v-model='content.detail')

</template>

<style lang="scss" scoped>
.wrap-settings-fan-club-plan-list {
  .wrap-remove {
    width: 32px;
  }
}
</style>

<style lang="scss">
.wrap-settings-fan-club-plan-list {
  .v-input__slot {
    margin-bottom: 0 !important;
  }
}
</style>

<script>
import db from '@/components/utils/firebase'

import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateAuth } = createNamespacedHelpers('auth')

export default {
  components: {
  },
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  watch: {
    content: function () {
      this.updatePriceLabel()
    },
    price: function (price) {
      switch (price) {
        case '5,000円':
          this.content.plan = 'FIVE_THOUSAND_YEN_PLAN'
          // this.currentPriceStr = 'FIVE_THOUSAND_YEN_PLAN'
          break
        case '10,000円':
          this.content.plan = 'TEN_THOUSAND_YEN_PLAN'
          // this.currentPriceStr = 'TEN_THOUSAND_YEN_PLAN'
          break
        case '15,000円':
          this.content.plan = 'FIF_TEEN_THOUSAND_YEN_PLAN'
          // this.currentPriceStr = 'FIF_TEEN_THOUSAND_YEN_PLAN'
          break
        case '20,000円':
          this.content.plan = 'TWENTY_THOUSAND_YEN_PLAN'
          // this.currentPriceStr = 'TWENTY_THOUSAND_YEN_PLAN'
          break
      }
    },
    fanClubDetail: function (fanClubDetail) {
      this.content.detail = fanClubDetail
    }
  },
  data () {
    return {
      price: '5,000円',
      prices: [
        '5,000円',
        '10,000円',
        '15,000円',
        '20,000円'
      ],
      // currentPriceStr: 'FIVE_THOUSAND_YEN_PLAN',
      fanClubDetail: ''
    }
  },
  computed: {
    ...mapStateAuth(['uid'])
  },
  async created () {
    this.updatePriceLabel()
    // switch (this.content.plan) {
    //   case 'FIVE_THOUSAND_YEN_PLAN':
    //     this.price = this.prices[0]
    //     break
    //   case 'TEN_THOUSAND_YEN_PLAN':
    //     this.price = this.prices[1]
    //     break
    //   case 'FIF_TEEN_THOUSAND_YEN_PLAN':
    //     this.price = this.prices[2]
    //     break
    //   case 'TWENTY_THOUSAND_YEN_PLAN':
    //     this.price = this.prices[3]
    //     break
    // }
  },
  methods: {
    removeMenu () {
      this.$emit('removeMenu', this.content)
    },
    updatePriceLabel () {
      switch (this.content.plan) {
        case 'FIVE_THOUSAND_YEN_PLAN':
          this.price = this.prices[0]
          break
        case 'TEN_THOUSAND_YEN_PLAN':
          this.price = this.prices[1]
          break
        case 'FIF_TEEN_THOUSAND_YEN_PLAN':
          this.price = this.prices[2]
          break
        case 'TWENTY_THOUSAND_YEN_PLAN':
          this.price = this.prices[3]
          break
      }
    }
  }
}
</script>
