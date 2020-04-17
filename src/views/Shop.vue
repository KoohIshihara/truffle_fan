<template lang="pug">
  Auth(@loggedIn="onLoggedIn" @loginFailed="onFailedAuthentication")
    Header(:content="headerContent")
    ModalWindow(
      @openModalWindow="openModalWindow"
      @closeModal="closeModalWindow"
      :modalContentId="modalWindowContentId"
      :showModal="showModalWindow")
    div.wrap-shop
      ModuleShop(v-if="owner" :owner="owner"
        @openModalWindow="openModalWindow"
        @closeModalWindow="closeModalWindow"
        ref="module_shop")
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
import ModuleShop from '@/components/module/ModuleShop'
import ModalWindow from '@/components/shared/ModalWindow'

export default {
  components: {
    Auth,
    Header,
    ModuleShop,
    ModalWindow
  },
  data () {
    return {
      owner: null,
      headerContent: {
        label: 'Truffle.fan'
      },
      modalWindowContentId: '',
      showModalWindow: false
    }
  },
  computed: {
    ...mapStateAuth(['uid'])
  },
  methods: {
    ...mapActionsAuth([
      'signInAnonymously'
    ]),
    async onFailedAuthentication () {
      // this.$router.push('/sign-in')
      await this.signInAnonymously()
    },
    onHeaderRight () {

    },
    async onLoggedIn () {
      this.owner = await db.collection('OWNERS')
        .doc(this.$route.params.ownerId).get().then(d => { return d.data() })
      // this.headerContent.label = this.owner.shopName
    },
    openModalWindow (id) {
      this.modalWindowContentId = id
      this.showModalWindow = true
    },
    closeModalWindow () {
      this.showModalWindow = false
    }
  }
}
</script>
