<template>
  <div>
    <x-header>分享好友</x-header>
    <divider></divider>
    <div style="text-align: center;">
      <qrcode value="http://www.kanbazi.site" type="img" fg-color="#008080"></qrcode>
      <span>扫描二维码，了解运程</span>
    </div>
  </div>
</template>
<script>
  import { XHeader, Qrcode, Divider } from 'vux'
  export default {
    components: {
      XHeader,
      Qrcode,
      Divider
    }
  }
</script>