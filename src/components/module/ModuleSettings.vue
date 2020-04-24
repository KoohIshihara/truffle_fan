<template lang="pug">
  div.wrap-module-settings
    div(v-for='item in editList').wrap-list
      div(@click="$router.push(`settings/${item.id}`)").list-content.f.fm.flex-between.py8
        span {{item.label}}
        v-icon keyboard_arrow_right
</template>

<style lang="scss" scoped>
.wrap-module-settings {
  width: 100%;
  min-height: 100vh;
  .wrap-list {
    background: #fff;
    border-bottom: solid rgba(0, 0, 0, 0.4) 0.5px;
    .list-content {
      width: 93%;
      max-width: 820px;
      margin: 0 auto;
    }
  }
}
</style>

<script>
import db from '@/components/utils/firebase'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateAuth, mapActions: mapActionsAuth } = createNamespacedHelpers('auth')

export default {
  components: {
  },
  computed: {
    ...mapStateAuth(['uid'])
  },
  data () {
    return {
      showModal: true,
      editList: [
        {
          label: 'プロフィールを編集',
          id: 'profile'
        },
        {
          label: '口座情報を編集',
          id: 'bank_info'
        },
        {
          label: 'プランを編集',
          id: 'plan_type'
        }
      ]
    }
  },
  methods: {
    ...mapActionsAuth(['signOut'])
  }
}
</script>
