<template lang="pug">
.wrap-module-shop
  .wrap-profile-img.f.fh.mb20
    .wrap-icon-img
      img(:src="owner.shopIconPhoto")
    .wrap-header-img
      img(:src="owner.shopHeaderPhoto")
  .wrap-shop-content
    .wrap-title.f.fc.mb8
      span {{ owner.shopName }}
    .wrap-comment.f.fc.mb14
      span {{ owner.shopComment }}
    .wrap-plan.f.fc
      div.mb12(v-if="owner.planType === 'unit'")
        v-radio-group(v-model="selectedPlan")
          div.mb6(v-for="(price, index) in prices")
            v-radio(
              :key="price.plan",
              :label="price.label",
              :value="price.plan"
            )
            .plan-detail.mb2
              span.plan-detail.pl32 {{ price.detail }}
      div.mb20(v-if="owner.planType === 'fanClub'")
        v-radio-group(v-model="selectedPlan")
          div.mb6(v-for="item in owner.fanClubList")
            v-radio.mb8(
              :key="item.plan",
              :label="getPriceLabel(item.plan) + '(税抜き) ' + item.detail",
              :value="item.plan"
            )
        //- div.f.fc.mb8
          span.bold {{`${priceLabel}`}}
        //- span {{`${owner.fanClubDetail.content}`}}
    .wrap-button.f.fc.mb30
      span.px12.py8(@click="onSubscription") サブスクする
    .wrap-share.f.fc
      div.share-button.f.fm.px12.py8(v-clipboard:copy="copyMessage", v-clipboard:success="onCopy")
        v-icon.mr6(color="#1967d2", size="18px") share
        span.line-clamp-1 友達に教える
</template>

<style lang="scss" scoped>
.wrap-module-shop {
  position: relative;
  min-height: 100vh;
  padding: 48px 0;
  background: #fff;
  .wrap-profile-img {
    position: relative;
    width: 100%;
    height: 220px;
    .wrap-icon-img {
      position: relative;
      z-index: 100;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      overflow: hidden;
      background: #fff;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .wrap-header-img {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .wrap-shop-content {
    width: 93%;
    max-width: 820px;
    margin: 0 auto;
    .wrap-title {
      width: 80%;
      margin: 0 auto;
      span {
        font-size: 16px;
        font-weight: bold;
        // text-align: center;
      }
    }
    .wrap-comment {
      span {
        position: relative;
        width: 80%;
        background: #fff;
        border-radius: 3px;
        white-space: pre-wrap;
        // &:before {
        //   content: "";
        //   position: absolute;
        //   top: -30px;
        //   left: 50%;
        //   margin-left: -15px;
        //   border: 15px solid transparent;
        //   border-bottom: 15px solid #fff;
        // }
      }
    }
    .wrap-plan {
      width: 80%;
      margin: 0 auto;
      .plan-detail {
        font-size: 14px;
        color: #999;
      }
    }
    .wrap-price-list {
      width: 80%;
      margin: 0 auto;
      .plan-detail {
        font-size: 14px;
        color: #999;
      }
    }
    .wrap-button {
      span {
        color: #fff;
        background: #1967d2;
        border-radius: 3px;
      }
    }
    .wrap-share {
      // position: absolute;
      // bottom: 36px;
      width: 100%;
      span {
        color: #1967d2;
      }
    }
  }
}
</style>

<style lang="scss">
.v-input--selection-controls:not(.v-input--hide-details) .v-input__slot {
  margin-bottom: 0 !important;
}
.v-input--radio-group--column .v-radio:not(:last-child):not(:only-child) {
  margin-bottom: 0 !important;
}
</style>

<script>
import db from '@/components/utils/firebase'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateAuth, mapActions: mapActionsAuth } = createNamespacedHelpers('auth')

export default {
  components: {
  },
  data () {
    return {
      showModal: true,
      selectedPlan: 'FIVE_THOUSAND_YEN_PLAN',
      priceLabel: '',
      prices: [
        {
          label: '月額5,000円(税抜)',
          plan: 'FIVE_THOUSAND_YEN_PLAN',
          detail: '1,000円割引券を6枚分(1,000円お得)'
        },
        {
          label: '月額10,000円(税抜)',
          plan: 'TEN_THOUSAND_YEN_PLAN',
          detail: '1,000円割引券を12枚分(2,000円お得)'
        },
        {
          label: '月額15,000円(税抜)',
          plan: 'FIF_TEEN_THOUSAND_YEN_PLAN',
          detail: '1,000円割引券を18枚分(3,000円お得)'
        },
        {
          label: '月額20,000円(税抜)',
          plan: 'TWENTY_THOUSAND_YEN_PLAN',
          detail: '1,000円割引券を24枚分(4,000円お得)'
        }
      ]
    }
  },
  props: {
    owner: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapStateAuth(['uid']),
    copyMessage: function () {
      return `${location.origin}/${this.owner.uid}/${this.uid}`
    }
  },
  created () {
    if (this.owner.planType === 'fanClub') {
      // this.selectedPlan = this.owner.fanClubDetail.plan
      // switch (this.owner.fanClubDetail.plan) {
      //   case 'FIVE_THOUSAND_YEN_PLAN':
      //     this.priceLabel = '月額5,000円(税抜)'
      //     break
      //   case 'TEN_THOUSAND_YEN_PLAN':
      //     this.priceLabel = '月額10,000円(税抜)'
      //     break
      //   case 'TWENTY_THOUSAND_YEN_PLAN':
      //     this.priceLabel = '月額20,000円(税抜)'
      //     break
      // }
      this.selectedPlan = this.owner.fanClubList[0].plan
    }
  },
  methods: {
    ...mapActionsAuth(['signOut']),
    onCopy () {
      alert(`招待リンクがコピーされました。`)
    },
    onSubscription () {
      this.$emit("openModalWindow", "registerCard")
      // this.$emit("openModalWindow", "editFanUser")
    },
    getPriceLabel (plan) {
      switch (plan) {
        case 'FIVE_THOUSAND_YEN_PLAN':
          var price = '5,000円'
          break
        case 'TEN_THOUSAND_YEN_PLAN':
          var price = '10,000円'
          break
        case 'FIF_TEEN_THOUSAND_YEN_PLAN':
          var price = '15,000円'
          break
        case 'TWENTY_THOUSAND_YEN_PLAN':
          var price = '20,000円'
          break
      }
      return price
    }
  }
}
</script>
