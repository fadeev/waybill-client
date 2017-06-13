import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    waybills: []
  },
  mutations: {
    fetchWaybills(state, waybills) {
      state.waybills = waybills;
    },
  },
  actions: {
    fetchWaybills({commit}) {
      axios.get(`${URL}/waybill`)
           .then(({data}) => commit('fetchWaybills', data.data.waybill));
    },
    submitWaybill({dispatch, commit}, {waybill, shipment, router}) {
      return new Promise((resolve, reject) => {
        axios.post(`${URL}/waybill`, { waybill, shipment })
             .then(({data}) => {
               let id = data.data.waybill.waybill_id
               dispatch('fetchWaybills')
               router.push(`/waybill/${id}`)
               resolve(data)
             })
             .catch((error) => reject(error))
      })
    },
    // submitWaybill({dispatch, commit}, {waybill, shipment, router}) {
    //   axios.post(`${URL}/waybill`, { waybill, shipment })
    //        .then(({data}) => {
    //          let id = data.data.waybill.waybill_id
    //          dispatch('fetchWaybills')
    //          router.push(`/waybill/${id}`)
    //        })
    //        .catch(() => console.log('some error'))
    // },
    deleteWaybillById({dispatch, commit}, {id, router}) {
      axios.delete(`${URL}/waybill/${id}`)
           .then(({data}) => {
             router.push('/waybill')
             dispatch('fetchWaybills')
           })
    }
  }
})