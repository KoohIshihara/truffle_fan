<template lang="pug">
  div.wrap-module-home
    div.wrap-profile-img.f.fh.mb20
      div.wrap-icon-img
        img(:src="owner.shopIconPhoto")
      div.wrap-header-img
        img(:src="owner.shopHeaderPhoto")
    div.wrap-share.f.fc.py14
      div(v-clipboard:copy="copyMessage"
        v-clipboard:success="onCopy").share-button.f.fm.px12.py8
        v-icon(color="#fff" size="18px").mr6 share
        span.line-clamp-1 シェア
    div.wrap-profile-texts.px12.py20.mb20
      div.wrap-text-item.mb12
        span.label.mb4 お店の名前:
        span {{owner.shopName}}
      div.wrap-text-item.mb12
        span.label.mb4 コメント:
        span {{owner.shopComment}}
      div(v-if="owner.shopPlanComments[0].value").wrap-text-item.mb12
        span.label.mb4 月額5,000円プラン:
        span {{owner.shopPlanComments[0].value + ' '}}
      div(v-if="owner.shopPlanComments[1].value").wrap-text-item.mb12
        span.label.mb4 月額10,000円プラン:
        span {{owner.shopPlanComments[1].value + ' '}}
      div(v-if="owner.shopPlanComments[2].value").wrap-text-item.mb12
        span.label.mb4 月額20,000円プラン:
        span {{owner.shopPlanComments[2].value + ' '}}
      div.wrap-text-item.mb12
        span.label.mb4 銀行名:
        span {{owner.bank.bankName}}
      div.wrap-text-item.mb12
        span.label.mb4 支店名:
        span {{owner.bank.branchName}}
      div.wrap-text-item.mb12
        span.label.mb4 口座種別:
        span {{owner.bank.accountType}}
      div.wrap-text-item.mb12
        span.label.mb4 口座番号:
        span {{owner.bank.accountNumber}}
      div.wrap-text-item.mb12
        span.label.mb4 口座名義（カナ）:
        span {{owner.bank.accountName}}
    
    div.wrap-sign-out.f.fc
      span(@click="logout") ログアウト
</template>

<style lang="scss" scoped>
.wrap-module-home {
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
  .wrap-title {
  }
  .wrap-share {
    .share-button {
      background: #1967d2;
      border-radius: 3px;
      span {
        color: #fff;
        font-size: 12px;
      }
    }
  }
  .wrap-profile-texts {
    background: #fff;
    border-radius: 3px;
    width: 93%;
    max-width: 820px;
    margin: 0 auto;
    span {
      display: block;
    }
    .wrap-text-item {
      border-bottom: solid #999 1px;
      .label {
        font-size: 10px;
      }
    }
  }
  .wrap-sign-out {
    position: absolute;
    width: 100%;
    bottom: 36px;
    span {
      font-size: 12px;
      display: block;
      color: #d63200;
    }
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
  props: {
    owner: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showModal: true,
      headerContent: {
        label: "ホーム",
        rightAction: {
          icon: "add",
          color: "#1967d2",
          method: this.onHeaderRight
        }
      }
    }
  },
  computed: {
    ...mapStateAuth(['uid']),
    copyMessage: function () {
      return `${location.origin}/${this.owner.uid}`
    }
  },
  methods: {
    ...mapActionsAuth(['signOut']),
    logout () {
      this.signOut()
      setTimeout(() => {
        this.$router.push('/sign-in')
      }, 400)
    },
    onLoggedIn () {
      
    },
    onFailedAuthentication () {
      this.$router.push('/sign-in')
    },
    onCopy () {
      alert(`リンクがコピーされました。${this.copyMessage}`)
    }
  }
}
</script>
