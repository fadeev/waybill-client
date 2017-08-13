<template>
  <div>
    <div class="deck">
      <h1 class="padd" style="display: flex; align-items: center;">
        <router-link :to="`/product`">Товары</router-link>
      </h1>
      <div class="toolbar padd">
        <router-link :to="`/product/new`" tag="div" class="button">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18.5 15c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-7.18 4h-12.82v-24h10.189c3.163 0 9.811 7.223 9.811 9.614v3.887c-.624-.261-1.297-.422-2-.476v-2.569c0-4.106-6-2.456-6-2.456s1.518-6-2.638-6h-7.362v20h9.501c.313.749.765 1.424 1.319 2z"/></svg> 
          <div class="caption">
            Новый товар
          </div>
        </router-link>
        <router-link :to="`/product/inventory`" tag="div" class="button">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.677 17.868l-.343.195v-1.717l.343-.195v1.717zm2.823-3.325l-.342.195v1.717l.342-.195v-1.717zm3.5-7.602v11.507l-9.75 5.552-12.25-6.978v-11.507l9.767-5.515 12.233 6.941zm-13.846-3.733l9.022 5.178 1.7-.917-9.113-5.17-1.609.909zm2.846 9.68l-9-5.218v8.19l9 5.126v-8.098zm3.021-2.809l-8.819-5.217-2.044 1.167 8.86 5.138 2.003-1.088zm5.979-.943l-2 1.078v2.786l-3 1.688v-2.856l-2 1.078v8.362l7-3.985v-8.151zm-4.907 7.348l-.349.199v1.713l.349-.195v-1.717zm1.405-.8l-.344.196v1.717l.344-.196v-1.717zm.574-.327l-.343.195v1.717l.343-.195v-1.717zm.584-.333l-.35.199v1.717l.35-.199v-1.717z"/></svg>
          <div class="caption">
            Инвента&shy;ризация
          </div>
        </router-link>
        <router-link :to="`/product/pricetag`" tag="div" class="button">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16 18h-8v-1h8v1zm-2 1h-6v1h6v-1zm10-14v13h-4v6h-16v-6h-4v-13h4v-5h16v5h4zm-18 0h12v-3h-12v3zm12 10h-12v7h12v-7zm4-8h-20v9h2v-3h16v3h2v-9zm-1.5 1c-.276 0-.5.224-.5.5s.224.5.5.5.5-.224.5-.5-.224-.5-.5-.5z"/></svg>
          <div class="caption">
            Печать ценников
          </div>
        </router-link>
      </div>
      <!-- <div class="padd">
        <router-link class="cl item" to="/product/inventory" exact key="inventory">Инвентаризация</router-link>
          <router-link class="cl item" to="/product/pricetag" exact key="pricetag">Ценники</router-link> 
          <router-link class="cl item" to="/product/new" exact key="new">Новый товар</router-link> 
      </div> -->
      <product-table :id="id" :productList="productList" :selectionMode="selectionMode" @selected="selectProduct" :details="isProductRoute"></product-table>
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