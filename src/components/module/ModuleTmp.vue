<template lang="pug">
  div.wrap-module-tmp.f.fh
    span module-tmp

</template>

<style lang="scss" scoped>
.wrap-module-tmp {
  width: 100%;
  min-height: 100vh;
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
      showModal: true
    }
  },
  methods: {
    ...mapActionsAuth(['signOut'])
  }
}
</script>
