<template>
  <div>
    <div id="firebaseui-auth-container" />
    <!--v-progress-circular v-show="!isSignInUILoaded" :size="50" color="primary" indeterminate /-->
  </div>
</template>

<script>
import { firebase } from '@/components/utils/firebase'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
const ui = new firebaseui.auth.AuthUI(firebase.auth())

export default {
  data () {
    return {
      isSignInUILoaded: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.setupSignInUi()
    })
    // setTimeout(this.setupSignInUi, 800)
  },
  methods: {
    setupSignInUi () {
      const vInstance = this
      const uiConfig = {
        credentialHelper: firebaseui.auth.CredentialHelper.NONE,
        callbacks: {
          uiShown () {
            vInstance.isSignInUILoaded = true
          },
          signInSuccess: () => false
        },
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: false
          }
        ],
        // tosUrl and privacyPolicyUrl accept either url string or a callback
        // function.
        // Terms of service url/callback.
        tosUrl: '<your-tos-url>',
        // Privacy policy url/callback.
        privacyPolicyUrl: function () {
          window.location.assign('<your-privacy-policy-url>')
        }
      }

      // Initialize the FirebaseUI Widget using Firebase.

      // The start method will wait until the DOM is loaded.

      // this.$nextTick(() => {
      //   ui.start('#firebaseui-auth-container', uiConfig)
      // })
      setTimeout(() => {
        ui.start('#firebaseui-auth-container', uiConfig)
      }, 800)
    }
  }
}
</script>

<style>
/* Collapse height of firebase ui loading spinner container */
.mdl-card .firebaseui-callback-indicator-container {
  height: 2px;
}

/* Collapse height of firebase ui loading spinner container */
.mdl-card.firebaseui-container {
  min-height: 2px;
}
</style>
