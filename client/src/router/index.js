import Vue from 'vue'

//import { Carousel3d, Slide } from 'vue-carousel-3d';
//import ElementUI from 'element-ui'
import Router from 'vue-router'
import Splash from '@/pages/Splash'
import Login from '@/pages/Login'

import Browse from '@/pages/Browse'


Vue.use(Router)
//Vue.use(Carousel3d)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Splash',
      component: Splash
    },{
      path: '/login',
      name: 'Login',
      component: Login
    },{
      path: '/browse',
      name: 'Browse',
      component: Browse
    }
  ]
})
