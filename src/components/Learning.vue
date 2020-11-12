<template>
  <div>
    <x-header>命理学习</x-header>
    <group title="<i class='iconfont icon-book'></i>&nbsp;&nbsp;经典书籍">
      <grid :clos="2">
        <grid-item v-for="item in books" :key="item.id" class="grid-item" @click.native="toCatalog(item)"><i class="iconfont icon-shu"></i> 《{{item.name}}》</grid-item>
      </grid>
    </group>
<!--     <group title="<i class='iconfont icon-explain'></i>&nbsp;&nbsp;命例简析 <span style='float: right;'>更多 <i class='iconfont icon-angle-right'></i></span>">
      <cell title="出生富家" is-link><div slot="icon"><i class="iconfont icon-liangdian"></i>&nbsp;&nbsp;</div></cell>
      <cell title="车祸" is-link><div slot="icon"><i class="iconfont icon-liangdian"></i>&nbsp;&nbsp;</div></cell>
      <cell title="辛苦有成命" is-link><div slot="icon"><i class="iconfont icon-liangdian"></i>&nbsp;&nbsp;</div></cell>
    </group>
    <group title="<i class='iconfont icon-training'></i>&nbsp;&nbsp;问题答疑 <span style='float: right;'>更多 <i class='iconfont icon-angle-right'></i></span>">
      <cell title="如何改运" is-link><div slot="icon"><i class="iconfont icon-liangdian"></i>&nbsp;&nbsp;</div></cell>
      <cell title="配带饰物可以改运吗" is-link><div slot="icon"><i class="iconfont icon-liangdian"></i>&nbsp;&nbsp;</div></cell>
      <cell title="八字运程是纯迷信吗" is-link><div slot="icon"><i class="iconfont icon-liangdian"></i>&nbsp;&nbsp;</div></cell>
      <cell title="推断的事情是否必然发生" is-link><div slot="icon"><i class="iconfont icon-liangdian"></i>&nbsp;&nbsp;</div></cell>
    </group> -->
    <group v-for="item in columns" :key="item.id">
      <div slot="title" class="weui-cells__title">
        <i class='iconfont icon-explain'></i>&nbsp;&nbsp;{{item.name}}
        <span style='float: right;' @click="toArticleList(item)">更多  <i class="iconfont icon-more1"></i></span>
      </div>
      <cell v-for="i in item.articles" :key="i.id" :title="i.topic" @click.native="toArticleContent(item, i)" is-link>
        <div slot="icon">
          <i class="iconfont icon-liangdian"></i>&nbsp;&nbsp;
        </div>
      </cell>
    </group>
    <divider></divider>
    <divider></divider>
    <divider></divider>
  </div>
</template>

<script>
import { XHeader, Group, Grid, GridItem, Cell, Divider } from 'vux'
import http from '@/store/http'
export default {
  components: {
    XHeader,
    Group,
    Grid,
    GridItem,
    Cell,
    Divider
  },
  data () {
    return {
      books: [],
      columns: []
    }
  },
  methods: {
    // 到文章内容界面
    toArticleContent (columns, article) {
      this.$router.push({name: 'Article', params: {article: article, columns: columns, from: 'Learning'}})
    },
    // 加指定栏目的更多文章界面
    toArticleList (columns) {
      this.$router.push({name: 'ArticleList', params: {columns: columns}})
    },
    // 获取电子书
    getTop2Book () {
      http.get('/book/top/2')
        .then(response => {
          if (response && response.code === 200) {
            this.books = response.list
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 获取栏目
    getColumns () {
      let url = '/cms/columns/page/1/10'
      http.get(url)
        .then(response => {
          if (response.code === 200) {
            let p = response.obj
            this.columns = p.content
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    toCatalog (book) {
      this.$router.push({name: 'Catalog', params: book})
    }
  },
  created () {
    this.getTop2Book()
    this.getColumns()
  }
}
</script>
<style>
  .grid-item {
    text-align: center;
    color: black;
  }
</style>