import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './Components/App.vue'
import WaybillList from './Components/WaybillList.vue'
import ProductList from './Components/ProductList.vue'
import WaybillEdit from './Components/WaybillEdit.vue'
import Home from './Components/Home.vue'

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    {
      path: '/waybill',
      component: WaybillList,
      children: [
        { path: ':id', component: WaybillEdit, props: true },
      ]
    },
    {
      path: '/product',
      component: ProductList,
    },
  ]
})