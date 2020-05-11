<template lang="pug">
  div.wrap-module-edit-fan-user.px18.py24
    div(v-if="beforeSaving")
      div.f.fc.mb8
        h4 会員証を作成しましょう。
      div.wrap-explain.f.fc
        span あなたの笑顔が会員証となります。
      div.wrap-img-uploader.f.fc.py12
        ItemMediaUploader(
          :imgId="uid"
          :existingImg="user.iconPhoto"
          @updateIconPhoto="updateUserIconPhoto"
          ref="mediaUploader")
      div.wrap-input.py12
        v-text-field(label="お名前" placeholder="お名前を入力" v-model="user.name")
        v-text-field(label="電話番号"
          placeholder="電話番号を入力"
          type="number"
          append-icon="local_phone"
          v-model="user.phoneNumber")
      div.wrap-button.f.fc
        span(@click="onSave").px12.py8 保存
    div(v-else).wrap-after-send.py20
      div.f.fc.mb20
        span 確認メールを送信しました。
      div(v-if="!showRetryEmail").f.fc
        span(@click="() => { showRetryEmail = true }").cannot-reach メールが届かない場合
      div(v-if="showRetryEmail").wrap-retry-send-email
        v-text-field(label="Email"
          placeholder="メールアドレスを入力"
          append-icon="mail"
          v-model="user.email")
        div.wrap-button.f.fc
          span(@click="onRetrySendEmail").px12.py8 もう一度送信
    div(v-if="isSaving").wrap-now-saving.f.fh
      v-progress-circular(color="primary" indeterminate)

</template>

<style lang="scss" scoped>
.wrap-module-edit-fan-user {
  position: relative;
  min-width: 280px;
  border-radius: 3px;
  background: #fff;
  .wrap-explain {
    span {
      font-size: 12px;
    }
  }
  .wrap-button {
    span {
      color: #fff;
      background: #1967d2;
      border-radius: 3px;
    }
  }
  .wrap-after-send {
    .cannot-reach {
      color: #1967d2;
      font-size: 12px;
    }
  }
  .wrap-now-saving {
    z-index: 1001;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #fff;
  }
}
</style>

<script>
import db, { api } from '@/components/utils/firebase'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateAuth, mapActions: mapActionsAuth } = createNamespacedHelpers('auth')
import ItemMediaUploader from '@/components/item/ItemMediaUploader'

export default {
  components: {
    ItemMediaUploader
  },
  computed: {
    ...mapStateAuth(['uid', 'email'])
  },
  data () {
    return {
      user: {
        iconPhoto: '/img/default-icons/default-icon.png',
        name: '',
        phoneNumber: '',
        email: ''
      },
      beforeSaving: true,
      showRetryEmail: false,
      isSaving: false
    }
  },
  created () {
    this.user.email = this.email
  },
  methods: {
    ...mapActionsAuth(['signOut', 'updateEmail']),
    async onSave () {
      if (this.isSaving) return false
      this.isSaving = true

      if (this.user.name === '' ||
          this.user.phoneNumber === '') {
        alert('必要項目を入力してください。')
        this.isSaving = false
        return false
      }

      var ref = db.collection('FAN_USERS').doc(this.uid)
      await ref.update({
        name: this.user.name,
        iconPhoto: this.user.iconPhoto,
        emailIsVerified: false,
        phoneNumberIsVerified: false
      })
      
      await ref.collection('SECRETS').doc('phone_number').set({
        ownerId: this.$route.params.ownerId,
        body: this.user.phoneNumber,
        createdBy: this.uid
      })

      const response = await fetch(`${api}/sendEmailVerification`, {
        method: 'POST',
        // mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: this.email,
          uid: this.uid,
          ownerId: this.$route.params.ownerId
        })
      })
      await response.json()

      this.updateEmail(this.email)

      this.beforeSaving = false
      this.isSaving = false
    },
    async onRetrySendEmail () {
      this.updateEmail(this.user.email)

      await db.collection('FAN_USERS')
        .doc(this.uid)
        .collection('SECRETS')
        .doc('email')
        .update({
          body: this.email
        })
      
      const response = await fetch(`${api}/sendEmailVerification`, {
        method: 'POST',
        // mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: this.email,
          uid: this.uid,
          ownerId: this.$route.params.ownerId
        })
      })
      await response.json()

      alert('送信しました。メールをご確認ください。')
    },
    updateUserIconPhoto (url) {
      this.user.iconPhoto = url
    }
  }
}
</script>
