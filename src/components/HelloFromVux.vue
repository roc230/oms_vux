<template>
  <div>
    <!-- <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <h1> </h1>
    </div>
    <group title="cell demo">
      <cell title="VUX" value="cool" is-link></cell>

    </group> -->

    <x-header :left-options="{showBack: false}" :right-options="{showMore: true}">晓运</x-header>
    <group>
      <x-input title="姓名:" placeholder="请输入姓名" v-model="form.name" show-clear required text-align="right"></x-input>
      <popup-radio title="性别:" :options="sex" v-model="form.sex"  placeholder="请选择性别"></popup-radio>
      <datetime title="阳历生辰:" v-model="form.birth" format="YYYY-MM-DD HH:mm" placeholder="请设置阳历生日" required></datetime>
      <x-address  title="出生地:" v-model="form.addr" :list="addressData" placeholder="请选择出生地" ></x-address>
    </group>
    <flexbox>
      <flexbox-item><x-button type="default">重置</x-button></flexbox-item>
      <flexbox-item><x-button type="primary" @click.native="saveBirth">算八字</x-button></flexbox-item>
    </flexbox>
   <!--  <tabbar>
      <tabbar-item>
        <img src="" slot="icon"></img>
        <span slot="label">算八字</span>
      </tabbar-item>
      <tabbar-item>
        <span slot="label">命理学习</span>
      </tabbar-item>
      <tabbar-item>
        <span slot="label">个人中心</span>
      </tabbar-item>
    </tabbar> -->
  </div>
</template>

<script>
  import { Tabbar, TabbarItem, XHeader, Group, Cell, Datetime, XAddress, ChinaAddressV4Data, XButton, XInput, Flexbox, FlexboxItem, PopupRadio } from 'vux'
  import http from '@/store/http'
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
      PopupRadio
    },
    data () {
      return {
        // note: changing this line won't causes changes
        // with hot-reload because the reloaded component
        // preserves its current state and we are modifying
        // its initial state.

        msg: 'Hello World!',
        sex: ['男', '女'],
        form: {}
      }
    },
    methods:{
      saveBirth(){
        http.post('/', this.form)
          .then(response => {

          })
          .catch(error => {})
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
</style>
