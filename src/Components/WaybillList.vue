<template>
  <div>
    <div class="deck">
      <div>
        <h1 class="padd">
          <router-link :to="`/waybill`">Накладные</router-link>
        </h1>
        <!-- <h1 class="padd">Жуйков</h1> -->
        <!-- <div>
          <div class="tb">
            <div class="header">
              <div class="date"></div>
              <div></div>
              <div class="number">Сумма</div>
              <div class="number"></div>
            </div>
            <div>
              <div class="date"></div>
              <div></div>
              <div class="number"></div>
              <div class="number"></div>
            </div>
          </div>
        </div> -->
        <!-- <p><a @click="newWaybill" :class="{toggle: true, selection: id == 'new'}">Создать новую накладную</a></p> -->
        <div class="tb">
          <div class="header">
            <div class="date">Дата</div>
            <div>
              <!-- <input type="text" placeholder="Поставщик"> -->
              <input type="text" v-model="supplier.name" @input="getSupplier" placeholder="Поставщик">
              <div class="list" v-if="!supplier.id && supplier.name">
                <a v-for="s in supplier_list" href="" @click.prevent="selectSupplier(s.supplier_id, s.name)">
                  {{s.name}}
                </a>
              </div>
              <!-- <div v-if="!waybill.supplier_id && waybill.supplier_name" class="list">
                <a v-for="supplier in waybill.supplier_list" href="" @click.prevent="selectSupplier(supplier.supplier_id, supplier.name)">
                  {{supplier.name}}
                </a>
                <a href="" @click.prevent="submitSupplier(waybill.supplier_name)">Создать поставщика "{{waybill.supplier_name}}"</a>          
              </div> -->
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
    </div>
    <pane v-if="id">
      <router-view></router-view>
    </pane>
  </div>
</template>

<style scoped>
  .visibility { display: none; }
</style>

<script>
  import axios from 'axios'
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