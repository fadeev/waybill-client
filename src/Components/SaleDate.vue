<template>
  <div>
    <pane>
      <h1>Список продаж</h1>
      <div class="tb">
        <div class="header">
          <div class="text">Дата</div>
          <div class="number">Сумма</div>
          <div class="number">Количество</div>
        </div>
        <template v-for="sale in saleList">
          <div class="item" @click="sale.details = !sale.details">
            <div class="text">{{time(sale.created_at)}}</div>
            <div class="number">
              <span v-if="sale.sum">{{sale.sum.toFixed(2)}}</span>
              <span class="unit">₽</span>
            </div>
          </div>
          <div v-for="product in sale.sale_item" v-if="sale.details" :class="{details: sale.details}">
            <div class="text">{{product.name}}</div>
            <div class="number">
              {{(product.quantity * product.sale_price).toFixed(2)}}
              <span class="unit">₽</span>
            </div>
            <div class="number">
              {{product.quantity}}
              <span class="unit">{{['кг', 'шт.'][product.unit-1]}}</span>
            </div>
          </div>
        </template>
      </div>
    </pane>
  </div>
</template>

<style scoped>
  .tb > * > * { padding-left: 0; }
  .details { color: rgba(0,0,0,.3); }
</style>

<script>
  import axios from 'axios'
  import Pane from './Pane.vue'

  export default {
    components: { Pane },
    props: ['date'],
    data: () => ({
      saleList: null,
    }),
    mounted() {
      this.getSaleByDate(this.date)
    },
    watch: {
      date() {
        this.getSaleByDate(this.date)
      },
    },
    methods: {
      getSaleByDate(date) {
        axios.get(`${URL}/sale?date=${date}`)
          .then(({data: {data: {sale}}}) => this.saleList = sale.map(s => { s.details = false; return s}))
          .catch(error => console.log(error))
      },
      time(date) {
        return date.match(/\d\d:\d\d:\d\d/)[0]
      },
    },
  }
</script>