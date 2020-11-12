<template>
  <div>
    <x-header :left-options="{showBack: false}">
      <div slot="left" @click="back"><i class="iconfont icon-angle-left"></i> 返回</div>
      <div>大运</div>
    </x-header>
    <group title="--八字--">
      <grid :cols="6">
        <!-- 天干十神 -->
        <grid-item :label="bazi.bazi.hourGan.shen" class="shen-color"></grid-item>
        <grid-item label="&nbsp;" class="shen-color"></grid-item>
        <grid-item :label="bazi.bazi.monthGan.shen" class="shen-color"></grid-item>
        <grid-item :label="bazi.bazi.yearGan.shen" class="shen-color"></grid-item>
        <grid-item label="&nbsp;"></grid-item>
        <grid-item label="&nbsp;"></grid-item>
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
        <grid-item :class="dayun.gan.color" style="background-color: #FAFAFA" v-if="dayun != null"><span>{{dayun.gan.name}}</span></grid-item>
        <grid-item v-else><span>&nbsp;</span></grid-item>
        <grid-item :class="bazi.currentYear.ganzhi.gan.color" v-if="bazi.currentYear != null" style="background-color: #FAFAFA"><span>{{bazi.currentYear.ganzhi.gan.name}}</span></grid-item>
        <grid-item v-else><span>&nbsp;</span></grid-item>
        <!-- 八字地支 -->
        <grid-item :class="bazi.bazi.hourZhi.color"><span>{{bazi.bazi.hourZhi.name}}</span></grid-item>
        <grid-item :class="bazi.bazi.dayZhi.color"><span>{{bazi.bazi.dayZhi.name}}</span></grid-item>
        <grid-item :class="bazi.bazi.monthZhi.color"><span>{{bazi.bazi.monthZhi.name}}</span></grid-item>
        <grid-item :class="bazi.bazi.yearZhi.color"><span>{{bazi.bazi.yearZhi.name}}</span></grid-item>
        <grid-item :class="dayun.zhi.color" v-if="dayun != null" style="background-color: #FAFAFA"><span>{{dayun.zhi.name}}</span></grid-item>
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
        <flexbox-item><cell title="变格:" :value="changePattern"></cell></flexbox-item>     
      </flexbox>
      <flexbox class="vux-1px-b">
        <flexbox-item class="vux-1px-r"><cell title="败格:" v-if="dayun.patternFailed !== null" :value="dayun.patternFailed"></cell><cell title="成格:" v-else :value="dayun.patternSuccess"></cell></flexbox-item>
        <flexbox-item><cell title="人元司事:" :value="bazi.renYuanOnDuty"></cell></flexbox-item>
      </flexbox>
      <!-- 进退气 -->
      <flexbox>
        <flexbox-item class="vux-1px-r"><cell title="进气:" :value="bazi.jinQi"></cell></flexbox-item>
        <flexbox-item class="vux-1px-r"><cell title="旺相:" :value="bazi.wangXiang"></cell></flexbox-item>
        <flexbox-item><cell title="退气:" :value="bazi.tuiQi"></cell></flexbox-item>
      </flexbox>
      <cell title="原局比重:" :value="wuxingScore"></cell>
      <cell title="用神(干)：" :value="ganUseGods" class="use-god"></cell>
      <cell title="用神(支)：" :value="zhiUseGods" class="use-god"></cell>
      <cell title="忌神(干)：" :value="ganFearGods" class="fear-god"></cell>
      <cell title="忌神(支)：" :value="zhiFearGods" class="fear-god"></cell>
    </group>
    <group title="--流年走势--">
       <flexbox class="vux-1px-b">
        <flexbox-item class="vux-1px-r"><cell title="开始年龄：" :value="dayun.startAge"></cell></flexbox-item>
        <flexbox-item><cell title="结束年龄：" :value="dayun.startAge + 10"></cell></flexbox-item>
      </flexbox>
      <flexbox class="vux-1px-b">
        <flexbox-item class="vux-1px-r"><cell title="开始年份：" :value="dayun.yearFlow[0].year"></cell></flexbox-item>
        <flexbox-item><cell title="结束年份：" :value="dayun.yearFlow[9].year"></cell></flexbox-item>
      </flexbox>
      
      <v-chart
        :width="chartWidth"
        :height="chartHeight"
        :data="data">
        <v-scale x :tick-count="0" />
        <v-scale y :nice="false" :min="-100" :max="100" />
        <v-point shape="line" />
        <v-tooltip />
        <v-area />
        <v-line />
      </v-chart>
    </group>
    <cell></cell>
    <cell></cell>
    <cell></cell>
  </div>
