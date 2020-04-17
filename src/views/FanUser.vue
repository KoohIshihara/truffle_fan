<template lang="pug">
  Auth(@loggedIn="onLoggedIn" @loginFailed="onFailedAuthentication")
    Header(:content="headerContent")
    ModalWindow(
      @openModalWindow="openModalWindow"
      @closeModal="closeModalWindow"
      :modalContentId="modalWindowContentId"
      :showModal="showModalWindow")
    div.wrap-fan-user
      ModuleFanUser(v-if="user && owner" :user="user" :owner="owner")
</template>

<style lang="scss" scoped>
.wrap-fan-user {
  width: 100%;
  min-height: 100vh;
}
</style>

<script>
import db, { api } from '@/components/utils/firebase'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateAuth, mapActions: mapActionsAuth } = createNamespacedHelpers('auth')
import Auth from '@/components/auth'
import Header from '@/components/shared/Header.vue'
import ModuleFanUser from '@/components/module/ModuleFanUser'
import ModalWindow from '@/components/shared/ModalWindow'

export default {
  components: {
    Auth,
    Header,
    ModuleFanUser,
    ModalWindow
  },
  data () {
    return {
      owner: null,
      user: null,
      headerContent: {
        label: ''
      },
      showModalWindow: false,
      modalWindowContentId: ''
    }
  },
  computed: {
    ...mapStateAuth(['uid'])
  },
  async created () {
    this.owner = await db.collection('OWNERS')
      .doc(this.$route.params.ownerId)
      .get()
      .then(d => {
        return d.data()
      })
    this.user = await db.collection('FAN_USERS')
      .doc(this.$route.params.fanUserId)
      .get()
      .then(d => {
        return d.data()
      })

    this.headerContent.label = this.user.name

    if (this.$route.name === 'verify_email' && this.user) {
      await fetch(`${api}/verifyEmail`, {
        method: 'POST',
        // mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          uid: this.user.uid
        })
      })
      this.openModalWindow('completeVerification')
      this.$router.push(`/fan_users/${this.owner.uid}/${this.user.uid}`)
    }
  },
  methods: {
    onFailedAuthentication () {
      this.$router.push('/sign-in')
    },
    onLoggedIn () {
    
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
