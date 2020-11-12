<template>
  <div>
    <x-header :left-options="{showBack: false}" :right-options="{showMore: true}">灯塔命理</x-header>
    <x-img :src="imgUrl"></x-img>
    <group>
      <x-input title="姓名(选填):" placeholder="请输入姓名" v-model="form.name" show-clear text-align="right"></x-input>
      <popup-radio title="性别(必填):" :options="sex" v-model="form.sex"  placeholder="请选择性别"></popup-radio>
    </group>
    <group title="本工具以出生时的钟表时间(北京时间)进行真太阳时运算，请选择出生时的钟表时间，以免计算错误">
      <datetime title="阳历生辰(必填):" v-model="form.strSolarBirthDay" format="YYYY-MM-DD HH:mm" start-date="1901-01-01" placeholder="请设置出生时间"></datetime>
    </group>
    <group title="本工具以出生地来计算真太阳时，请选择正确的出生地，以免计算错误">
      <x-address title="出生地(必填):" v-model="form.addr" :list="addressData" placeholder="请选择您的出生地"></x-address>
    </group>
    <toast v-model="showPositionValue" type="text" :time="800" is-show-mask :text="toastText" :position="position"></toast>
    <divider></divider>
    <flexbox>
      <flexbox-item><x-button type="default" @click.native="clear">清空</x-button></flexbox-item>
      <flexbox-item><x-button type="primary" @click.native="toBazi" :disabled="disabled">算八字</x-button></flexbox-item>
    </flexbox> 
    <divider></divider>
    <divider></divider>
    <divider></divider>
  </div>
</template>

<script>
  import { Tabbar, TabbarItem, XHeader, Group, Cell, Datetime, XAddress, ChinaAddressV4Data, XButton, XInput, Flexbox, FlexboxItem, PopupRadio, Toast, Divider, XImg } from 'vux'
  export default {
    components: {
      Tabbar,
      TabbarItem,
      XHeader,
      Group,
      Cell,
      Datetime,
      XAddress,
      XButton,
      ChinaAddressV4Data,
      XInput,
      Flexbox,
      FlexboxItem,
      PopupRadio,
      Toast,
      Divider,
      XImg
    },
    data () {
      return {
        imgUrl: require('../assets/light-tower.jpg'),
        toastText: '',
        position: 'default',
        showPositionValue: false,
        disabled: false,
        sex: ['男', '女'],
        form: {},
        addressData: ChinaAddressV4Data
      }
    },
    methods: {
      showPosition (position) {
        this.position = position
        this.showPositionValue = true
      },
      clear () {
        this.form.name = ''
        this.form.sex = undefined
        this.form.strSolarBirthDay = ''
        this.form.addr = undefined
      },
      checkForm () {
        console.log(this.form.sex)
        if (this.form.sex === undefined) {
          this.toastText = '请选择性别'
          this.showPosition('default')
          return false
        } else if (this.form.strSolarBirthDay === '') {
          this.toastText = '请设置出生时间'
          this.showPosition('defalut')
          return false
        } else if (this.form.addr === undefined) {
          this.toastText = '请设置出生地'
          this.showPosition('defalut')
          return false
        } else {
          return true
        }
      },
      toBazi () {
        if (this.checkForm() === true) {
          this.$router.push({name: 'Bazi', params: this.form})
        }
      }
    }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
.bazi-name-row {
  background-color: gray
}
</style>
