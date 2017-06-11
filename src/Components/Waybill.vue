<template>
  <div>
    <h1>Waybill Component!</h1>
    <p>
      <router-link to="/waybill/new">New waybill</router-link>
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
  export default {
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