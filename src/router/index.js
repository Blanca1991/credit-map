import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/Home'
import ShopInfo from '@/page/ShopInfo'
import Appraise from '@/page/Appraise'
import BMap from '@/page/BMap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
          title:'商铺列表'
      }
    },
    {
      path: '/ShopInfo',
      name: 'ShopInfo',
      component: ShopInfo,
      meta: {
          title:'商铺详情'
      }
    },
    {
      path: '/Appraise',
      name: 'Appraise',
      component: Appraise,
      meta: {
          title:'商铺评价'
      }
    },
    {
      path: '/BMap',
      name: 'BMap',
      component: BMap,
      meta: {
          title:'信用地图'
      }
    },

  ]
})
