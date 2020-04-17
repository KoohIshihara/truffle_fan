<template lang="pug">
  div.wrap-module-settings
    div.wrap-img.f.fh.mb10
      div.wrap-icon-img
        ItemMediaUploader(
          :imgId="owner.uid"
          :existingImg="owner.shopIconPhoto"
          @updateIconPhoto="updateShopIconPhoto"
          ref="mediaUploader")
      div.wrap-header-img
        ItemHeaderImgUploader(
          :imgId="owner.uid"
          :existingImg="owner.shopHeaderPhoto"
          @updateHeaderPhoto="updateHeaderPhoto"
          ref="mediaUploader")
    div.wrap-profile.form-container.py12.mb12
      div.mb12
        v-text-field(label="お店の名前" placeholder="店舗名を入力" v-model="owner.shopName")
        v-textarea(label="コメント" placeholder="コメントを入力" v-model="owner.shopComment")
      div.wrap-reward-comments.mb12
        v-text-field(
          v-for="list in planList"
          :label="list.label"
          placeholder="リワードの詳細を入力"
          v-model="list.value")
      //- v-text-field(label="口座番号" placeholder="口座番号を入力" v-model="owner.bankAccountNumber")
      div.wrap-account-info
        v-text-field(label="銀行名" placeholder="銀行名を入力" v-model="owner.bank.bankName")
        v-text-field(label="支店名" placeholder="支店名を入力" v-model="owner.bank.branchName")
        //- v-text-field(label="口座種別" placeholder="口座種別を入力" v-model="owner.bank.accountType")
        span.info-label 口座種別
        v-radio-group(v-model="owner.bank.accountType")
          v-radio(label="普通" value="普通")
          v-radio(label="当座" value="当座")
        v-text-field(label="口座番号" placeholder="口座番号を入力" v-model="owner.bank.accountNumber")
        v-text-field(label="口座名義（カナ）" placeholder="口座名義を入力" v-model="owner.bank.accountName")
</template>

<style lang="scss" scoped>
.wrap-module-settings {
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
    // background: #fff;
    // border-radius: 3px;
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
import ItemMediaUploader from '@/components/item/ItemMediaUploader'
import ItemHeaderImgUploader from '@/components/item/ItemHeaderImgUploader'

export default {
  components: {
    ItemMediaUploader,
    ItemHeaderImgUploader
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
      planList: [],
      showModal: true
    }
  },
  watch: {
    planList: {
      handler: function (newList) {
        this.owner.shopPlanComments = this.planList.map(e => {
          var comment = {
            id: e.id,
            value: e.value
          }
          return comment
        })
      },
      deep: true
    }
  },
  created () {
    this.planList = this.owner.shopPlanComments.map(e => {
      var list = e
      switch (e.id) {
        case 'FIVE_THOUSAND_YEN_PLAN':
          list.label = '月額5,000円プラン'
          break
        case 'TEN_THOUSAND_YEN_PLAN':
          list.label = '月額10,000円プラン'
          break
        case 'TWENTY_THOUSAND_YEN_PLAN':
          list.label = '月額20,000円プラン'
          break
      }
      return list
    })
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
