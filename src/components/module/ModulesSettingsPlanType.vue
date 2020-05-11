<template lang="pug">
  div.wrap-module-plan-type.f.fh
    div
      div.f.fc.mb12
        h4 サブスクの種類を選択しましょう。
      div.selection
        v-radio-group(v-model="planType")
          div.mb24
            v-radio(label='1口1,000円の2割引券' value='unit')
            span.example.pl32 Ex.月額10,000円で12口をサブスク
          div
            v-radio(label='月額定額のファンクラブ' value='fanClub')
            //- div.pl32
              v-select(:items='prices' v-model='price')
              v-text-field(placeholder='特典の説明を入力' v-model='fanClubDetail')
              span.example Ex.月額5,000円で来店時にコーヒー1杯無料
            div
              ItemSettingsFanClubPlanList(
                v-for='content in fanClubList'
                :content='content'
                @removeMenu='removeMenu')
              div.f.flex-right.mt12.mb10
                div(@click='addPlanMenu').add-plan-menu.f.fm
                  v-icon(color='blue') add
                  span ファンクラブのメニューを追加
              div.pl32
                span.example Ex.月額5,000円で来店時にコーヒー1杯無料
</template>

<style lang="scss" scoped>
.wrap-module-plan-type {
  width: 100%;
  min-height: 100vh;
  .selection {
    .example {
      font-size: 14px;
      color: #999;
    }
    .add-plan-menu {
      cursor: pointer;
      span {
        font-size: 14px;
        color: #1967d2;
      }
    }
  }
}
</style>

<style lang="scss">
.wrap-module-plan-type {
  .v-radio {
    margin-bottom: 0 !important;
  }
  .v-text-field {
    padding-top: 0 !important;
  }
  .v-text-field__details {
    display: none !important;
  }
  .v-input__control {
    width: 100% !important;
  }
}
</style>

<script>
import db from '@/components/utils/firebase'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateAuth, mapActions: mapActionsAuth } = createNamespacedHelpers('auth')
import ItemSettingsFanClubPlanList from '@/components/item/ItemSettingsFanClubPlanList'

export default {
  components: {
    ItemSettingsFanClubPlanList
  },
  props: {
    owner: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapStateAuth(['uid'])
  },
  data () {
    return {
      planType: 'unit',
      fanClubDetail: '',
      price: '5,000円',
      prices: [
        '5,000円',
        '10,000円',
        '15,000円',
        '20,000円'
      ],
      fanClubList: [
        {
          plan: 'FIVE_THOUSAND_YEN_PLAN',
          detail: ''
        }
      ]
    }
  },
  created () {
    if (this.owner.planType === 'fanClub') {
      this.planType = 'fanClub'
      if (this.owner.fanClubList) this.fanClubList = this.owner.fanClubList

      // switch (this.owner.fanClubDetail.plan) {
      //   case 'FIVE_THOUSAND_YEN_PLAN':
      //     this.price = '5,000円'
      //     break
      //   case 'TEN_THOUSAND_YEN_PLAN':
      //     this.price = '10,000円'
      //     break
      //   case 'FIF_TEEN_THOUSAND_YEN_PLAN':
      //     this.price = '15,000円'
      //     break
      //   case 'TWENTY_THOUSAND_YEN_PLAN':
      //     this.price = '20,000円'
      //     break
      // }
      // this.fanClubDetail = this.owner.fanClubDetail.content
    }
  },
  methods: {
    ...mapActionsAuth(['signOut']),
    addPlanMenu () {
      this.fanClubList.push({
        plan: 'FIVE_THOUSAND_YEN_PLAN',
        detail: ''
      })
    },
    removeMenu (content) {
      this.fanClubList = this.fanClubList.filter(e => {
        return !(e.price === content.price && e.detail === content.detail)
      })
    }
  }
}
</script>
