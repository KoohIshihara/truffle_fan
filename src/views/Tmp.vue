<template lang="pug">
  Auth(@loggedIn="onLoggedIn" @loginFailed="onFailedAuthentication")
    Header(:content="headerContent")
    div.wrap-shop
      ModuleTmp

</template>

<style lang="scss" scoped>
.wrap-shop {
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
import ModuleTmp from '@/components/module/ModuleTmp'

export default {
  components: {
    Auth,
    Header,
    ModuleTmp
  },
  data () {
    return {
      owner: null,
      headerContent: {
        label: 'Tmp',
        rightAction: {
          icon: 'add',
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
    onLoggedIn () {
    
    },
    onHeaderRight () {

    }
  }
}
</script>
