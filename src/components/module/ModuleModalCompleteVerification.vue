<template lang="pug">
  div.wrap-module-complete-subscription.px18.py24
    div.f.fc.mb12
      span 認証が完了しました！
    div.wrap-share.f.fc
      div(v-clipboard:copy="copyMessage"
        v-clipboard:success="onCopy").share-button.f.fm.px12.py8
        v-icon(color="#fff" size="18px").mr6 share
        span.line-clamp-1 友達にもシェアする

</template>

<style lang="scss" scoped>
.wrap-module-complete-subscription {
  min-width: 280px;
  border-radius: 3px;
  background: #fff;
  .wrap-share {
    .share-button {
      background: #1967d2;
      border-radius: 3px;
      span {
        color: #fff;
        font-size: 12px;
      }
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
    ...mapStateAuth(['uid']),
    copyMessage: function () {
      return `${location.origin}/${this.$route.params.ownerId}/${this.$route.params.fanUserId}`
    }
  },
  data () {
    return {
      showModal: true
    }
  },
  created () {
  },
  methods: {
    ...mapActionsAuth(['signOut']),
    onCopy () {
      alert(`招待リンクがコピーされました。`)
      this.$emit('closeModal')
    }
  }
}
</script>
