import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './Components/App.vue'
import Waybill from './Components/Waybill.vue'
import WaybillEdit from './Components/WaybillEdit.vue'
import Home from './Components/Home.vue'

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    {
      path: '/waybill',
      component: Waybill,
      children: [
        { path: ':id', component: WaybillEdit, props: true },
      ]
    },
  ]
})