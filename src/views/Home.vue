<template lang="pug">
  Auth(@loggedIn="onLoggedIn" @loginFailed="onFailedAuthentication")
    Header(:content="headerContent")
    div.wrap-home
      ModuleHome(v-if="owner && owner.planType " :owner="owner")
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
import ModuleHome from '@/components/module/ModuleHome'

export default {
  components: {
    Auth,
    Header,
    ModuleHome
  },
  data () {
    return {
      owner: null,
      headerContent: {
        label: '',
        rightAction: {
          icon: 'settings',
          color: '#1967d2',
          method: this.onHeaderRight
        }
      }
    }
  },
  computed: {
    ...mapStateAuth(['uid', 'isAnonymous'])
  },
  methods: {
    onFailedAuthentication () {
      this.$router.push('/sign-in')
    },
    async onLoggedIn () {
      if (this.isAnonymous) this.$router.push('/sign-in')

      this.owner = await db.collection('OWNERS')
        .doc(this.uid).get().then(d => { return d.data() })
      
      if (this.owner && !this.owner.planType) {
        this.$router.push('/settings/plan_type')
        return
      }

      if (this.owner.bank.bankName === '' ||
          this.owner.bank.branchName === '' ||
          this.owner.bank.accountType === '' ||
          this.owner.bank.accountNumber === '' ||
          this.owner.bank.accountName === '' ||
          this.owner.shopName === '' ||
          this.owner.shopComment === '') {
        alert('お店の情報を入力しましょう。')
        this.$router.push('/settings/profile')
        return
      }

      this.headerContent.label = this.owner.shopName
    },
    onHeaderRight () {
      this.$router.push('/settings')
    }
  }
}
</script>
