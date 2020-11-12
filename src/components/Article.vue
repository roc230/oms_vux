<template>
  <div>
    <x-header :left-options="{showBack: false}">
      <div slot="left" @click="back"><i class="iconfont icon-angle-left"></i> 返回</div>
      <div>栏目：{{columns.name}}</div>
    </x-header>
    <grid :cols="1">
      <grid-item class="grid-item"><div>《{{article.topic}}》</div></grid-item>
    </grid>
    <group title="内容">
     <p v-html="article.content" class="wrapper"></p>
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
        article: {},
        columns: {},
        from: ''
      }
    },
    methods: {
      back () {
        if (this.from === 'ArticleList') {
          this.$router.replace({name: 'ArticleList', params: {columns: this.columns}})
        } else {
          this.$router.replace({name: 'Learning'})
        }
      },
      articleBrowseAddOne () {
        http.post('/cms/article/browse/count/add/' + this.article.id)
          .then(response => {
            if (response.code === 200) {
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    created () {
      let p = this.$route.params
      this.article = p.article
      this.columns = p.columns
      this.from = p.from
      this.articleBrowseAddOne()
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