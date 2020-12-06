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
import format from 'date-fns/format'
import isBefore from 'date-fns/isBefore'
import addHours from 'date-fns/addHours'

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

    // updatedAtは/fan_users/:ownerId/:fanUserId/:resetProfileIdを踏んだ時に更新される
    // もしくは/reset_profile/:resetProfileIdを踏んだ時に更新される
    var letEdit = isBefore(new Date(), addHours(this.user.createdAt.toDate(), 3))
                  || (this.user.updatedAt && isBefore(new Date(), addHours(this.user.updatedAt.toDate(), 3)))
    if (!this.user.name || !this.user.iconPhoto) {
      if (letEdit) {
        this.openModalWindow('editFanUser')
      } else {
        this.openModalWindow('pleaseContact')
      }
    }

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
    ...mapActionsAuth([
      'signInAnonymously',
      'signOut'
    ]),
    async onFailedAuthentication () {
      await this.signInAnonymously()
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
