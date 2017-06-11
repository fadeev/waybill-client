<template>
  <div v-if="waybill">
    <h1>Waybill Edit Component! {{id}}</h1>
    <p>{{waybill}}</p>
    <div v-if="waybill">
      <p>
        Serial:
        <input type="text" v-model="waybill.serial_number">
      </p>
      <p>
        Date:
        <input type="date" :value="waybill.original_date" @input="setOriginalDate">
      </p>
      <p>
        Supplier:
        <input type="text" v-model="waybill.supplier_id">
        <input type="text" v-model="waybill.supplier" @input="getSupplier">
        <div v-if="!waybill.supplier_id && waybill.supplier" v-for="supplier in waybill.supplier_list">
          <a href="" @click.prevent="selectSupplier(supplier.supplier_id, supplier.name)">{{supplier.name}}</a>
        </div>
      </p>
    </div>
    <p>
      <button @click='submitWaybill(waybill)'>Save</button>
    </p>
  </div>
</template>

<script>
  import axios from 'axios';
  import merge from 'lodash/merge';

  export default {
    props: ['id'],
    data: () => ({
      waybill: {
        waybill_id: null,
        serial_number: null,
        original_date: null,
        supplier_name: null,
        supplier_id: null,
        supplie_list: null,
      },
    }),
    mounted() {
      this.getWaybillById(this.id)
    },
    watch: {
      id() {
        this.getWaybillById(this.id)
      }
    },
    methods: {
      getSupplier(e) {
        this.waybill.supplier_id = null;
        let name = e.target.value;
        axios.get(`${URL}/supplier?search=${name}`)
             .then(({data}) => this.waybill.supplier_list = data.data.supplier)
             .catch(error => console.log(error));
      },
      selectSupplier(id, name) {
        this.waybill.supplier_id = id;
        this.waybill.supplier_name = name;
      },
      resetFields() {
        Object.assign(this.$data, this.$options.data());
      },
      getWaybillById(id) {
        if (this.id === 'new') return this.resetFields();
        axios.get(`${URL}/waybill/${id}`)
             .then(({data}) => {
               this.resetFields();
               merge(this.waybill, data.data.waybill)
              })
             .catch(error => this.resetFields());
      },
      submitWaybill(waybill) {
        this.$store.dispatch('submitWaybill', {waybill, router: this.$router})
      },
      setOriginalDate(e) {
        let date = e.target.value
        this.waybill.original_date = (date === "" ? null : date)
      },
    },
  }
</script>