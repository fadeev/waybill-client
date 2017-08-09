import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    waybillList: [],
    productList: [],
    saleList: [],
    revenueList: [],
  },
  mutations: {
    getWaybillList(state, waybillList) {
      state.waybillList = waybillList;
    },
    getProductList(state, productList) {
      state.productList = productList;
    },
    getSaleList(state, saleList) {
      state.saleList = saleList
    },
    getRevenueList(state, revenueList) {
      state.revenueList = revenueList
    },
  },
  actions: {
    getWaybillList({commit}) {
      axios.get(`${URL}/waybill`)
           .then(({data: {data: {waybill}}}) => commit('getWaybillList', waybill));
    },
    postWaybill({dispatch, commit}, {waybill, shipment, router}) {
      return new Promise((resolve, reject) => {
        axios.post(`${URL}/waybill`, { waybill, shipment })
             .then(({data}) => {
               let id = data.data.waybill.waybill_id
               dispatch('getWaybillList')
               router.push(`/waybill/${id}`)
               resolve(data)
             })
             .catch((error) => reject(error))
      })
    },
    deleteWaybillById({dispatch, commit}, {id, router}) {
      axios.delete(`${URL}/waybill/${id}`)
           .then(({data}) => {
             router.push('/waybill')
             dispatch('getWaybillList')
           })
    },
    getProductList({commit}) {
        axios.get(`${URL}/product`)
             .then(({data: {data: {product}}}) => {
               commit('getProductList', product.map(p => { p.selected = false; p.quantity = null; return p }))
             })
    },
    postProductList({dispatch, commit}, {productList}) {
        axios.all(
          productList
            .filter(p => p.changed)
            .map(p => axios.post(`${URL}/product`, {product: p})))
          .then(x => dispatch('getProductList'))
          .catch(x => x)
    },
    getSaleList({commit}) {
      axios
        .get(`${URL}/sale`)
        .then(({data: {data: {sale}}}) => commit('getSaleList', sale))
    },
    getRevenueList({commit}) {
      axios
        .get(`${URL}/revenue`)
        .then(({data: {data: {revenue}}}) => commit('getRevenueList', revenue))
    },
  }
})