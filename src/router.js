/**
 * Created by Mili on 2017/8/14.
 */

import Vue from 'vue'
import Router from 'vue-router'
import Hello from './views/Hello'
import Clip from './views/Clip'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/clip',
      name: 'Clip',
      component: Clip
    }
  ]
})
