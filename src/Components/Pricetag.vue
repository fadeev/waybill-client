<template>
  <div>
    <pane>
      <!-- <nav-mini></nav-mini> -->
      <h1>Печать ценников</h1>
      <p v-if="selectedList.length < 1">Выберите товары из списка.</p> 
      <div class="pricetagList print">
        <div v-for="product in selectedList" class="pricetag">
          <div>{{product.name}}</div>
          <div class="unit">1 {{['кг', 'шт.'][product.unit-1]}}</div>
          <div class="price">{{product.sale_price}} ₽</div>
        </div>
      </div>
    </pane>
  </div>
</template>

<style scoped>
  .pricetagList { display: flex; flex-wrap: wrap; }
  .pricetag { display: inline-block; position: relative; width: 140px; height: 180px; border: 1px solid rgba(0,0,0,.3); margin: 0 20px 20px 0; padding: 20px; }
  .pricetag .unit { position: absolute; bottom: 60px; }
  .pricetag .price { position: absolute; bottom: 10px; font-size: 2em; }
</style>

<script>
  import Pane from './Pane.vue';
  import NavMini from './NavMini.vue';

  export default {
    components: { Pane, NavMini },
    computed: {
      selectedList() {
        return this.$store.state.productList.filter(x => x.selected)
      }
    },
  }
</script>