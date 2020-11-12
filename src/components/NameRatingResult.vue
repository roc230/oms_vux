<template>
  <div>
    <x-header>名字测分结果</x-header>
    <card>
      <div slot="content" style="text-align: center;">
        <p>得分</p>
        <!-- <p style="font-size: x-large;color:red;">33</p> -->
        <p style="font-size: xx-large;color:red;">
          <countup :end-val="bazi.nameScore"></countup>
        </p>
      </div>
    </card>
    <group title="--生辰--">
      <flexbox class="vux-1px-b vux-1px-t">
        <flexbox-item class="vux-1px-r"><cell title="姓氏:" :value="birth.surname"></cell></flexbox-item>
        <flexbox-item class="vux-1px-r"><cell title="名字:" :value="birth.name"></cell></flexbox-item>
        <flexbox-item><cell title="性别:" :value="birth.sex"></cell></flexbox-item>
      </flexbox>
      <cell title="阳历生辰：" :value="birth.strSolarBirthDay"></cell>
      <cell title="平太阳时：" :value="bazi.meanSolarTime"></cell>
      <cell title="真太阳时：" :value="bazi.realSolarTime"></cell>
      <x-address title="出生地:" :list="addressData" v-model="birth.addr" disabled></x-address>
    </group>
    <group title="--八字--">
      <grid :cols="6">
        <!-- 天干十神 -->
        <grid-item :label="bazi.bazi.hourGan.shen" class="shen-color"></grid-item>
        <grid-item label="&nbsp;" class="shen-color"></grid-item>
        <grid-item :label="bazi.bazi.monthGan.shen" class="shen-color"></grid-item>
        <grid-item :label="bazi.bazi.yearGan.shen" class="shen-color"></grid-item>
        <grid-item v-if="bazi.currentDayun !== null" :label="bazi.currentDayun.gan.shen"></grid-item>
        <grid-item v-else label="&nbsp;"></grid-item>
        <grid-item v-if="bazi.currentYear !== null" :label="bazi.currentYear.ganzhi.gan.shen"></grid-item>
        <grid-item v-else label="&nbsp;"></grid-item>
        <!-- 八字标题 -->
        <grid-item label="时" class="bazi-name-row"></grid-item>
        <grid-item label="日" class="bazi-name-row"></grid-item>
        <grid-item label="月" class="bazi-name-row"></grid-item>
        <grid-item label="年" class="bazi-name-row"></grid-item>
        <grid-item label="大运" class="bazi-name-row"></grid-item>
        <grid-item label="流年" class="bazi-name-row"></grid-item>
        <!-- 八字天干 -->
        <grid-item :class="bazi.bazi.hourGan.color"><span>{{bazi.bazi.hourGan.name}}</span></grid-item>
        <grid-item :class="bazi.bazi.dayGan.color"><span>{{bazi.bazi.dayGan.name}}</span></grid-item>
        <grid-item :class="bazi.bazi.monthGan.color"><span>{{bazi.bazi.monthGan.name}}</span></grid-item>
        <grid-item :class="bazi.bazi.yearGan.color"><span>{{bazi.bazi.yearGan.name}}</span></grid-item>
        <grid-item :class="bazi.currentDayun.gan.color" style="background-color: #FAFAFA" v-if="bazi.currentDayun != null"><span>{{bazi.currentDayun.gan.name}}</span></grid-item>
        <grid-item v-else><span>&nbsp;</span></grid-item>
        <grid-item :class="bazi.currentYear.ganzhi.gan.color" v-if="bazi.currentYear != null" style="background-color: #FAFAFA"><span>{{bazi.currentYear.ganzhi.gan.name}}</span></grid-item>
        <grid-item v-else><span>&nbsp;</span></grid-item>
        <!-- 八字地支 -->
        <grid-item :class="bazi.bazi.hourZhi.color"><span>{{bazi.bazi.hourZhi.name}}</span></grid-item>
        <grid-item :class="bazi.bazi.dayZhi.color"><span>{{bazi.bazi.dayZhi.name}}</span></grid-item>
        <grid-item :class="bazi.bazi.monthZhi.color"><span>{{bazi.bazi.monthZhi.name}}</span></grid-item>
        <grid-item :class="bazi.bazi.yearZhi.color"><span>{{bazi.bazi.yearZhi.name}}</span></grid-item>
        <grid-item :class="bazi.currentDayun.zhi.color" v-if="bazi.currentDayun != null" style="background-color: #FAFAFA"><span>{{bazi.currentDayun.zhi.name}}</span></grid-item>
        <grid-item v-else><span>&nbsp;</span></grid-item>
        <grid-item :class="bazi.currentYear.ganzhi.zhi.color" v-if="bazi.currentYear != null" style="background-color: #FAFAFA"><span>{{bazi.currentYear.ganzhi.zhi.name}}</span></grid-item>
        <grid-item v-else><span>&nbsp;</span></grid-item>
        <!-- 地支藏干 -->
        <grid-item class="changgan-font-size">
          <span v-if="bazi.bazi.hourZhi.remainder != null" :class="bazi.bazi.hourZhi.remainder.color">{{bazi.bazi.hourZhi.remainder.name}}</span>
          <span v-if="bazi.bazi.hourZhi.mid != null" :class="bazi.bazi.hourZhi.mid.color">{{bazi.bazi.hourZhi.mid.name}}</span>
          <span :class="bazi.bazi.hourZhi.main.color">{{bazi.bazi.hourZhi.main.name}}</span>
          <br>
          <span v-if="bazi.bazi.hourZhi.remainder != null" style="color: black">{{bazi.bazi.hourZhi.remainder.shen}}</span>
          <span v-if="bazi.bazi.hourZhi.mid != null" style="color: black">{{bazi.bazi.hourZhi.mid.shen}}</span>
          <span style="color: black">{{bazi.bazi.hourZhi.main.shen}}</span>
        </grid-item>
        <grid-item class="changgan-font-size">
          <span v-if="bazi.bazi.dayZhi.remainder != null" :class="bazi.bazi.dayZhi.remainder.color">{{bazi.bazi.dayZhi.remainder.name}}</span>
          <span v-if="bazi.bazi.dayZhi.mid != null" :class="bazi.bazi.dayZhi.mid.color">{{bazi.bazi.dayZhi.mid.name}}</span>
          <span :class="bazi.bazi.dayZhi.main.color">{{bazi.bazi.dayZhi.main.name}}</span>
          <br>
          <span v-if="bazi.bazi.dayZhi.remainder != null" style="color: black">{{bazi.bazi.dayZhi.remainder.shen}}</span>
          <span v-if="bazi.bazi.dayZhi.mid != null" style="color: black">{{bazi.bazi.dayZhi.mid.shen}}</span>
          <span style="color: black">{{bazi.bazi.dayZhi.main.shen}}</span>
        </grid-item>
        <grid-item class="changgan-font-size">
          <span v-if="bazi.bazi.monthZhi.remainder != null" :class="bazi.bazi.monthZhi.remainder.color">{{bazi.bazi.monthZhi.remainder.name}}</span>
          <span v-if="bazi.bazi.monthZhi.mid != null" :class="bazi.bazi.monthZhi.mid.color">{{bazi.bazi.monthZhi.mid.name}}</span>
          <span :class="bazi.bazi.monthZhi.main.color">{{bazi.bazi.monthZhi.main.name}}</span>
          <br>
          <span v-if="bazi.bazi.monthZhi.remainder != null" style="color: black">{{bazi.bazi.monthZhi.remainder.shen}}</span>
          <span v-if="bazi.bazi.monthZhi.mid != null" style="color: black">{{bazi.bazi.monthZhi.mid.shen}}</span>
          <span style="color: black">{{bazi.bazi.monthZhi.main.shen}}</span>
        </grid-item>
        <grid-item class="changgan-font-size">
          <span v-if="bazi.bazi.yearZhi.remainder != null" :class="bazi.bazi.yearZhi.remainder.color">{{bazi.bazi.yearZhi.remainder.name}}</span>
          <span v-if="bazi.bazi.yearZhi.mid != null" :class="bazi.bazi.yearZhi.mid.color">{{bazi.bazi.yearZhi.mid.name}}</span>
          <span :class="bazi.bazi.yearZhi.main.color">{{bazi.bazi.yearZhi.main.name}}</span>
          <br>
          <span v-if="bazi.bazi.yearZhi.remainder != null" style="color: black">{{bazi.bazi.yearZhi.remainder.shen}}</span>
          <span v-if="bazi.bazi.yearZhi.mid != null" style="color: black">{{bazi.bazi.yearZhi.mid.shen}}</span>
          <span style="color: black">{{bazi.bazi.yearZhi.main.shen}}</span>
        </grid-item>
        <!-- 大运藏干 -->
        <grid-item class="dayun-changgan-font-size" v-if="bazi.currentDayun != null">
          <span v-if="bazi.currentDayun.zhi.remainder != null" :class="bazi.currentDayun.zhi.remainder.color">{{bazi.currentDayun.zhi.remainder.name}}</span>
          <span v-if="bazi.currentDayun.zhi.mid != null" :class="bazi.currentDayun.zhi.mid.color">{{bazi.currentDayun.zhi.mid.name}}</span>
          <span :class="bazi.currentDayun.zhi.main.color">{{bazi.currentDayun.zhi.main.name}}</span>
          <br>
          <span v-if="bazi.currentDayun.zhi.remainder != null" style="color: black">{{bazi.currentDayun.zhi.remainder.shen}}</span>
          <span v-if="bazi.currentDayun.zhi.mid != null" style="color: black">{{bazi.currentDayun.zhi.mid.shen}}</span>
          <span style="color: black">{{bazi.currentDayun.zhi.main.shen}}</span>
        </grid-item>
        <grid-item v-else><span>&nbsp;</span></grid-item>
        <!-- 流年藏干 -->
        <grid-item class="dayun-changgan-font-size" v-if="bazi.currentYear != null">
          <span v-if="bazi.currentYear.ganzhi.zhi.remainder != null" :class="bazi.currentYear.ganzhi.zhi.remainder.color">{{bazi.currentYear.ganzhi.zhi.remainder.name}}</span>
          <span v-if="bazi.currentYear.ganzhi.zhi.mid != null" :class="bazi.currentYear.ganzhi.zhi.mid.color">{{bazi.currentYear.ganzhi.zhi.mid.name}}</span>
          <span :class="bazi.currentYear.ganzhi.zhi.main.color">{{bazi.currentYear.ganzhi.zhi.main.name}}</span>
          <br>
          <span v-if="bazi.currentYear.ganzhi.zhi.remainder != null" style="color: black">{{bazi.currentYear.ganzhi.zhi.remainder.shen}}</span>
          <span v-if="bazi.currentYear.ganzhi.zhi.mid != null" style="color: black">{{bazi.currentYear.ganzhi.zhi.mid.shen}}</span>
          <span style="color: black">{{bazi.currentYear.ganzhi.zhi.main.shen}}</span>
        </grid-item>
        <grid v-else><span>&nbsp;</span></grid>
      </grid>
      <!-- 格局 -->
      <flexbox class="vux-1px-b">
        <flexbox-item class="vux-1px-r"><cell title="本格:" :value="bazi.originalPattern"></cell></flexbox-item>
        <flexbox-item><cell title="变格:" :value="bazi.pattern"></cell></flexbox-item>     
      </flexbox>
      <flexbox class="vux-1px-b">
        <flexbox-item class="vux-1px-r"><cell title="败格:" v-if="bazi.patternFailed !== null" :value="bazi.patternFailed"></cell><cell title="成格:" v-else :value="bazi.patternSuccess"></cell></flexbox-item>
        <flexbox-item><cell title="人元司事:" :value="bazi.renYuanOnDuty"></cell></flexbox-item>
      </flexbox>
      <!-- 进退气 -->
      <flexbox>
        <flexbox-item class="vux-1px-r"><cell title="进气:" :value="bazi.jinQi"></cell></flexbox-item>
        <flexbox-item class="vux-1px-r"><cell title="旺相:" :value="bazi.wangXiang"></cell></flexbox-item>
        <flexbox-item><cell title="退气:" :value="bazi.tuiQi"></cell></flexbox-item>
      </flexbox>
      <cell title="比重:" :value="wuxingScore"></cell>
      <cell title="用神(干)：" :value="ganUseGods" class="use-god"></cell>
      <cell title="用神(支)：" :value="zhiUseGods" class="use-god"></cell>
      <cell title="忌神(干)：" :value="ganFearGods" class="fear-god"></cell>
      <cell title="忌神(支)：" :value="zhiFearGods" class=fear-god></cell>
    </group>
    <divider></divider>
    <divider></divider>
    <divider></divider>
  </div>
