import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    waybillList: [],
  },
  mutations: {
    getWaybillList(state, waybillList) {
      state.waybillList = waybillList;
    },
  },
  actions: {
    getWaybillList({commit}) {
      axios.get(`${URL}/waybill`)
           .then(({data}) => commit('getWaybillList', data.data.waybill));
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
  }
})