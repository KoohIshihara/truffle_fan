<template lang="pug">
  div.wrap-module-settings
    div.wrap-img.f.fh.py30
      ItemMediaUploader(
        :imgId="owner.uid"
        :existingImg="owner.shopIconPhoto"
        @updateShopIconPhoto="updateShopIconPhoto"
        ref="mediaUploader")
    div.wrap-profile.form-container.px12.py12.mb12
      v-text-field(label="お店の名前" placeholder="店舗名を入力" v-model="owner.shopName")
      v-textarea(label="コメント" placeholder="コメントを入力" v-model="owner.shopComment")
      v-text-field(label="口座番号" placeholder="口座番号を入力" v-model="owner.bankAccountNumber")
    //- div.wrap-account-info.form-container.px12.py8
      v-text-field(label="支店名" v-model="owner.bankAccountNumber")
      v-text-field(label="口座番号" v-model="owner.bankAccountNumber")

</template>

<style lang="scss" scoped>
.wrap-module-settings {
  width: 93%;
  max-width: 820px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 48px 0;
  .form-container {
    background: #fff;
    border-radius: 3px;
  }
}
</style>

<script>
import db from '@/components/utils/firebase'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateAuth, mapActions: mapActionsAuth } = createNamespacedHelpers('auth')
import ItemMediaUploader from '@/components/item/ItemMediaUploader'

export default {
  components: {
    ItemMediaUploader
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
  methods: {
    ...mapActionsAuth(['signOut']),
    onLoggedIn () {
      
    },
    onFailedAuthentication () {
      this.$router.push('/sign-in')
    },
    updateShopIconPhoto (url) {
      this.owner.shopIconPhoto = url
    }
  }
}
</script>
