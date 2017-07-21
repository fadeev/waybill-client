<template>
  <div>
    <div class="body">
      <h1>
        Список продаж
      </h1>
    </div>
    <div v-for="(saleListItem, month) in saleList">
      <div class="table">
        <div>
          <div class="text">{{month}}</div>
        </div>
        <router-link v-for="day in saleListItem" :to="`/sale/`" tag="div">
          <div class="narrow text">{{day.dd}}</div>
          <div class="number">{{day.sum}} ₽</div>
        </router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped>
  .table > * { padding: 0 .3rem; align-items: flex-start; }
  .table > * > * { flex-basis: 250px; flex-grow: 0; padding: 0 .2rem; }
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
      },
      test() {
        console.log(123)
      },
    },
  }
</script>