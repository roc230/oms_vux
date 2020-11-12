<template>
  <div id="main">
    <x-header :left-options="{showBack: false}">
      <div slot="left" @click="back"><i class="iconfont icon-angle-left"></i>返回</div>
      <div>八字</div>
    </x-header>
    <box gap="0px">
      <x-progress :percent="percent" :show-cancel="false"></x-progress>
    </box>
    <group title="--生辰--">
      <cell title="姓名:" :value="birth.name"></cell>
      <cell title="性别:" :value="birth.sex"></cell>
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
    <!-- 大运 -->
    <group title="--大运--">
      <cell title="起运周岁:" style="background-color: #F2F2F2;">{{bazi.yunStartAge.year}}岁{{bazi.yunStartAge.month}}个月{{bazi.yunStartAge.day}}天{{bazi.yunStartAge.hour}}小时</cell>
      <grid :cols="8" class="dayun-grid-item">
        <div v-for="(item, i) in bazi.dayuns">
          <grid-item>
            <span>{{item.startAge}}</span>
          </grid-item>
        </div>
      </grid>
      <cell title="起运阳历时间:" v-model="bazi.yunStartSolarTime" style="background-color: #F2F2F2;"></cell>
      <!-- 大运列表 -->
      <grid class="dayun-grid-item">
        <div v-for="(item, i) in bazi.dayuns">
          <grid-item>
            <span style="color: black;">{{item.startYear}}</span>
          </grid-item>
        </div>
      </grid>
      <grid class="dayun-grid-item">
        <div v-for="(item, i) in bazi.dayuns">
          <grid-item>
            <div @click="toDayun(i)">
              <i class="iconfont icon-icon-view"></i>
              <br />
              <span :class="item.gan.color">{{item.gan.name}}</span>
              <br/>
              <span :class="item.zhi.color">{{item.zhi.name}}</span>
            </div>
          </grid-item>
        </div>
      </grid>
    </group>

    <group title="--大运走势--">
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
    <group title="原局评语：">
      <cell-box>{{bazi.originalComment}}</cell-box>
    </group>
    <group title="手机版排盘工具  &nbsp;&nbsp;&nbsp;&nbsp;  <span style='color:red;'>http://www.kanbazi.site</span><br/>截图下载支持的浏览器：Safari浏览器、Chrome浏览器">
      <x-button type="primary" @click.native="toSave"><i class="iconfont icon--downloading"></i> 本页截图下载</x-button>
    </group>
    <cell></cell>
    <cell></cell>
    <cell></cell>
  </div>
</template>
<script>
  import { XHeader, Grid, XButton, GridItem, Cell, Group, XAddress, ChinaAddressV4Data, Datetime, VChart, VLine, VArea, VTooltip, VScale, VPoint, XProgress, Box, Flexbox, FlexboxItem, CellBox } from 'vux'
  import http from '@/store/http'
  import html2canvas from 'html2canvas'
  export default {
    components: {
      XHeader,
      Grid,
      GridItem,
      Cell,
      Group,
      XAddress,
      ChinaAddressV4Data,
      Datetime,
      VChart,
      VLine,
      VArea,
      VPoint,
      VTooltip,
      VScale,
      XProgress,
      Box,
      Flexbox,
      FlexboxItem,
      XButton,
      CellBox
    },
    data () {
      return {
        chartWidth: '',
        chartHeight: '',
        msg: 'bazi',
        birth: {},
        bazi: {},
        // useGods: '',
        // fearGods: '',
        ganUseGods: '',
        zhiUseGods: '',
        ganFearGods: '',
        zhiFearGods: '',
        addressData: ChinaAddressV4Data,
        wuxingScore: '',
        data: [],
        percent: 10
      }
    },
    methods: {
      back () {
        this.$router.replace('/')
      },
      toDayun (index) {
        let data = {}
        data.birth = this.birth
        data.dayun = this.bazi.dayuns[index]
        data.bazi = this.bazi
        this.$router.push({name: 'Dayun', params: data})
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
      dayunTrend (dayuns) {
        let d = []
        for (var i in dayuns) {
          let item = {}
          item.dayun = dayuns[i].gan.name + '\n' + dayuns[i].zhi.name
          item.value = dayuns[i].score
          d[i] = item
        }
        this.data = d
      },
      getBazi (form) {
        this.percent = 20
        if (form.sex != null && form.strSolarBirthDay != null) {
          if (form.addr) {
            form.province = form.addr[0]
            form.city = form.addr[1]
            form.district = form.addr[2]
          }
          this.percent = 30
          http.get('/birth/bazi', form)
          .then(response => {
            this.percent = 40
            if (response.code === 200) {
              this.percnet = 90
              this.bazi = response.obj
              // this.getUseGods(response.obj.useGod.useGods)
              // this.getFearGods(response.obj.useGod.fearGods)
              this.getGanUseGods(response.obj.useGod.useGans)
              this.getZhiUseGods(response.obj.useGod.useZhis)
              this.getGanFearGods(response.obj.useGod.fearGans)
              this.getZhiFearGods(response.obj.useGod.fearZhis)
              this.getWuxingScore(this.bazi)
              this.dayunTrend(this.bazi.dayuns)
              this.percent = 0
            }
          })
          .catch(error => {
            console.log(error)
          })
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
      toSave () {
        html2canvas(document.body)
          .then(canvas => {
            let saveUrl = canvas.toDataURL('image/png')
            let aLink = document.createElement('a')
            let blob = this.base64ToBlob(saveUrl)
            let evt = document.createEvent('HTMLEvents')
            evt.initEvent('click', true, true)
            // 下载后的文件命名
            aLink.download = '八字排盘.png'
            let href = window.URL.createObjectURL(blob)
            aLink.href = href
            // document.body.appendChild(aLink)
            aLink.click()
            document.body.removeChild(aLink)
            window.URL.removeObjectURL(href)
          })
      },
      // 这里把图片转base64
      base64ToBlob (code) {
        let parts = code.split(';base64,')
        let contentType = parts[0].split(':')[1]
        let raw = window.atob(parts[1])
        let rawLength = raw.length
        let uInt8Array = new Uint8Array(rawLength)
        for (let i = 0; i < rawLength; ++i) {
          uInt8Array[i] = raw.charCodeAt(i)
        }
        return new Blob([uInt8Array], {type: contentType})
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
    beforeRouteLeave (to, from, next) {
      if (to.name === 'Dayun') {
        from.meta.keepAlive = true
      } else {
        from.meta.keepAlive = false
      }
      next()
    },
    created () {
      window.addEventListener('resize', this.getWidth)
      this.getWidth()
      this.birth = this.$route.params
      this.getBazi(this.birth)
    },
    destroyed () {
      window.removeEventListener('resize', this.getWidth)
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