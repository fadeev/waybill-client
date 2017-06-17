<template>
  <div>
    <div class="body">
      <h1>Список накладных</h1>
      <p>
        <router-link to="/waybill/new">Создать новую накладную</router-link>
      </p>
      <div class="table">
        <div class="header">
          <div>Поставщик</div>
          <div>Дата и номер</div>
          <!--<div>Номер</div>-->
          <div class="number">Сумма</div>
          <div></div>
        </div>
        <router-link class="item" :to="`/waybill/${waybill.waybill_id}`" v-for="waybill in waybillList" tag="div">
          <div>{{waybill.name}}</div>
          <div>
            {{waybill.original_date ? `${waybill.original_date}` : ''}}
            <br>
            {{waybill.serial_number ? `№ ${waybill.serial_number}` : ''}}
          </div>
            <!--<div :class="{meek: !waybill.original_date}">{{waybill.original_date ? `${waybill.original_date}` : 'Дата не указана'}}</div>-->
            <!--{{waybill.original_date ? `от ${waybill.original_date}` : ''}}
            {{waybill.name ? `Поставщик: ${waybill.name}` : ''}}
            {{waybill.cost_total ? `Сумма: ${waybill.cost_total}` : ''}}-->
          <!--<div>{{waybill.serial_number}}</div>-->
          <div class="number">{{waybill.cost_total}}</div>
          <div>{{waybill.return ? 'Возврат' : ''}}</div>
        </router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped>
  .body { margin: 0 .5rem; }
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
</style>

<script>
  import Pane from './Pane.vue';

  export default {
    components: { Pane },
    computed: {
      waybillList() {
        return this.$store.state.waybills
      }
    },
    mounted() {
      this.$store.dispatch('fetchWaybills');
    },
    methods: {
    },
  }
</script>