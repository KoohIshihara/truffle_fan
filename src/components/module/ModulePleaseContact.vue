<template lang="pug">
  div.wrap-module-please-contact.f.fh
    div(v-if='!isNowLoading').wrap-module-content.px12
      span.mb8 会員証のプロフィールを設定する必要があります。
      span.mb16 まずは本人確認をしてください。
      div.wrap-button.f.fc.mb16
        span(@click='sendEmail').px12.py8 {{label}}
      span.contact メールが届かない場合は#[a(href='mailto:truffletechnologies@gmail.com') お問い合わせ]ください。
    div(v-else).wrap-now-loading.f.fh
      v-progress-circular(color="primary" indeterminate)
</template>

<style lang="scss" scoped>
.wrap-module-please-contact {
  min-width: 280px;
  min-height: 300px;
  background: #fff;
  border-radius: 3px;
  .wrap-module-content {
    span {
      display: block;
      text-align: center;
    }
    .mail {
      display: block;
      text-align: center;
      color: #999;
    }
    .wrap-button {
      span {
        color: #fff;
        background: #1967d2;
        border-radius: 3px;
        cursor: pointer;
      }
    }
    .contact {
      font-size: 12px;
      a {
        color: #999;
      }
    }
  }
  .wrap-now-loading {
    width: 100%;
    height: 100%;
  }
}
</style>

<script>
import { api } from '@/components/utils/firebase'

export default {
  data () {
    return {
      label: '本人確認メールを送信',
      isNowLoading: false
    }
  },
  methods: {
    async sendEmail () {
      this.isNowLoading = true

      var uid = this.$route.params.fanUserId
      const response = await fetch(`${api}/sendEmailToEditProfile`, {
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

      alert('送信しました。メールをご確認ください。')

      this.label = 'もう一度送信する'

      this.isNowLoading = false
    }
  }
}
</script>
