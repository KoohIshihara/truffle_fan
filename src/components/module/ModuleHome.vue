<template lang="pug">
  div.wrap-module-home
    div.wrap-profile-img.f.fc.mt30.mb26
      div.wrap-img
        img(:src="owner.shopIconPhoto")
    div.wrap-share.f.fc.mb20
      div(v-clipboard:copy="copyMessage"
        v-clipboard:success="onCopy").share-button.f.fm.px12.py8
        v-icon(color="#fff" size="18px").mr6 share
        span.line-clamp-1 シェア
    div.wrap-profile-texts.px12.py20
      div.wrap-text-item.mb12
        span.label.mb4 お店の名前:
        span {{owner.shopName}}
      div.wrap-text-item.mb12
        span.label.mb4 コメント:
        span {{owner.shopComment}}
      div.wrap-text-item
        span.label.mb4 口座番号:
        span {{owner.bankAccountNumber}}
    div.wrap-sign-out.f.fc
      span(@click="logout") ログアウト
</template>

<style lang="scss" scoped>
.wrap-module-home {
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
        label: "home",
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
