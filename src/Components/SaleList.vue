<template>
  <div>
    <div class="deck">
      <h1 class="padd">
        <router-link :to="`/sale/date`">Выручка</router-link>
      </h1>
      <div v-for="(revenueItem, month) in revenueList">
        <div class="tb">
          <div class="header">
            <div class="date">{{month}}</div>
            <div class="number" style="width:200px">Выручка</div>
          </div>
          <div v-for="day in revenueItem" :class="{'item': true, 'selection': date == day.yyyymmdd}" @click="selectSale(day)" tag="div">
            <div class="date">{{day.dd}}</div>
            <div class="number" style="width:200px">
              {{day.sum.toFixed(2)}}
              <span class="unit">₽</span>
            </div>
          </div>
        </div>
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
      revenueList() {
        return _.groupBy(_.sortBy(this.$store.state.revenueList, ['mm', 'dd']).reverse(), 'tmm')
      },
      date() {
        return this.$route.params.date
      },
    },
    mounted() {
      this.$store.dispatch('getRevenueList')
    },
    methods: {
      sortBy(array, key) {
        return _.sortBy(array, key).reverse()
      },
      selectSale(sale) {
        this.$router.push(`/sale/date/${sale.yyyymmdd}`)
      }
    },
  }
</script>