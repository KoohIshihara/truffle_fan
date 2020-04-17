<template lang="pug">
  div.wrap-module-shop
    div.wrap-profile-img.f.fh.mb20
      div.wrap-icon-img
        img(:src="owner.shopIconPhoto")
      div.wrap-header-img
        img(:src="owner.shopHeaderPhoto")
    div.wrap-shop-content
      div.wrap-title.f.fc.mb8
        span {{owner.shopName}}
      div.wrap-comment.f.fc.mb4
        span {{owner.shopComment}}
      div.wrap-price-list
        v-radio-group(v-model="selectedPlan")
          div(v-for="(price, index) in prices").mb6
            v-radio(
              :key="price.plan"
              :label="price.label"
              :value="price.plan")
            div
              span.plan-detail {{owner.shopPlanComments[index].value}}
      div.wrap-button.f.fc.mb30
        span(@click="onSubscription").px12.py8 サブスクする
      div.wrap-share.f.fc
        div(v-clipboard:copy="copyMessage"
          v-clipboard:success="onCopy").share-button.f.fm.px12.py8
          v-icon(color="#1967d2" size="18px").mr6 share
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
      span {
        width: 80%;
        font-size: 16px;
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
      prices: [
        {
          label: '月額5,000円',
          plan: 'FIVE_THOUSAND_YEN_PLAN'
        },
        {
          label: '月額10,000円',
          plan: 'TEN_THOUSAND_YEN_PLAN'
        },
        {
          label: '月額20,000円',
          plan: 'TWENTY_THOUSAND_YEN_PLAN'
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
  methods: {
    ...mapActionsAuth(['signOut']),
    onCopy () {
      alert(`招待リンクがコピーされました。`)
    },
    onSubscription () {
      this.$emit("openModalWindow", "registerCard")
      // this.$emit("openModalWindow", "editFanUser")
    }
  }
}
</script>
