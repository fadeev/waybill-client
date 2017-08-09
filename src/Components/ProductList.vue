<template>
  <div>
    <div class="deck">
      <div>
        <h1 class="padd">
          <router-link :to="`/product`">Товары</router-link>
        </h1> 
        <!-- <div class="padd">
          <router-link class="cl item" to="/product/inventory" exact key="inventory">Инвентаризация</router-link>
           <router-link class="cl item" to="/product/pricetag" exact key="pricetag">Ценники</router-link> 
           <router-link class="cl item" to="/product/new" exact key="new">Новый товар</router-link> 
        </div> -->
        <product-table :id="id" :productList="productList" :selectionMode="selectionMode" @selected="selectProduct" :details="isProductRoute"></product-table>
      </div>
    </div>
    <!-- <pane style="position: absolute" v-if="isProductRoute">
      <nav-mini></nav-mini>
    </pane> -->
    <router-view></router-view>
  </div>
</template>

<style scoped>
  .tb > * > * { padding-left: 0; }
  .tb .narrow { text-align: center; width: 50px; }
</style>

<script>
  import forEach from 'lodash/forEach';
  import Inventory from './Inventory.vue';
  import Pane from './Pane.vue';
  import NavMini from './NavMini.vue';
  import ProductTable from './ProductTable.vue';
  import axios from 'axios';

  export default {
    components: {Pane, ProductTable, Inventory, NavMini},
    data: () => ({
      search: null,
      selectionMode: null,
    }),
    mounted() {
      this.$store.dispatch('getProductList')
    },
    computed: {
      id() {
        return this.$route.params.id
      },
      productList() {
        return this.$store.state.productList;
      },
      selectedList() {
        if (this.productList)
          return this.productList.filter(x => x.selected)
      },
      isProductRoute() {
        return this.$route.name == 'product'
      },
    },
    methods: {
      submitProductList() {
        this.$store.dispatch('postProductList', {productList: this.productList})
      },
      selectProduct(product) {
        this.selectedList.push(Object.assign({quantity: null}, product))
      },
      toggleSelectionMode() {
        if (this.selectionMode)
          this.selectedList = [];
        this.selectionMode = !this.selectionMode;
        this.$router.push('/product');
      },
    },
  }
</script>