</template>
<script>
  import { XHeader, Group, Grid, GridItem, Flexbox, FlexboxItem, Cell, VChart, VLine, VArea, VTooltip, VScale, VPoint } from 'vux'
  export default {
    components: {
      XHeader,
      Group,
      Grid,
      GridItem,
      Flexbox,
      FlexboxItem,
      Cell,
      VChart,
      VLine,
      VArea,
      VTooltip,
      VScale,
      VPoint
    },
    data () {
      return {
        chartWidth: '',
        chartHeight: '',
        birth: {},
        bazi: {},
        dayun: {},
        data: [],
        wuxingScore: '',
        changePattern: '',
        ganUseGods: '',
        zhiUseGods: '',
        ganFearGods: '',
        zhiFearGods: ''
      }
    },
    methods: {
      back () {
        // console.log('back()')
        this.$router.push({name: 'Bazi', params: this.birth})
        // this.$router.back()
      },
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
      yearFlowTrend (yearFlows) {
        let d = []
        for (var i in yearFlows) {
          let item = {}
          let year = yearFlows[i].year + ''
          let length = year.length
          if (length === 4) {
            var a1 = year.charAt(0)
            var a2 = year.charAt(1)
            var a3 = year.charAt(2)
            var a4 = year.charAt(3)
            item.dayun = a1 + '   \n' + a2 + yearFlows[i].ganzhi.gan.name + '\n' + a3 + yearFlows[i].ganzhi.zhi.name + '\n' + a4 + '   '
          }
          // item.dayun = a + yearFlows[i].ganzhi.gan.name + '\n' + b + yearFlows[i].ganzhi.zhi.name
          item.value = yearFlows[i].score
          d[i] = item
        }
        this.data = d
      },
      getChangePattern (orininalPattern, dayunPattern) {
        if (dayunPattern && dayunPattern === orininalPattern) {
          this.changePattern = ''
        } else {
          this.changePattern = dayunPattern
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
      },
      getWidth () {
        let w = window.innerWidth
        if (w > 1024) {
          w = 540
        }
        this.chartWidth = w
        this.chartHeight = w * 2 / 3
      }
    },
    // beforeRouteLeave (to, from, next) {
    //   if (to.name === 'Bazi') {
    //     to.meta.keepAlive = true
    //   }
    //   next()
    // },
    created () {
      let data = this.$route.params
      this.birth = data.birth
      this.dayun = data.dayun
      this.bazi = data.bazi
      // 不显示流年
      this.bazi.currentYear = null

      this.getGanUseGods(this.dayun.useGod.useGans)
      this.getZhiUseGods(this.dayun.useGod.useZhis)
      this.getGanFearGods(this.dayun.useGod.fearGans)
      this.getZhiFearGods(this.dayun.useGod.fearZhis)

      this.getWuxingScore(this.bazi)

      this.yearFlowTrend(this.dayun.yearFlow)
      this.getChangePattern(this.bazi.originalPattern, this.dayun.pattern)
      // this.changePattern = this.dayun.pattern
      window.addEventListener('resize', this.getWidth)
      this.getWidth()
    },
    destroyed () {
      window.removeEventListener('resize', this.getWidth)
    }
  }
</script>