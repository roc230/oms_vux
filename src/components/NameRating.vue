<template>
  <div>
    <x-header :left-options="{showBack: false}" :right-options="{showMore: true}">
      <div slot="left" @click="back"><i class="iconfont icon-angle-left"></i> 返回</div>
      <div>姓名得分</div>
    </x-header>
    <group>
      <x-input title="姓氏：" placeholder="请输入正解的姓氏" :options="surname" v-model="form.surname" :icon-type="iconType" novalidate text-align="right" required @on-blur="surNameOnBlue"></x-input>
      <x-input title="名字：" placeholder="请输入名字" v-model="form.name" show-clear text-align="right" required @on-blur="nameOnBlur" :icon-type="nameIconType"></x-input>
      <popup-radio title="性别：" :options="sex" v-model="form.sex"  placeholder="请选择性别"></popup-radio>
      <datetime title="阳历生辰(北京时间):" v-model="form.strSolarBirthDay" format="YYYY-MM-DD HH:mm" start-date="1901-01-01" placeholder="请设置出生时间"></datetime>
      <x-address title="出生地：" v-model="form.addr" :list="addressData" placeholder="请选择您的出生地"></x-address>
    </group>
    <toast v-model="showPositionValue" type="text" :time="800" is-show-mask :text="toastText" :position="position"></toast>
    <flexbox>
      <flexbox-item><x-button type="default" @click.native="clear">清空</x-button></flexbox-item>
      <flexbox-item><x-button type="primary" @click.native="nameRatingHandler">测分</x-button></flexbox-item>
    </flexbox>
  </div>
</template>
<script>
  import { XHeader, Group, XInput, PopupRadio, Datetime, XAddress, Toast, Flexbox, FlexboxItem, XButton, ChinaAddressV4Data, Grid, GridItem } from 'vux'
  import http from '@/store/http'
  export default {
    components: {
      XHeader,
      Group,
      XInput,
      PopupRadio,
      Datetime,
      XAddress,
      Toast,
      Flexbox,
      FlexboxItem,
      XButton,
      ChinaAddressV4Data,
      Grid,
      GridItem
    },
    data () {
      return {
        form: {},
        sex: ['男', '女'],
        surname: ['a'],
        addressData: ChinaAddressV4Data,
        toastText: '',
        position: 'default',
        showPositionValue: false,
        showResult: false,
        iconType: '',
        nameIconType: '',
        bazi: {}
      }
    },
    methods: {
      back () {
        this.$router.replace('/personal')
      },
      surNameOnBlue () {
        let url = '/name/surname/exists/' + this.form.surname
        http.get(url, null)
          .then(response => {
            let r = response.obj
            // console.log(r)
            if (r === false) {
              // console.log('error')
              this.iconType = 'error'
              this.form.surname = ''
            } else if (r === true) {
              this.iconType = 'success'
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      nameOnBlur () {
        if (this.form.name.length > 0) {
          this.nameIconType = 'success'
        } else {
          this.nameIconType = ''
        }
      },
      getNameRating (form) {
        this.percent = 20
        if (form.sex != null && form.strSolarBirthDay != null) {
          if (form.addr) {
            form.province = form.addr[0]
            form.city = form.addr[1]
            form.district = form.addr[2]
          }
          this.percent = 30
          http.get('/name/rating', form)
          .then(response => {
            this.percent = 40
            if (response.code === 200) {
              let r = {}
              r.birth = this.form
              r.bazi = response.obj
              if (r.bazi) {
                this.$router.push({name: 'NameRatingResult', params: r})
              }
            }
          })
          .catch(error => {
            console.log(error)
          })
        }
      },
      nameRatingHandler () {
        this.getNameRating(this.form)
        this.showResult = true
      }
    },
    mounted () {

    }
  }
</script>