<template>
  <div>
    <h1>Список накладных</h1>
    <p>
      <router-link to="/waybill/new">Новая накладная</router-link>
    </p>
    <p v-for="waybill in waybills">
      <router-link :to="`/waybill/${waybill.waybill_id}`">
        {{waybill}}
      </router-link>
      <button v-on:click="deleteWaybillById(waybill.waybill_id)">Delete</button>
    </p>
    <router-view></router-view>
  </div>
</template>

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
      deleteWaybillById(id) {
        this.$store.dispatch('deleteWaybillById', {id: id, router: this.$router})
      }
    },
  }
</script>