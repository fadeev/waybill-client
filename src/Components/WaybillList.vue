<template>
  <div>
    <div class="deck">
      <h1 class="padd" style="display: flex; align-items: center;">
        <router-link :to="`/waybill`">Накладные</router-link>
      </h1>
              <div class="toolbar padd">
          <router-link :to="`/waybill/new`" tag="div" class="button">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18.5 15c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-7.18 4h-12.82v-24h10.189c3.163 0 9.811 7.223 9.811 9.614v3.887c-.624-.261-1.297-.422-2-.476v-2.569c0-4.106-6-2.456-6-2.456s1.518-6-2.638-6h-7.362v20h9.501c.313.749.765 1.424 1.319 2z"/></svg> 
            <div class="caption">
              Новая накладная
            </div>
          </router-link>
        </div>
      <!-- <div v-for="(w, name) in waybillBySupplier" v-if="sup">
        <h1 class="padd" >{{name}}</h1>
        <div class="tb">
          <div @click="editWaybill(wa, $event)" :class="{item: true, selection: id == wa.waybill_id, visibility: isWaybillShown(wa.supplier_id)}" v-for="wa in w.slice(0, 3)">
            <div class="date">
              {{day_month(wa.original_date)}}
              <div class="meek">{{wa.serial_number ? `№ ${wa.serial_number}` : ''}}</div>
            </div> 
            <div>{{wa.name ? wa.name : 'н/д'}}</div>
            <div class="number" v-if="!id">
              {{(wa.cost_total || 0).toFixed(2)}}
              <span class="unit">₽</span>
            </div> 
            <div class="number" v-if="!id">
              <div :class="{green: wa.payment_amount >= wa.cost_total, red: wa.payment_amount < wa.cost_total}" v-if="!wa.return">
                {{(wa.payment_amount || 0).toFixed(2)}}
                <span class="unit">₽</span>
              </div>
              <span v-if="wa.return">возврат</span>
            </div>
          </div>
        </div>
      </div> -->
      <div class="tb">
        <div class="header">
          <div class="date">Дата</div>
          <div>
            <input type="text" v-model="supplier.name" @input="getSupplier" placeholder="Поставщик">
            <div class="list" v-if="!supplier.id && supplier.name">
              <a v-for="s in supplier_list" href="" @click.prevent="selectSupplier(s.supplier_id, s.name)">
                {{s.name}}
              </a>
            </div>
          </div>
          <div class="number" v-if="!id">Сумма</div>
          <div class="number" v-if="!id">Платежи</div>
        </div>
        <div @click="editWaybill(waybill, $event)" :class="{item: true, selection: id == waybill.waybill_id, visibility: isWaybillShown(waybill.supplier_id)}" v-for="waybill in waybillList">
          <div class="date">
            {{day_month(waybill.original_date)}}
            <div class="meek">{{waybill.serial_number ? `№ ${waybill.serial_number}` : ''}}</div>
          </div> 
          <div>{{waybill.name ? waybill.name : 'н/д'}}</div>
          <div class="number" v-if="!id">
            {{(waybill.cost_total || 0).toFixed(2)}}
            <span class="unit">₽</span>
          </div> 
          <div class="number" v-if="!id">
            <div :class="{green: waybill.payment_amount >= waybill.cost_total, red: waybill.payment_amount < waybill.cost_total}" v-if="!waybill.return">
              {{(waybill.payment_amount || 0).toFixed(2)}}
              <span class="unit">₽</span>
            </div>
            <span v-if="waybill.return">возврат</span>
          </div>
        </div>
      </div>
    </div>
    <pane v-if="id">
      <router-view></router-view>
    </pane>
  </div>
</template>

<style scoped>
  .visibility { display: none; }
  /* Nice yellow rgba(255, 250, 110, 1) */
</style>

<script>
  import axios from 'axios'
  import groupBy from 'lodash/groupBy';
  import { day_month } from '../helper.js'
  import Pane from './Pane.vue'

  export default {
    components: { Pane },
    data: () => ({
      supplier: {
        name: null,
        id: null,
      },
      supplier_list: null,
      x: null,
      y: null,
    }),
    computed: {
      waybillList() {
        return this.$store.state.waybillList
      },
      id() {
        return this.$route.params.id
      },
      waybillBySupplier() {
        return groupBy(this.$store.state.waybillList, 'name')
      },
    },
    mounted() {
      this.$store.dispatch('getWaybillList');
    },
    methods: {
      day_month: day_month,
      getSupplier(e) {
        this.supplier.id = null;
        let name = e.target.value;
        if (name === "") this.supplier_list = null
        axios.get(`${URL}/supplier?search=${name}`)
             .then(({data: {data: {supplier}}}) => this.supplier_list = supplier)
             .catch(error => console.log(error));
      },
      // getSupplier() {
      //   axios.get(`${URL}/supplier`)
      //     .then(x => console.log(x))
      //     .catch(error => console.log(error))
      // },
      selectSupplier(id, name) {
        axios.get(`${URL}/supplier/${id}`)
          .then(x => console.log(x))
        this.supplier.id = id;
        this.supplier.name = name;
        this.supplier_list = null;
      },
      newWaybill() {
        if (this.id == 'new') return this.$router.push("/waybill")
        if (this.id != 'new') return this.$router.push("/waybill/new")
      },
      editWaybill(waybill) {
        if (this.id == waybill.waybill_id) return this.$router.push("/waybill")
        if (this.id != waybill.waybill_id) return this.$router.push(`/waybill/${waybill.waybill_id}`)
      },
      isWaybillShown(id) {
        return this.supplier.id  && this.supplier.id != id
      },
    }
  }
</script>