<template lang="pug">
  Auth
    Header(:content="headerContent")
    div.wrap-reset-profile.f.fh
      v-progress-circular(color="primary" indeterminate)
</template>

<style lang="scss" scoped>
.wrap-reset-profile {
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

export default {
  components: {
    Auth,
    Header
  },
  data () {
    return {
      owner: null,
      headerContent: {
        label: 'プロフィールの再設定'
      }
    }
  },
  async created () {
    var resetPath = await db.collection('RESET_PROFILE_PATH')
      .doc(this.$route.params.resetProfileId)
      .get()
      .then((d) => {
        return d
      })
    
    if (resetPath.exists) {
      var uid = resetPath.data().createdBy
      
      const response = await fetch(`${api}/updateUpdatedAt`, {
        method: 'POST',
        // mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          uid: uid
        })
      })
      await response.json()

      var fanUser = await db.collection('FAN_USERS')
        .doc(uid)
        .get()
        .then(d => {
          return d.data()
        })

      this.$router.push(`/fan_users/${fanUser.ownerId}/${uid}`)
    } else {
      alert('本人確認に失敗しました。')
      return false
    }
  }
}
</script>
