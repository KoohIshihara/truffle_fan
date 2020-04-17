<template lang="pug">
  Auth(@loggedIn="onLoggedIn" @loginFailed="onFailedAuthentication")
    Header(:content="headerContent")
    div.wrap-home.f.fh
      ModuleSettings(v-if="owner" :owner="owner")
      v-progress-circular(v-else color="primary" indeterminate)

</template>

<style lang="scss" scoped>
.wrap-home {
  width: 100%;
  min-height: 100vh;
}
</style>

<script>
import db from '@/components/utils/firebase'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateAuth, mapActions: mapActionsAuth } = createNamespacedHelpers('auth')
import Auth from '@/components/auth'
import Header from '@/components/shared/Header.vue'
import ModuleSettings from '@/components/module/ModuleSettings'

export default {
  components: {
    Auth,
    Header,
    ModuleSettings
  },
  data () {
    return {
      owner: null,
      headerContent: {
        label: '設定',
        rightAction: {
          label: '保存',
          color: '#1967d2',
          method: this.onHeaderRight
        }
      }
    }
  },
  computed: {
    ...mapStateAuth(['uid'])
  },
  methods: {
    onFailedAuthentication () {
      this.$router.push('/sign-in')
    },
    async onLoggedIn () {
      this.owner = await db.collection('OWNERS')
        .doc(this.uid)
        .get()
        .then(d => { return d.data() })
    },
    async onHeaderRight () {
      this.headerContent.rightAction = {
        label: '保存',
        color: '#999',
        method: () => {}
      }

      if (this.owner.bank.bankName === '' ||
          this.owner.bank.branchName === '' ||
          this.owner.bank.accountType === '' ||
          this.owner.bank.accountNumber === '' ||
          this.owner.bank.accountName === '' ||
          this.owner.shopName === '' ||
          this.owner.shopComment === '') {
        alert("必要項目を入力してください。")
        this.headerContent.rightAction = {
          label: '保存',
          color: '#1967d2',
          method: this.onHeaderRight
        }
        return true
      }

      await db.collection("OWNERS")
        .doc(this.uid)
        .update({
          shopIconPhoto: this.owner.shopIconPhoto,
          shopHeaderPhoto: this.owner.shopHeaderPhoto,
          shopName: this.owner.shopName,
          shopComment: this.owner.shopComment,
          bank: this.owner.bank,
          shopPlanComments: this.owner.shopPlanComments
        })

      this.headerContent.rightAction = {
        label: '保存',
        color: '#1967d2',
        method: this.onHeaderRight
      }

      alert("保存されました。")
      this.$router.push("/home")
    }
  }
}
</script>
