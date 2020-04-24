<template lang="pug">
  Auth(@loggedIn="onLoggedIn" @loginFailed="onFailedAuthentication")
    Header(:content="headerContent")
    div.wrap-settings
      ModuleSettings
</template>

<style lang="scss" scoped>
.wrap-settings {
  width: 100%;
  min-height: 100vh;
  padding-top: 48px;
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
        leftAction: {
          icon: 'keyboard_arrow_left',
          color: '#1967d2',
          method: () => {
            this.$router.push("/home")
          }
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
    onLoggedIn () {
    
    },
    onHeaderRight () {

    }
  }
}
</script>
