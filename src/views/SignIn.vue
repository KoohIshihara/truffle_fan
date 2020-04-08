<template lang="pug">
  Auth(@loggedIn="onLoggedIn" @loginFailed="onFailedAuthentication")
    div.wrap-sign-ui.f.fh
      div.sign-ui
        div.f.fc.mb14
          span.welcome Welcome to Restaurant Subscription
        SignIn
</template>

<style lang="scss" scoped>
.wrap-sign-ui {
  width: 100%;
  height: 100vh;
  .sign-ui {
    width: 90%;
    .welcome {
      font-weight: bold;
    }
  }
}
</style>

<script>
import db, { firebase } from '@/components/utils/firebase'

import { createNamespacedHelpers } from 'vuex'

import Auth from '@/components/auth'
import SignIn from '@/components/sign-in/firebase-sign-in-ui'
const { mapState: mapStateAuth } = createNamespacedHelpers('auth')

export default {
  components: {
    Auth,
    SignIn
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapStateAuth(['isLoggedIn', 'uid', 'isAnonymous'])
  },
  created () {
    // if (this.id === '' && this.home !== 'home') this.resultRedirect = `/${this.redirect}`
    // if (this.id !== '' && this.home !== 'home') this.resultRedirect = `/${this.redirect}/${this.id}`
  },
  mounted () {
    setTimeout(() => {
      if (location.pathname.split('/')[1] === 'sign-up') {
        document.getElementsByClassName('firebaseui-title')[0].innerText = 'Sign Up with Email'
      }
    }, 100)
  },
  methods: {
    onFailedAuthentication () {
      console.log("not authed")
    },
    async onLoggedIn () {
      if (this.uid && !this.isAnonymous) {
        var userDoc = await db.collection('users').doc(this.uid).get()

        if (!userDoc.exists) {
          var user = await firebase.auth().currentUser

          var ownerObj = {
            uid: user.uid,
            lastSignInTime: user.metadata.lastSignInTime,
            createdAt: user.metadata.creationTime,
            bankAccountNumber: "",
            shopName: "",
            shopComment: "",
            shopIconPhoto: "https://firebasestorage.googleapis.com/v0/b/ghost-rights.appspot.com/o/util%2Fghost_rights_logo.png?alt=media&token=6ae98b77-6d5e-4980-83d9-4681b4b05cc8"
          }

          await db.collection("OWNERS")
            .doc(user.uid)
            .set(ownerObj)

          await db.collection("OWNERS")
            .doc(user.uid)
            .collection("SECRETS")
            .doc("email")
            .set({
              body: user.email,
              createdBy: user.uid
            })          
        }

        this.$router.push(`/home`)
      } // if (this.uid && !this.isAnonymous) {
    }
  }
}
</script>
