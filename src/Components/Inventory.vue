<template>
  <div>
    <pane>
      <!-- <nav-mini></nav-mini> -->
      <h1>
        Инвентаризация от
        <input type="date" v-model="date">
      </h1>
      <p v-if="selectedList.length < 1">Выберите товары из списка.</p> 
      <div class="tb" v-if="selectedList.length > 0">
        <div class="header">
          <div class="text">Наименование</div>
          <div class="number">Факт</div>
          <div class="number">Расчет</div>
        </div>
        <div v-for="(product, index) in selectedList">
          <div class="text">{{product.name}}</div>
          <div class="number nopadding">
            <input type="number" v-model.number="product.quantity">
          </div>
          <div class="number">
            {{product.stock_quantity}}
            <span class="unit">{{['кг', 'шт.'][product.unit-1]}}</span>
          </div>
          <div class="narrow">
            <a @click="product.selected = false" class="delete">✖</a>
          </div>
        </div>
      </div>
      <p><button v-if="selectedList.length > 0" @click="submitInventory(selectedList)">Создать инвентаризацию</button></p>
    </pane>
  </div>
</template>

<style scoped>
  .tb > * > * { padding-left: 0; }
</style>

<script>
  import axios from 'axios';
  import Pane from './Pane.vue';
  import NavMini from './NavMini.vue';

  export default {
    components: { Pane, NavMini },
    data: () => ({
      date: null
    }),
    computed: {
      selectedList() {
        if (this.$store.state.productList)
          return this.$store.state.productList.filter(x => x.selected)
      }
    },
    // watch: {
    //   selectedList() {
    //     if (this.selectedList.length < 1)
    //       this.$router.push("/product")
    //   }
    // },
    methods: {
      submitInventory(productList) {
        axios.post(`${URL}/inventory`, {inventory: this.selectedList, date: this.date})
             .then(_ => this.$store.dispatch('getProductList'))
             .catch(error => console.log(error))
      },
    }
  }
</script>

<!-- <template>
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
</template> -->

<!-- <style scoped>
  .table > * > *.text { flex-basis: 400px; }
  .table > * > *.number { flex-basis: 150px; }
  .search { margin-bottom: 1em; }
</style> -->

<!-- <script>
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
</script> -->