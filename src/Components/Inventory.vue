<template>
  <div>
    <div class="body">
      <h1>Инвентаризация</h1>
      <div class="table" v-if="list.length > 0">
        <div class="header">
          <div class="text">Наименование</div>
          <div class="number">Количество</div>
          <div class="number">Цена продажи</div>
          <div class="narrow"></div>
        </div>
        <div v-for="(product, index) in list" :key="product.product_id">
          <div class="text">
            <input type="text" v-model="product.name">
          </div>
          <div class="number">
            <input type="number" v-model.number="product.quantity">
          </div>
          <div class="number">
            <input type="number" v-model.number="product.sale_price">
          </div>
          <div class="narrow">
            <a class="delete" href="" @click.prevent="list.splice(index, 1)" tabindex="-1">✖</a>
          </div>
        </div>
      </div>
      <product-search class="search" @selected="pushProduct"></product-search>
      <div><button @click.prevent="submit">Сохранить</button></div>
    </div>
  </div>
</template>

<style scoped>
  .table > * > *.text { flex-basis: 400px; }
  .table > * > *.number { flex-basis: 150px; }
  .search { margin-bottom: 1em; }
</style>

<script>
  import axios from 'axios';
  import ProductSearch from './ProductSearch.vue';

  export default {
    components: { ProductSearch },
    data: () => ({
      list: [],
    }),
    methods: {
      pushProduct(product) {
        this.list.push(product)
      },
      submit() {
        axios.post(`${URL}/inventory`, {inventory: this.list})
             .then(_ => console.log('ok'))
             .catch(error => console.log(error))
      },
    },
  }
</script>