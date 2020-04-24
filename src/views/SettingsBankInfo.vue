<template lang="pug">
  Auth(@loggedIn="onLoggedIn" @loginFailed="onFailedAuthentication")
    Header(:content="headerContent")
    div.wrap-settings-profile.f.fh
      ModuleSettingsBankInfo(v-if="owner" :owner="owner")
      v-progress-circular(v-else color="primary" indeterminate)
</template>

<style lang="scss" scoped>
.wrap-settings-profile {
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
import ModuleSettingsBankInfo from '@/components/module/ModuleSettingsBankInfo'

export default {
  components: {
    Auth,
    Header,
    ModuleSettingsBankInfo
  },
  data () {
    return {
      owner: null,
      headerContent: {
        label: '口座情報',
        leftAction: {
          icon: 'keyboard_arrow_left',
          color: '#1967d2',
          method: () => {
            this.$router.go(-1)
          }
        },
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
          this.owner.bank.accountName === '') {
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
          bank: this.owner.bank
        })

      this.headerContent.rightAction = {
        label: '保存',
        color: '#1967d2',
        method: this.onHeaderRight
      }

      this.$router.push("/home")
    }
  }
}
</script>
