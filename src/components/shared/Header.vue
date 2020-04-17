<template lang="pug">
  Auth(:loginFailed="onFailedAuthentication")
    div.wrap-common-header
      div.header-content.f.fh
        div(v-if="content.leftAction").left.f.fm
          v-icon(@click="content.leftAction.method" :color="content.leftAction.color").mr4 {{content.leftAction.icon}}
          span(:style="`color: ${content.leftAction.color};`") {{content.leftAction.label}}
        div.wrap-label
          span(v-if="content.label").label.line-clamp-1 {{content.label}}
        div(v-if="content.rightAction" @click="content.rightAction.method").right.f.fm
          v-icon(:color="content.rightAction.color").mr4 {{content.rightAction.icon}}
          span(:style="`color: ${content.rightAction.color};`") {{content.rightAction.label}}

</template>

<style lang="scss" scoped>
.wrap-common-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  background: #fff;
  border-bottom: solid rgba(0, 0, 0, 0.4) 0.5px;
  z-index: 200;
  .header-content {
    position: relative;
    width: 93%;
    height: 100%;
    max-width: 820px;
    margin: 0 auto;
    .left {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      color: #2a2a2a;
      .logo {
        font-size: 16px;
      }
      img {
        height: 34px;
      }
    }
    .wrap-label {
      max-width: 160px;
      .label {
        font-size: 16px;
      }
    }
    .right {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      color: #2a2a2a;
    }
  }
}
</style>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateAuth, mapActions: mapActionsAuth } = createNamespacedHelpers('auth')
import Auth from '@/components/auth'

export default {
  components: {
    Auth
  },
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      
    }
  },
  methods: {
    ...mapActionsAuth(['signOut']),
    logout () {
      this.signOut()
      setTimeout(() => {
        this.$router.push('/sign-in')
      }, 400)
    },
    onFailedAuthentication () {
      this.$router.push('/sign-in')
    },
    openModal () {
      this.showModal = true
    },
    closeModal (e) {
      this.showModal = false
    }
  }
}
</script>
