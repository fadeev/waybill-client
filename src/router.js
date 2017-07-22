import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './Components/App.vue'
import WaybillList from './Components/WaybillList.vue'
import ProductList from './Components/ProductList.vue'
import Product from './Components/Product.vue'
import SaleList from './Components/SaleList.vue'
import WaybillEdit from './Components/WaybillEdit.vue'
import Waybill from './Components/Waybill.vue'
import Register from './Components/Register.vue'
import Sale from './Components/Sale.vue'
import Inventory from './Components/Inventory.vue'
import Payment from './Components/Payment.vue'
import Home from './Components/Home.vue'

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', redirect: "/waybill" },
    {
      path: '/waybill',
      component: WaybillList,
      children: [
        { path: ':id', component: Waybill, props: true },
      ],
    },
    {
      path: '/product',
      component: ProductList,
      children: [
        { path: ':id', component: Product, props: true },
      ],
    },
    {
      path: '/inventory',
      component: Inventory,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/payment',
      name: 'payment',
      component: Payment,
    },
    {
      path: '/sale',
      component: SaleList,
      children: [
        { path: ':id', component: Sale, props: true },
      ],
    },
  ]
})