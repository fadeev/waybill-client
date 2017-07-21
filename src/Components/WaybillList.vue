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
          <div class="text date">Дата</div>
          <div class="text">Поставщик</div>
          <div class="number">Сумма</div>
          <div class="number">Оплачено</div>
          <!-- <div class="narrow"></div> -->
        </div>
        <router-link class="item" :to="`/waybill/${waybill.waybill_id}`" v-for="waybill in waybillList" tag="div" :key="waybill.waybill_id">
          <div class="text date">
            <div>
              {{waybill.original_date_day_month}}
              <br>
              <div class="serial">{{waybill.serial_number ? `№ ${waybill.serial_number}` : ''}}</div>
            </div>
          </div>
          <div class="text">
            {{waybill.name ? waybill.name : 'н/д'}}</a>
          </div>
          <div class="number">
            <strong>{{waybill.cost_total}} ₽</strong>
          </div>
          <div class="number">
            <div :class="{green: waybill.payment_amount >= waybill.cost_total, red: waybill.payment_amount < waybill.cost_total}" v-if="!waybill.return">
              {{waybill.payment_amount || 0}} ₽
            </div>
            <span v-if="waybill.return">возврат</span>
            <!-- <svg v-if="waybill.return" style="padding: 0 10px" fill="#ccc" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M17.026 22.957c10.957-11.421-2.326-20.865-10.384-13.309l2.464 2.352h-9.106v-8.947l2.232 2.229c14.794-13.203 31.51 7.051 14.794 17.675z"/></svg> -->
          </div>
          <!-- <div class="narrow">
            <svg v-if="waybill.return" style="padding: 0 10px" fill="#ccc" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M17.026 22.957c10.957-11.421-2.326-20.865-10.384-13.309l2.464 2.352h-9.106v-8.947l2.232 2.229c14.794-13.203 31.51 7.051 14.794 17.675z"/></svg>
          </div> -->
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
  .table > * { padding: 0 .3rem; }
  .table > * > * { flex-basis: 150px; padding: .5rem .2rem; }
  .table .narrow { flex-basis: 80px; }
  .table .number { flex-basis: 100px; }
  .table .date { flex-basis: 120px; }
  .table .serial { font-size:.75rem; color: #ccc; }
  .green { color: #4ec63d; }
  .red { color: red; }
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
    methods: {
      test() {console.log('test')}
    }
  }
</script>