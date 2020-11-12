<template>
  <div>
    <x-header :left-options="{showBack: false}">
      <div slot="left" @click="back"><i class="iconfont icon-angle-left"></i> 返回</div>
      <div>章节</div>
    </x-header>
    <grid :cols="1">
      <grid-item class="grid-item"><div>《{{chapter.title}}》</div></grid-item>
    </grid>
    <group title="内容">
     <p v-html="chapter.content" class="wrapper"></p>
<!--       <p v-for="item in paragraphs" v-html="item.content" :key="item.id" style="margin-top: 10px; margin-left: 14px; margin-right: 10px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.content}}</p> -->
    </group>
    <divider></divider>
    <divider></divider>
    <divider></divider>
  </div>
</template>
<script>
  import { XHeader, Grid, GridItem, Divider, Group } from 'vux'
  import http from '@/store/http'
  export default {
    components: {
      XHeader,
      Grid,
      GridItem,
      Divider,
      Group
    },
    data () {
      return {
        chapter: {},
        book: {},
        paragraphs: []
      }
    },
    methods: {
      back () {
        this.$router.replace({name: 'Catalog', params: this.book})
      },
      getChapter (chapterId) {
        let url = '/book/chapter/page/' + chapterId
        http.get(url)
          .then(response => {
            if (response && response.code === 200) {
              this.paragraphs = response.list
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    created () {
      let p = this.$route.params
      this.chapter = p.chapter
      this.book = p.book
      // this.getChapter(this.chapter.id)
    }
  }
</script>
<style>
  .wrapper {
    padding: 12px;
    white-space: pre-wrap;
  }
</style>