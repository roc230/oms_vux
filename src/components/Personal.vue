<template>
  
  <div>
    <x-header>个人中心</x-header>
    <group>
      <cell title="起名" is-link link="/personal/namerating">
        <i slot="icon" class="iconfont icon-sheji">&nbsp;&nbsp;</i>
      </cell>
      <cell title="合婚" is-link link="/personal/marry">
        <i slot="icon" class="iconfont icon-user-group">&nbsp;&nbsp;</i>
      </cell>
      <cell title="健康" is-link>
        <i slot="icon" class="iconfont icon-jiankang">&nbsp;&nbsp;</i>
      </cell>
      <cell title="姻缘" is-link>
        <i slot="icon" class="iconfont icon-aiqing">&nbsp;&nbsp;</i>
      </cell>
      <cell title="大运" is-link>
        <i slot="icon" class="iconfont icon-chart-line">&nbsp;&nbsp;</i>
      </cell>
      <cell title="流年" is-link>
        <i slot="icon" class="iconfont icon-chart-area">&nbsp;&nbsp;</i>
      </cell>
      <cell title="分享给好友" is-link link="/personal/share">
        <i slot="icon" class="iconfont icon-share">&nbsp;&nbsp;</i>
      </cell>
    </group>
    <divider></divider>
    <div style="text-align: center;">个人中心功能研发中...</div>
  </div>

</template>
<script>
  import { XHeader, Group, Cell, Divider } from 'vux'
  export default {
    components: {
      XHeader,
      Group,
      Cell,
      Divider
    }
  }
</script>