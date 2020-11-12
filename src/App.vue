<template>
  <div id="app" :style="width">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <tabbar :style="tabbarStyle">
      <tabbar-item link="/">
        <span slot="label"><i class="iconfont icon-home"></i> 首页</span>
      </tabbar-item>
      <tabbar-item link="/learning">
        <span slot="label"><i class="iconfont icon-studying"></i> 命理学习</span>
      </tabbar-item>
      <tabbar-item link="/personal">
      <span slot="label"><i class="iconfont icon-account"></i> 个人中心</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>
<script>
import { Tabbar, TabbarItem } from 'vux'
export default {
  components: {
    Tabbar,
    TabbarItem
  },
  name: 'app',
  data () {
    return {
      width: '',
      tabbarStyle: ''
    }
  },
  methods: {
    // 根据设备显示屏幕宽度设置界面总宽度（用于pc浏览器不需求拉伸显示）
    getWidth () {
      let w = window.innerWidth
      if (w > 1024) {
        w = 540
      }
      this.width = 'width: ' + w + 'px; margin: 0 auto;'
      this.tabbarStyle = 'width: ' + w + 'px; position: fixed;'
    }
  },
  created () {
    window.addEventListener('resize', this.getWidth)
    this.getWidth()
  },
  destroyed () {
    window.removeEventListener('resize', this.getWidth)
  },
  mounted () {
    // 友盟统计
    const script = document.createElement('script')
    script.src = 'https://v1.cnzz.com/z_stat.php?id=1279206973&web_id=1279206973'
    script.language = 'JavaScript'
    document.body.appendChild(script)
  },
  watch: {
    '$route' () {
      if (window._czc) {
        let location = window.location
        let contentUrl = location.pathname + location.hash
        let refererUrl = '/'
        window._czc.push(['_trackPageView', contentUrl, refererUrl])
      }
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
</style>