</template>
<script>
  import { XHeader, Cell, XAddress, ChinaAddressV4Data, Grid, GridItem, Flexbox, FlexboxItem, Divider, Card, Countup } from 'vux'
  export default {
    components: {
      XHeader,
      Cell,
      XAddress,
      ChinaAddressV4Data,
      Grid,
      GridItem,
      Flexbox,
      FlexboxItem,
      Divider,
      Card,
      Countup
    },
    data () {
      return {
        birth: {},
        bazi: {},
        addressData: ChinaAddressV4Data
      }
    },
    methods: {
      getGanUseGods (gods) {
        let str = ''
        if (gods.length) {
          for (var i = 0; i < gods.length; i++) {
            str += gods[i].name + ' '
          }
          this.ganUseGods = str
        }
      },
      getZhiUseGods (gods) {
        let str = ''
        if (gods.length) {
          for (var i = 0; i < gods.length; i++) {
            str += gods[i].name + ' '
          }
          this.zhiUseGods = str
        }
      },
      getGanFearGods (gods) {
        let str = ''
        if (gods.length) {
          for (var i = 0; i < gods.length; i++) {
            str += gods[i].name + ' '
          }
          this.ganFearGods = str
        }
      },
      getZhiFearGods (gods) {
        let str = ''
        if (gods.length) {
          for (var i = 0; i < gods.length; i++) {
            str += gods[i].name + ' '
          }
          this.zhiFearGods = str
        }
      },
      getWuxingScore (bazi) {
        let map = bazi.wuxingScores
        if (map) {
          let str = ''
          let array = Object.entries(map)
          for (let i in array) {
            str += array[i][0] + '[' + array[i][1] + '] '
          }
          this.wuxingScore = str
        }
      }
    },
    created () {
      let r = this.$route.params
      this.birth = r.birth
      this.bazi = r.bazi
      this.getGanUseGods(this.bazi.useGod.useGans)
      this.getZhiUseGods(this.bazi.useGod.useZhis)
      this.getGanFearGods(this.bazi.useGod.fearGans)
      this.getZhiFearGods(this.bazi.useGod.fearZhis)
      this.getWuxingScore(this.bazi)
    }
  }
</script>
<style>
  .shen-color {
    background-color: #F2F2F2;
  }
  .bazi-name-row {
    background-color: #FFFF80;
    opacity: 0.7;
    font-weight: bold;
  }
  .green {
    color: green;
    text-align: center;
    background-color: #F2F2F2;
  }
  .red {
    color: red;
    text-align: center;
    background-color: #F2F2F2;
  }
  .yellow {
    color: orange;
    text-align: center;
    background-color: #F2F2F2;
  }
  .gray {
    color: gray;
    text-align: center;
    background-color: #F2F2F2;
  }
  .blue {
    color: blue;
    text-align: center;
    background-color: #F2F2F2;
  }
  .changgan-font-size {
    font-size: x-small;
    text-align: center;
    background-color: #F2F2F2;
  }
  .dayun-changgan-font-size {
    font-size: x-small;
    text-align: center;
    background-color: #FAFAFA;
  }
  .dayun-grid-item {
    background-color: #FAFAFA;
    text-align: center;
  }
  .use-god {
    background-color: #F7FFF8;
  }
  .fear-god {
    background-color: #FFF7F7;
  }

</style>