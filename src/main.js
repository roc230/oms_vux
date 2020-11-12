// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import './assets/lib/iconfont/iconfont.css'
import Home from './components/Home'
import Bazi from './components/Bazi'
import Dayun from './components/Dayun'
import Learning from './components/Learning'
import Catalog from './components/Catalog'
import Chapter from './components/Chapter'
import ArticleList from './components/ArticleList'
import Article from './components/Article'

import Personal from './components/Personal'
import NameRating from './components/NameRating'
import NameRatingResult from './components/NameRatingResult'
import Share from './components/Share'
import Marry from './components/Marry'
import ScreenShot from './components/ScreenShot'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: Home,
  meta: {
    title: '知天命',
    keepAlive: false
  }
},
{
  path: '/bazi',
  name: 'Bazi',
  component: Bazi,
  meta: {
    keepAlive: true
  }
},
{
  path: '/bazi/dayun',
  name: 'Dayun',
  component: Dayun,
  meta: {
    keepAlive: false
  }
},
{
  path: '/learning',
  name: 'Learning',
  component: Learning
},
{
  path: '/learning/book/catalog',
  name: 'Catalog',
  component: Catalog,
  meta: {
    keepAlive: true,
    isBack: false
  }
},
{
  path: '/learning/book/catalog/chapter',
  name: 'Chapter',
  component: Chapter
},
{
  path: '/learning/columns/article',
  name: 'Article',
  component: Article
},
{
  path: '/learning/columns/artile-list',
  name: 'ArticleList',
  component: ArticleList
},
{
  path: '/personal',
  name: 'Personal',
  component: Personal
},
{
  path: '/personal/namerating',
  name: 'NameRating',
  component: NameRating
},
{
  path: '/personal/name-rating-result',
  name: 'NameRatingResult',
  component: NameRatingResult
},
{
  path: '/personal/marry',
  name: 'Marry',
  component: Marry
},
{
  path: '/personal/share',
  name: 'Share',
  component: Share
},
{
  path: '/personal/screenshot',
  name: 'ScreenShot',
  component: ScreenShot
}
]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    window.document.title = to.meta.title
  }
  next()
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
