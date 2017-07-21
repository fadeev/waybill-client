<template>
  <div>
    <div class="deck">
      <div>
        <h1>Список накладных</h1>
        <div class="tb">
          <div v-for="waybill in waybillList">
            <!-- <div>{{waybill.original_date_day_month}}</div> -->
            <!-- <div>{{waybill.serial_number ? `№ ${waybill.serial_number}` : ''}}</div> -->
            <div class="date">
              {{waybill.original_date_day_month}}
              <div class="meek">{{waybill.serial_number ? `№ ${waybill.serial_number}` : ''}}</div>
            </div> 
            <div>{{waybill.name ? waybill.name : 'н/д'}}</div>
            <div class="number" v-if="!id">
              <strong>{{waybill.cost_total || 0}} ₽</strong>
            </div> 
            <div class="number" v-if="!id">
              <div v-if="!waybill.return">
                {{waybill.payment_amount || 0}} ₽
              </div>
              <span v-if="waybill.return">возврат</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="pane"><router-view></router-view></div> -->
    <pane><router-view></router-view></pane>
  </div>
</template>

<style scoped>
  .deck { display: flex; }

  .tb { display: flex; flex-direction: column;  }
  .tb > * { display: flex; flex-direction: row; flex-grow: 0; margin-bottom: 10px; }
  .tb > * > * { width: 200px; }
  .tb .date { width: 120px; }
  .tb .number { width: 100px; text-align: right; }

  .pane { position: absolute; height: 100vh; top: 30px; left: 320px; right: 0; overflow-y: scroll; }

  .meek { font-size: .75em; color: #ccc; }
</style>

<nope>
  <div>
    <div>
      <div class="body">
      </div>
      <div class="layout">
        <div>
          <h1 class="space">Список накладных</h1>
          <p class="space">
            <router-link to="/waybill/new">Создать новую накладную</router-link>
          </p>
          <div class="tablenew">
            <div class="header">
              <div class="text date">Дата</div>
              <div class="text">Поставщик</div>
              <div class="number" v-if="!id">Сумма</div> 
              <div class="number" v-if="!id">Оплачено</div>
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
                {{waybill.name ? waybill.name : 'н/д'}}
              </div>
              <div class="number" v-if="waybill.waybill_id != id">
                <strong>{{waybill.cost_total || 0}} ₽</strong>
              </div> 
              <div class="number" v-if="waybill.waybill_id != id">
                <div :class="{green: waybill.payment_amount >= waybill.cost_total, red: waybill.payment_amount < waybill.cost_total}" v-if="!waybill.return">
                  {{waybill.payment_amount || 0}} ₽
                </div>
                <span v-if="waybill.return">возврат</span>
                <!-- <svg v-if="waybill.return" style="padding: 0 10px" fill="#ccc" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M17.026 22.957c10.957-11.421-2.326-20.865-10.384-13.309l2.464 2.352h-9.106v-8.947l2.232 2.229c14.794-13.203 31.51 7.051 14.794 17.675z"/></svg> -->
              </div>
              <!-- <div class="narrow">
                <svg v-if="waybill.return" style="padding: 0 10px" fill="#ccc" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M17.026 22.957c10.957-11.421-2.326-20.865-10.384-13.309l2.464 2.352h-9.106v-8.947l2.232 2.229c14.794-13.203 31.51 7.051 14.794 17.675z"/></svg>
              </div> -->
              <!-- <div class="waybill" style="position: absolute; width: 50%; margin-left: 400px;" v-if="waybill.waybill_id == id"><router-view></router-view></div> -->
            </router-link>
          </div>
        </div>
        <!-- <div style="flex-grow: 1;">
          <div style="padding: 0 20px;">
            <router-view></router-view>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</nope>

<nope scoped>
  .space { margin-left: .7rem; }

  .tablenew { display: flex; flex-direction: column; line-height: 1.3em; margin-left: .4rem; }
  .tablenew > * { display: flex; flex-direction: row; padding: .2rem .3rem; }
  .tablenew > * > * { width: 200px; padding-bottom: .2rem; }
  .tablenew .date { width: 120px; }
  .tablenew .number { width: 100px; text-align: right; }
  .tablenew .serial { font-size:.75rem; color: #ccc; }

  .header { color: #ccc; align-items: center; }
  .header input { width: 100%; box-sizing: border-box; } 
  /* .item.router-link-active, .item.router-link-active:hover { border-radius: 2px; background: linear-gradient(to bottom, rgb(14,122,254), rgb(14,82,254)); color: white; text-decoration: none; }  */
  /* .item.router-link-active .serial { color: white; } */
  .item:hover { background: rgba(0,0,0,.01); cursor: pointer; }
  .table { flex-grow: 0; }
  .table > * { padding: 0 .3rem; }
  
  .waybill { color: black; background: white; }

  /* .table > * > * { flex-basis: 150px; padding: .5rem .2rem; } */
  /* .table .narrow { flex-basis: 80px; }
  .table .number { flex-basis: 100px; } */
  /* .table .text.date { width: 120px; }
  .table .text { width: 200px; } */
  .table .serial { font-size:.75rem; color: #ccc; }
  .green { color: #4ec63d; }
  .red { color: red; }
</nope>

<script>
  import axios from 'axios'
  import Pane from './Pane.vue'

  export default {
    components: { Pane },
    computed: {
      waybillList() {
        return this.$store.state.waybillList
      },
      id() {
        return this.$route.params.id
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