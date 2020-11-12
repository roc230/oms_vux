<template>
  <myscroller lock-x @on-scroll-bottom="scrollBottomHandler" ref="scrollBottom" :scroll-bottom-offset="200" height="-30">
    <div>
      <x-header>电子书</x-header>
      <grid :cols="1">
        <grid-item class="grid-item"><div>《{{book.name}}》</div></grid-item>
      </grid>
      <group title="目录">
        <cell v-for="item in chapters" :key="item.id" :title="item.title" is-link  @click.native="toChapter(item)">
          <div slot="icon"><i class="iconfont icon-liangdian"></i>&nbsp;&nbsp;</div>
        </cell>
      </group>
<!--       <divider></divider>
      <divider></divider>
      <divider></divider> -->
      <load-more :show-loading="true" :tip="loadTip" background-color="#fbf9fe"></load-more>
    </div>
  </myscroller>
</template>
<script>
  import { XHeader, Grid, GridItem, Group, Cell, Divider, Scroller, LoadMore } from 'vux'
  import myscroller from '@/components/myscroller'
  import http from '@/store/http'
  export default {
    components: {
      XHeader,
      Grid,
      GridItem,
      Group,
      Cell,
      Divider,
      Scroller,
      LoadMore,
      myscroller
    },
    data () {
      return {
        book: {},
        chapters: [],
        page: {
          pageNo: 1,
          pageSize: 10,
          totalPages: 1
        },
        loadTip: '上拉加载更多'
      }
    },
    methods: {
      scrollBottomHandler () {
        if (this.onFetching) {

        } else {
          this.onFetching = true
          setTimeout(() => {
            if (this.page.pageNo < this.page.totalPages) {
              this.page.pageNo += 1
              this.$nextTick(() => {
                this.$refs.scrollBottom.reset()
              })
              this.getBookById()
            }
          }, 500)
        }
      },
      getBookById () {
        let url = '/book/chapter/page/' + this.book.id + '/' + this.page.pageNo + '/' + this.page.pageSize
        http.get(url)
          .then(response => {
            if (response && response.code === 200) {
              this.chapters = this.chapters.concat(response.obj.content)
              this.page.pageNo = response.obj.pageNo
              this.page.pageSize = response.obj.pageSize
              this.page.totalPages = response.obj.totalPages
              if (response.obj.pageNo === response.obj.totalPages) {
                this.loadTip = '暂无数据'
                this.$refs.scrollBottom.disablePullup()
              } else {
                this.loadTip = '加载更多'
              }
              this.onFetching = false
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      toChapter (chapter) {
        this.$router.push({name: 'Chapter', params: {chapter: chapter, book: this.book}})
      }
    },
    // beforeRouteEnter (to, from, next) {
    //   if (from.name === 'Chapter') {
    //     to.meta.isBack = true
    //   } else {
    //     to.meta.isBack = false
    //   }
    //   next()
    // },
    beforeRouteLeave (to, from, next) {
      if (to.name === 'Chapter') {
        from.meta.keepAlive = true
      } else {
        from.meta.keepAlive = false
      }
      next()
    },
    // activated () {
    //   if (!this.$route.meta.isBack) {

    //   }
    //   this.$route.meta.isBack = false
    // },
    mounted () {
      this.$refs.scrollBottom.enablePullup()
    },
    created () {
      this.book = this.$route.params
      this.getBookById()
    }
  }
</script>
<style>
  .wrapper {
    padding-left: 12px;
    padding-right: 12px;
    white-space: pre-wrap;
  }
  p {
    margin-bottom: 8px;
  }
</style>