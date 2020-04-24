<template lang="pug">
  Auth(@loggedIn="onLoggedIn" @loginFailed="onFailedAuthentication")
    Header(:content="headerContent")
    div.wrap-settings-profile.f.fh
      ModuleSettingsProfile(v-if="owner" :owner="owner")
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
import ModuleSettingsProfile from '@/components/module/ModuleSettingsProfile'

export default {
  components: {
    Auth,
    Header,
    ModuleSettingsProfile
  },
  data () {
    return {
      owner: null,
      headerContent: {
        label: 'プロフィール',
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
        },
        isFirst: false
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
      if (this.owner.bank.bankName === '') this.isFirst = true
      if (this.isFirst) this.headerContent.rightAction.label = '次へ'
    },
    async onHeaderRight () {
      this.headerContent.rightAction = {
        label: '保存',
        color: '#999',
        method: () => {}
      }

      if (this.owner.shopName === '' ||
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
          bank: this.owner.bank
          // shopPlanComments: this.owner.shopPlanComments
        })

      this.headerContent.rightAction = {
        label: '保存',
        color: '#1967d2',
        method: this.onHeaderRight
      }

      var path = (this.isFirst) ? '/settings/bank_info' : '/settings'
      this.$router.push(path)
    }
  }
}
</script>
