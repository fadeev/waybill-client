<template>
  <div>
    <div>
      <div class="body">
        <h1>Список накладных</h1>
        <p>
          <router-link to="/waybill/new">Создать новую накладную</router-link>
        </p>
      </div>
      <div class="table">
        <div class="header">
          <div class="date">Дата</div>
          <div>Поставщик</div>
          <div class="number">Сумма</div>
        </div>
        <router-link class="item" :to="`/waybill/${waybill.waybill_id}`" v-for="waybill in waybillList" tag="div" :key="waybill.waybill_id">
          <div class="date">
            {{waybill.original_date_day_month}}
            <div class="serial">{{waybill.serial_number ? `№ ${waybill.serial_number}` : ''}}</div>
          </div>
          <div>
            {{waybill.name ? waybill.name : 'н/д'}}
          </div>
          <div class="number">
            <strong>{{waybill.cost_total}} ₽</strong>
          </div>
        </router-link>
      </div>
    </div>
    <router-view></router-view>
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
  /*.table { display: flex; flex-flow: column nowrap; flex: 1 1 auto; margin-bottom: 1rem; align-content: center; }
  .table > * { display: flex; flex-flow: row nowrap; width: 100; align-content: center; background: white; }
  .table > * > * { display: flex; flex-flow: row nowrap; flex-grow: 1; flex-basis: 0; min-width: 0px; padding: 0.2rem; justify-content: center; align-items: center; }*/
  /*.body { margin: 0 .5rem; }
  .header { color: #ccc; align-items: center; }
  .header input { width: 100%; box-sizing: border-box; }
  .item.router-link-active, .item.router-link-active:hover { background: rgb(14,82,254); color: white; text-decoration: none; }
  .item:hover { background: rgba(0,0,0,.01); cursor: pointer; }
  .table { display: flex; flex-flow: column nowrap; line-height: 1.5; }
  .table > * { display: flex; flex-flow: row nowrap; border-bottom: 1px solid #eee; min-height: 2rem; align-items: top; }
  .table > * > * { flex-basis: 150px; padding: .5rem .2rem; }
  .table > * > *.number { text-align: right; }
  /*.table { display: flex; flex-flow: column nowrap; flex: 1 1 auto; margin-bottom: 1rem; align-content: center; }
  .table > * { display: flex; flex-flow: row nowrap; width: 100; align-content: center; background: white; }
  .table > * > * { display: flex; flex-flow: row nowrap; flex-grow: 1; flex-basis: 0; min-width: 0px; padding: 0.2rem; justify-content: center; align-items: center; }*/
  .meek { color: #ccc; }
  .serial { font-size:.75rem; color: #ccc; }
</style>

<script>
  import axios from 'axios'
  import Pane from './Pane.vue'

  export default {
    components: { Pane },
    computed: {
      waybillList() {
        return this.$store.state.waybillList
      }
    },
    mounted() {
      this.$store.dispatch('getWaybillList');
    },
  }
</script>