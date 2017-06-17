<template>
  <div>
    <h1>Список накладных</h1>
    <p>
      <router-link to="/waybill/new">Новая накладная</router-link>
    </p>
    <div class="table">
      <div class="header">
        <div class="narrow">Номер</div>
        <!--<div class="number narrow">Дата</div>
        <div>Поставщик</div>
        <div class="number">Номер</div>
        <div class="number">Сумма</div>
        <div>Возврат</div>-->
      </div>
      <router-link v-for="waybill in waybills" :to="`/waybill/${waybill.waybill_id}`" :key="waybill.waybill_id">
        <!--<div><router-link :to="`/waybill/${waybill.waybill_id}`">1</router-link></div>-->
        <!--<div class="number">{{waybill.original_date}}</div>
        <div><router-link :to="`/`" exact>{{waybill.name}}</router-link></div>
        <div class="number">{{waybill.serial_number}}</div>
        <div class="number">{{waybill.cost_total}}</div>
        <div>{{waybill.return ? 'Возврат' : ''}}</div>-->
      </router-link>
    </div>
    <router-view></router-view>
    <!--<p v-for="waybill in waybills">
      <router-link :to="`/waybill/${waybill.waybill_id}`">
        {{waybill}}
      </router-link>
      <button v-on:click="deleteWaybillById(waybill.waybill_id)">Delete</button>
    </p>-->
  </div>
</template>

<style scoped>
  .router-link-active { background: rgb(14,122,254); color: white; text-decoration: none; }
</style>

<script>
  import Pane from './Pane.vue';

  export default {
    components: { Pane },
    computed: {
      waybills() {
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