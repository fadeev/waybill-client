import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import router from './router'
import store from './store'

import App from './Components/App.vue'

new Vue({
 el: '#app',
  router,
  store,
  render: h => h(App)
});
