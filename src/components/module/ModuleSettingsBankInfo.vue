<template lang="pug">
  div.wrap-module-settings-profile
    div.wrap-profile.form-container.py12.mb12
      div.wrap-account-info
        v-text-field(label="銀行名" placeholder="銀行名を入力" v-model="owner.bank.bankName")
        v-text-field(label="支店名" placeholder="支店名を入力" v-model="owner.bank.branchName")
        span.info-label 口座種別
        v-radio-group(v-model="owner.bank.accountType")
          v-radio(label="普通" value="普通")
          v-radio(label="当座" value="当座")
        v-text-field(label="口座番号" placeholder="口座番号を入力" v-model="owner.bank.accountNumber")
        v-text-field(label="口座名義（カナ）" placeholder="口座名義を入力" v-model="owner.bank.accountName")
</template>

<style lang="scss" scoped>
.wrap-module-settings-profile {
  width: 100%;
  min-height: 100vh;
  padding: 48px 0;
  background: #fff;
  .wrap-img {
    position: relative;
    height: 220px;
    .wrap-icon-img {
      position: relative;
      z-index: 100;
    }
    .wrap-header-img {
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .form-container {
    width: 93%;
    max-width: 820px;
    margin: 0 auto;
  }
  .wrap-account-info {
    .info-label {
      color: #999;
      font-size: 12px;
    }
  }
}
</style>

<style lang="scss" scoped>
.v-input--selection-controls {
  margin-top: 2px !important;
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
  computed: {
    ...mapStateAuth(['uid'])
  },
  data () {
    return {
      showModal: true
    }
  },
  created () {
    if (this.owner.bank.accountType === '') this.owner.bank.accountType = '普通'
  },
  methods: {
    ...mapActionsAuth(['signOut']),
    onLoggedIn () {
      
    },
    onFailedAuthentication () {
      this.$router.push('/sign-in')
    },
    updateShopIconPhoto (url) {
      this.owner.shopIconPhoto = url
    },
    updateHeaderPhoto (url) {
      this.owner.shopHeaderPhoto = url
    }
  }
}
</script>
