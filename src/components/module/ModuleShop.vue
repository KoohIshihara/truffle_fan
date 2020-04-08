<template lang="pug">
  div.wrap-module-shop
    div.wrap-profile-img.f.fc.mt30.mb28
      div.wrap-img
        img(:src="owner.shopIconPhoto")
    //- div.f.fc.mb16
      span.name {{owner.shopName}}
    div.wrap-comment.f.fc.mb28
      span.px12.py12 {{owner.shopComment}}
    div.wrap-button.f.fc.mb80
      span(@click="onSubscription").px12.py8 サブスクリプションする
    div.wrap-share.f.fc
      div(v-clipboard:copy="copyMessage"
        v-clipboard:success="onCopy").share-button.f.fm.px12.py8
        v-icon(color="#1967d2" size="18px").mr6 share
        span.line-clamp-1 友達に教える 

</template>

<style lang="scss" scoped>
.wrap-module-shop {
  position: relative;
  width: 93%;
  max-width: 820px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 48px 0;
  .wrap-profile-img {
    .wrap-img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .name {
    font-size: 14px;
  }
  .wrap-comment {
    span {
      position: relative;
      width: 80%;
      background: #fff;
      border-radius: 3px;
      white-space: pre-wrap;
      &:before {
        content: "";
        position: absolute;
        top: -30px;
        left: 50%;
        margin-left: -15px;
        border: 15px solid transparent;
        border-bottom: 15px solid #fff;
      }
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
    position: absolute;
    bottom: 36px;
    width: 100%;
    span {
      color: #1967d2;
    }
    // .share-button {
    //   background: #1967d2;
    //   border-radius: 3px;
    //   span {
    //     color: #fff;
    //     font-size: 12px;
    //   }
    // }
  }
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
      showModal: true
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
      // alert("StripeのBillingページに飛ばすよ（開発中）")
      this.$emit("openModalWindow", "registerCard")
    }
  }
}
</script>
