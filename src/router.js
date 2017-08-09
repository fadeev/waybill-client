import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './Components/App.vue'
import WaybillList from './Components/WaybillList.vue'
import ProductList from './Components/ProductList.vue'
import Product from './Components/Product.vue'
import ProductEdit from './Components/ProductEdit.vue'
import SaleList from './Components/SaleList.vue'
import WaybillEdit from './Components/WaybillEdit.vue'
import Waybill from './Components/Waybill.vue'
import Register from './Components/Register.vue'
import SaleDate from './Components/SaleDate.vue'
import Inventory from './Components/Inventory.vue'
import Pricetag from './Components/Pricetag.vue'
import Payment from './Components/Payment.vue'
import Home from './Components/Home.vue'
import Index from './Components/Index.vue'

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index,
    },
    {
      path: '/waybill',
      component: WaybillList,
      name: 'waybill',
      children: [
        { path: ':id', component: Waybill, props: true },
      ],
    },
    {
      path: '/product',
      component: ProductList,
      name: 'product',
      children: [
        { path: 'inventory', component: Inventory, props: true },
        { path: 'pricetag', component: Pricetag, props: true },
        { path: ':id', component: ProductEdit, props: true },
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
      redirect: '/sale/date',
    },
    {
      path: '/sale/date',
      component: SaleList,
      children: [
        { path: ':date', component: SaleDate, props: true },
      ],
    },
  ]
})