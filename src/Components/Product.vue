<template>
  <div>
    <h1><input type="text" v-model="product.name" placeholder="Наименование"></h1>
    <div class="options">
      <div>Ед. измерения</div>
      <select v-model="product.unit" @input="product.changed = true">
        <option value="1">кг</option>
        <option value="2">шт.</option>
      </select>
    </div>
    <div class="options">
      <div>Составной</div>
      <div><input type="checkbox" v-model="hasContent"></div>
    </div> 
    <div class="tb" v-if="hasContent">
      <div class="header">
        <div class="text">Наименование</div>
        <div class="number nopadding">Количество</div>
      </div>
      <div v-for="(c, index) in content">
        <div class="text">{{c.name}}</div>
        <div class="number nopadding">
          <input type="number" v-model="c.quantity">
        </div>
        <div>
          <a class="delete" href="" @click.prevent="content.splice(index, 1)" tabindex="-1">✖</a>
        </div>
      </div>
      <div>
        <div class="text"><product-search @selected="addContent"></product-search></div>
      </div>
    </div>
    <p>
      <button @click="submitProduct">Сохранить товар</button>
      <button @click="deleteProduct" class="delete">Удалить товар</button>
    </p>
    <div v-if="eventList && eventList.length > 0">
      <h1>События</h1>
      <div class="tb">
        <div class="header">
          <div class="date">Дата</div>
          <div class="number">Количество</div>
          <div class="text">Основание</div>
        </div>
        <div v-for="event in sortByDate(eventList)">
          <div class="date">
            {{day_month(event.original_date || event.created_at)}}
          </div>
          <div class="number">
            <span v-if="event.shipment_id && !event.return">+</span>
            <span v-if="event.return">-</span>
            <span v-if="event.inventory_id">=</span>
            {{event.quantity}}
          </div>
          <div class="text">
            <router-link :to="`/waybill/${event.waybill_id}`" v-if="event.shipment_id">Накладная № {{event.serial_number}}</router-link>
            <span v-if="event.inventory_id">Инвентаризация</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  h1 input { width: 500px; }
  .options { display: flex; margin: 1rem 0; align-items: baseline; }
  .options *:first-child { flex-basis: 15%; }

  .tb > * > * { padding-left: 0; }
</style>

<script>
  import axios from 'axios';
  import { day_month } from '../helper.js'
  import sortBy from 'lodash/sortBy'
  import isArray from 'lodash/isArray'
  import concat from 'lodash/concat'
  import ProductSearch from './ProductSearch.vue'

  export default {
    props: ['id'],
    components: { ProductSearch },
    data: () => ({
      product: {
        name: null,
        unit: null,
      },
      eventList: null,
      hasContent: null,
      content: null,
    }),
    mounted() {
      this.getProductById(this.id)
    },
    watch: {
      id() {
        this.getProductById(this.id)
      },
      hasContent() {
        if (!this.hasContent) this.content = [];
      },
      content() {
        if (this.content && this.content.length > 0)
          this.hasContent = true
      },
    },
    methods: {
      day_month: day_month,
      resetFields() {
        Object.assign(this.$data, this.$options.data());
      },
      getProductById(id) {
        if (this.id === 'new') return this.resetFields();
        axios.get(`${URL}/product/${id}`)
             .then(({data: {data: {product, shipment, inventory, content}}}) => {
               this.resetFields();
               this.product = Object.assign(this.product, product);
               this.content = content;
               this.hasContent = content && content.length > 0;
               this.eventList = concat(
                 isArray(inventory) ? inventory : [],
                 isArray(shipment) ? shipment : []
               );
             })
             .catch(error => this.resetFields());
      },
      submitProduct() {
        let prod = this.product;
        prod.content = this.content || [];
        axios.post(`${URL}/product`, {product: prod})
          .then(({data: {data: {product: {product_id}}}}) => {
            this.$store.dispatch('getProductList')
            this.$router.push(`/product/${product_id}`)
          })
          .catch(error => console.log(error))
      },
      deleteProduct() {
        axios.delete(`${URL}/product/${this.id}`)
          .then(({data}) => {
            this.$store.dispatch('getProductList')
            this.$router.push('/product')
          })
          .catch(error => console.log(error))
      },
      sortByDate(array) {
        return sortBy(array, 'original_date').reverse()
      },
      addContent(item) {
        if (!this.content) this.content = [];
        this.content.push(item);
      }
    },
  }
</script>