<template>
  <div>
    <div class="body">
      <h1>
        Список продаж
      </h1>
    </div>
    <div v-for="(saleListItem, month) in saleList">
      <h4 class="body">{{month}}</h4>
      <div class="table">
        <!--<div class="header">
          <div class="narrow">День</div>
          <div class="number">Сумма</div>
        </div>-->
        <div v-for="day in saleListItem">
          <div class="narrow">{{day.dd}}</div>
          <div class="number">{{day.sum}} ₽</div>
        </div>
      </div>
    </div>
    <!--<div class="body" v-for="(saleListItem, month) in saleList">
      <h2>{{month}}</h2>
      <div v-for="sale in sortBy(saleListItem, 'dd')">
        {{sale}}
      </div>
    </div>-->

    <!--<div class="table body">
      <div class="header">
        <div class="date">Дата</div>
        <div class="number">Сумма</div>
      </div>
      <div v-for="sale in saleList">
        <div class="date">{{sale.created_at_day_month}}</div>
        <div class="number">{{sale.sum}} ₽</div>
      </div>
    </div>-->
  </div>
</template>

<style scoped>
  .header { color: #ccc; align-items: center; }
  .header input { width: 100%; box-sizing: border-box; }
  .item.router-link-active, .item.router-link-active:hover { background: linear-gradient(to bottom, rgb(14,122,254), rgb(14,82,254)); color: white; text-decoration: none; }
  .item:hover { background: rgba(0,0,0,.01); cursor: pointer; }
  .table { display: flex; flex-flow: column nowrap; line-height: 1.5; }
  .table > * { padding: 0 .3rem; display: flex; flex-flow: row nowrap; min-height: 2.5rem; align-items: top; }
  .table > * > * { display: flex; flex-flow: column nowrap; flex-basis: 250px; padding: .5rem .2rem; }
  .table > * > *.number { text-align: right; flex-basis: 100px; }
  .date { flex-basis: 120px; }

  button { padding: .25rem .7rem; font-size: inherit; background: none; border-radius: 3px; ; border: 1px solid rgba(0,0,0,.15); }
  button:active { background: #fcfcfc; transform: scale(.99); }

  .changes { transform: translateY(100%); position: fixed; bottom: 0; background: #ffe77f; padding: 1rem .5rem; width: 100vw; transition: .5s transform; }
  .open { transform: translateY(0); }
  .changes button { background: white; }
</style>

<script>
  import axios from 'axios';
  import _ from 'lodash';

  export default {
    computed: {
      saleList() {
        return _.groupBy(_.sortBy(this.$store.state.saleList, ['mm', 'dd']).reverse(), 'tmm')
      }
    },
    mounted() {
      this.$store.dispatch('getSaleList')
    },
    methods: {
      sortBy(array, key) {
        return _.sortBy(array, key).reverse()
      }
    },
  }
</script>