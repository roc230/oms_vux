<template>
  <div>
    <x-header>合婚</x-header>
    <group title="合婚人之一">
      <x-input title="姓名:" placeholder="请输入姓名" v-model="form.name" show-clear required text-align="right" required></x-input>
      <popup-radio title="性别:" :options="sex" v-model="form.sex"  placeholder="请选择性别"></popup-radio>
      <datetime title="阳历生辰(北京时间):" v-model="form.strSolarBirthDay" format="YYYY-MM-DD HH:mm" start-date="1901-01-01" placeholder="请设置出生时间"></datetime>
      <x-address title="出生地:" v-model="form.addr" :list="addressData" placeholder="请选择您的出生地"></x-address>
    </group>
    <group title="合婚人之二">
      <x-input title="姓名:" placeholder="请输入姓名" v-model="form2.name" show-clear required text-align="right" required></x-input>
      <popup-radio title="性别:" :options="sex" v-model="form2.sex"  placeholder="请选择性别"></popup-radio>
      <datetime title="阳历生辰(北京时间):" v-model="form2.strSolarBirthDay" format="YYYY-MM-DD HH:mm" start-date="1901-01-01" placeholder="请设置出生时间"></datetime>
      <x-address title="出生地:" v-model="form2.addr" :list="addressData" placeholder="请选择您的出生地"></x-address>
    </group>
    <flexbox>
      <flexbox-item><x-button type="default" @click.native="clear">清空</x-button></flexbox-item>
      <flexbox-item><x-button type="primary" @click.native="getMarry">测分</x-button></flexbox-item>
    </flexbox>

    <group v-show="showResult">
      <divider>合婚结果</divider>
      <div style="text-align: center;">得分：<countup :start-val="0" :end-val="score" :duration="1"></countup></div>
      <group title="大运同步走势：">
        <div>
          <v-chart ref="refChart" :data="data">
            <v-scale x :tick-count="10" />
            <v-scale y :nice="false" :min="-100" :max="100" />
            <v-tooltip />
            <v-line series-field="type" />
          </v-chart>
        </div>
      </group>
      <group title="建议:">
        <cell-box>{{marry.advise}}</cell-box>
      </group>
      <cell></cell>
      <cell></cell>
      <cell></cell>
    </group>
  </div>
</template>
<script>
  import { XHeader, Divider, CellBox, Grid, GridItem, Group, XInput, PopupRadio, Datetime, XAddress, ChinaAddressV4Data, Flexbox, FlexboxItem, XButton, VChart, VScale, VLine, VAxis, VTooltip, Cell, Countup } from 'vux'
  import http from '@/store/http'
  export default {
    components: {
      XHeader,
      Divider,
      Group,
      XInput,
      PopupRadio,
      Datetime,
      XAddress,
      ChinaAddressV4Data,
      Flexbox,
      FlexboxItem,
      XButton,
      VChart,
      VLine,
      VAxis,
      VTooltip,
      VScale,
      Cell,
      Countup,
      CellBox,
      Grid,
      GridItem
    },
    data () {
      return {
        form: {},
        form2: {},
        sex: ['男', '女'],
        surname: [],
        addressData: ChinaAddressV4Data,
        showResult: false,
        data: [],
        score: 0,
        marry: {},
        bazi1: {}
      }
    },
    methods: {
      clear () {
        this.showResult = false
      },
      getData (yearAligns) {
        if (yearAligns) {
          let l = yearAligns.length
          // console.log('l = ' + l)
          let d = []
          for (let i = 0; i < l; i++) {
            let a = {}
            a.date = '' + yearAligns[i].year
            a.type = yearAligns[i].name1
            a.value = yearAligns[i].dayun1.score
            d[i] = a

            let b = {}
            b.date = '' + yearAligns[i].year
            b.type = yearAligns[i].name2
            b.value = yearAligns[i].dayun2.score
            d[l + i] = b
          }
          this.data = d
          // console.log(JSON.stringify(this.data))
          // this.$refs.refChart.repaint()
          this.showResult = true
        }
      },
      getMarry () {
        // this.showResult = true
        let f = {}
        f.birthVO1 = this.form
        f.birthVO2 = this.form2
        http.postJson('/marry', f)
          .then(response => {
            let obj = response.obj
            this.marry = obj
            this.score = obj.score
            this.getData(obj.yearAligns)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    created () {

    }
  }
</script>