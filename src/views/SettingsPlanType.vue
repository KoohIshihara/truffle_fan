<template lang="pug">
  Auth(@loggedIn="onLoggedIn" @loginFailed="onFailedAuthentication")
    Header(:content="headerContent")
    div.wrap-plan-type
      ModulesSettingsPlanType(ref='planType' v-if='owner' :owner='owner')
</template>

<style lang="scss" scoped>
.wrap-plan-type {
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
import ModulesSettingsPlanType from '@/components/module/ModulesSettingsPlanType'

export default {
  components: {
    Auth,
    Header,
    ModulesSettingsPlanType
  },
  data () {
    return {
      owner: null,
      headerContent: {
        label: 'プラン設定',
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
        }
      },
      isFirst: false
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
      if (!this.owner.planType) this.isFirst = true
      if (this.isFirst) this.headerContent.rightAction.label = '次へ'
    },
    async onHeaderRight () {
      if (this.$refs.planType.planType === 'fanClub' &&
          this.$refs.planType.fanClubDetail === '') {
        alert('特典の説明を入力してください。')
        return false
      }

      var updateProp = {
        planType: this.$refs.planType.planType
      }

      if (this.$refs.planType.planType === 'fanClub') {
        var plan
        switch (this.$refs.planType.price) {
          case '5,000円':
            plan = 'FIVE_THOUSAND_YEN_PLAN'
            break
          case '10,000円':
            plan = 'TEN_THOUSAND_YEN_PLAN'
            break
          case '20,000円':
            plan = 'TWENTY_THOUSAND_YEN_PLAN'
            break
        }
        updateProp.fanClubDetail = {
          content: this.$refs.planType.fanClubDetail,
          plan: plan
        }
      }

      await db.collection('OWNERS').doc(this.uid)
        .update(updateProp)

      var path = (this.isFirst) ? '/settings/profile': '/settings'
      this.$router.push(path)
    }
  }
}
</script>
