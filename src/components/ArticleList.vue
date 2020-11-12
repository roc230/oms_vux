<template>
  <div>
    <x-header :left-options="{showBack: false}">
      <div slot="left" @click="back"><i class="iconfont icon-angle-left"></i> 返回</div>
      <div>栏目：{{columns.name}}</div>
    </x-header>
    <group>
      <div slot="title" class="weui-cells__title">
        <i class="iconfont icon-list"></i>
        <span>&nbsp;&nbsp;文章列表：</span>
      </div>
      <cell v-for="item in articles" :key="item.id" :title="item.topic" is-link @click.native="toArticleContent(item)">
        <div slot="icon"><i class="iconfont icon-liangdian"></i>&nbsp;&nbsp;</div>
      </cell>
    </group>
  </div>
</template>
<script>
  import { XHeader, Group, Cell, Divider } from 'vux'
  import http from '@/store/http'
  export default {
    components: {
      XHeader,
      Group,
      Cell,
      Divider
    },
    data () {
      return {
        columns: {},
        articles: []
      }
    },
    methods: {
      back () {
        this.$router.replace({name: 'Learning'})
      },
      // 到文章内容界面
      toArticleContent (article) {
        this.$router.push({name: 'Article', params: {article: article, columns: this.columns, from: 'ArticleList'}})
      },
      getArticles (columnsId) {
        let url = '/cms/article/page/' + columnsId + '/release/1/20'
        http.get(url)
          .then(response => {
            if (response.code === 200) {
              let r = response.obj
              this.articles = r.content
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    created () {
      let p = this.$route.params
      this.columns = p.columns
      this.getArticles(this.columns.id)
    }
  }
</script>