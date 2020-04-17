<template lang="pug">
  transition(name="fade")
    div(v-if="showModal" @click="$emit('closeModal')").wrap-modal-window.f.fh
      div(@click.stop).prevent-wrap.f.fc
        ModuleRegisterCard(
          v-if="modalContentId === 'registerCard'"
          @openModalWindow="(id) => { $emit('openModalWindow', id) }"
          @closeModal="() => { $emit('closeModal') }")
        ModuleModalCompleteSubscription(
          v-if="modalContentId === 'completeSubscription'"
          @closeModal="() => { $emit('closeModal') }")
        ModuleModalEditFanUser(
          v-if="modalContentId === 'editFanUser'"
          @closeModal="() => { $emit('closeModal') }")
        ModuleModalCompleteVerification(
          v-if="modalContentId === 'completeVerification'"
          @closeModal="() => { $emit('closeModal') }")
</template>

<style lang="scss" scoped>
.wrap-modal-window {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 102;
  background: rgba(0, 0, 0, 0.4);
  overflow: scroll;
  .prevent-wrap {
    width: 90%;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease-out;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

<script>
import ModuleRegisterCard from '@/components/module/ModuleRegisterCard'
import ModuleModalCompleteSubscription from '@/components/module/ModuleModalCompleteSubscription'
import ModuleModalEditFanUser from '@/components/module/ModuleModalEditFanUser'

import ModuleModalCompleteVerification from '@/components/module/ModuleModalCompleteVerification'

export default {
  components: {
    ModuleRegisterCard,
    ModuleModalCompleteSubscription,
    ModuleModalEditFanUser,
    ModuleModalCompleteVerification
  },
  props: {
    showModal: {
      type: Boolean,
      required: true
    },
    modalContentId: {
      type: String,
      required: true
    },
    option: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      
    }
  },
  methods: {
  }
}
</script>
