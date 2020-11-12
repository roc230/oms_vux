// import Vue from 'vue'
// import Router from 'vue-router'
import Home from '../components/Home.vue'
import Bazi from '../components/Bazi.vue'

// Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'Home',
//       component: Home,
//       children: [
//         {
//           path: '/bazi',
//           name: 'Bazi',
//           component: Bazi
//         }
//       ]
//     }
//   ]
// })

export default [
  {
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/bazi',
    name: 'Bazi',
    component: Bazi
  }
]
