<template lang="pug">
.wrap-module-fan-user
  .wrap-user-profile.py28.f.fh
    .wrap-img.f.fh
      img(:src="user.iconPhoto")
  .wrap-shop.mb12
    .f.fc.mb8
      span.shop-name {{ owner.shopName }}
    .f.fc.mb20
      .f.fm
        v-icon.mr2(color="#2a2a2a", size="20px") check
        span.plan-name.pt4 {{ planLabel }}
    div.wrap-share.f.fc.mb20(v-if="user.uid === $route.params.fanUserId")
      div.share-button.f.fm.px12.py8(v-clipboard:copy="copyMessage", v-clipboard:success="onCopy")
        v-icon.mr6(color="#fff", size="18px") share
        span この店舗を友達に教える
  .wrap-info
    v-text-field(label="Email", append-icon="mail", v-model="email", disabled)
    v-text-field(
      label="電話番号",
      type="number",
      append-icon="local_phone",
      v-model="phoneNumber",
      disabled
    )
</template>

<style lang="scss" scoped>
.wrap-module-fan-user {
  padding-top: 48px;
  width: 93%;
  max-width: 820px;
  margin: 0 auto;
  min-height: 100vh;
  .wrap-user-profile {
    .wrap-img {
      width: 120px;
      height: 120px;
      overflow: hidden;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .wrap-shop {
    .shop-name {
      font-size: 16px;
    }
    .plan-name {
      font-size: 14px;
    }
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
  .wrap-info {
    max-width: 380px;
    margin: 0 auto;
  }
}
</style>

<style lang="scss">
.v-text-field__details {
  display: none;
}
</style>

<script>
import db from '@/components/utils/firebase'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateAuth, mapActions: mapActionsAuth } = createNamespacedHelpers('auth')

export default {
  components: {
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    owner: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapStateAuth(['uid']),
    copyMessage: function () {
      return `${location.origin}/${this.$route.params.ownerId}/${this.$route.params.fanUserId}`
    }
  },
  data () {
    return {
      showModal: true,
      planLabel: '',
      email: null,
      phoneNumber: null
    }
  },
  async created () {
    switch (this.user.plan) {
      case 'FIVE_THOUSAND_YEN_PLAN':
        this.planLabel = '月額5,000円プラン'
        break
      case 'TEN_THOUSAND_YEN_PLAN':
        this.planLabel = '月額10,000円プラン'
        break
      case 'FIF_TEEN_THOUSAND_YEN_PLAN':
        this.planLabel = '月額15,000円プラン'
        break
      case 'TWENTY_THOUSAND_YEN_PLAN':
        this.planLabel = '月額20,000円プラン'
        break
    }

    this.email = await db.collection('FAN_USERS')
      .doc(this.user.uid)
      .collection('SECRETS')
      .doc('email')
      .get()
      .then(d => {
        if (d.exists) {
          var data = d.data()
          return data.body
        } else {
          return 'no email'
        }
      })
    this.phoneNumber = await db.collection('FAN_USERS')
      .doc(this.user.uid)
      .collection('SECRETS')
      .doc('phone_number')
      .get()
      .then(d => {
        if (d.exists) {
          var data = d.data()
          return data.body
        } else {
          return 'no phone number'
        }
      })
  },
  methods: {
    ...mapActionsAuth(['signOut']),
    onCopy () {
      alert(`招待リンクがコピーされました。`)
    }
  }
}
</script>
