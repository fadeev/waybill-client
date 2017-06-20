<template>
  <div>
    <div class="changes" v-if="productList && productList.filter(x => x.changed).length > 0">
      Были внесены изменения о {{productList.filter(x => x.changed).length}} ед. товаров
      <button @click.prevent="submitProductList">Сохранить изменения</button>
    </div>
    <div class="body">
      <h1>Список товаров</h1>
      <!--{{productList}}-->
    </div>
    <div class="table" v-if="productList">
      <div class="header">
        <div class="text">Наименование</div>
        <div class="number">Ед. измерения</div>
        <div class="number">Цена продажи</div>
      </div>
      <div v-for="product in productList" :class="{changed: product.changed}" :key="product.product_id">
        <div class="text">
          <input type="text" v-model="product.name" @input="change(product)">
        </div>
        <div class="number">
          <select v-model="product.unit" @input="change(product)">
            <option value="1">кг</option>
            <option value="2">шт.</option>
          </select>
        </div>
        <div class="number">
          <router-link :to="`/waybill/${product.waybill_id}`">
            {{product.sale_price}}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .table { display: flex; flex-flow: column nowrap; flex: 1 1 auto; margin-bottom: 1rem; align-content: center; }
  .table > * { display: flex; flex-flow: row nowrap; width: 100; align-content: center; background: white; padding: 0 .5rem; }
  .table > * > * { display: flex; flex-flow: row nowrap; flex-grow: 1; flex-basis: 0; min-width: 0px; padding: 0.2rem; justify-content: center; align-items: center; }
  .table > * > *:first-child { padding-left: 0; }
  .table .header { color: #ccc; }
  .table .text { flex-grow: 4; justify-content: flex-start; }
  .table .number { justify-content: flex-end; }
  .table .number input { text-align: right; }
  .table .actions { flex-grow: .2; }
  .table .actions a { text-decoration: none; }
  .table input, .table select { width: 100%; }

  .changed { background: yellow; }

  button { padding: .25rem .7rem; font-size: inherit; background: none; border-radius: 3px; ; border: 1px solid rgba(0,0,0,.15); }
  button:active { background: #fcfcfc; transform: scale(.99); }

  .changes { position: fixed; bottom: 0; background: yellow; padding: 1rem .5rem; width: 100vw; animation: .2s slideUp; }
  .changes button { background: white; }

  @keyframes slideUp {
    from { transform: translateY(100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
</style>

<script>
  import axios from 'axios';
  import forEach from 'lodash/forEach';

  export default {
    data: () => ({
      productList: null,
      x: 1,
    }),
    mounted() {
      axios.get(`${URL}/product`)
           .then(({data: {data: {product}}}) => this.productList = product.map(p => { p.changed = null; return p }) )
    },
    methods: {
      change(product) {
        product.changed = true;
      },
      submitProductList() {
        for (let product of this.productList) {
          if (product.changed) {
            axios.post(`${URL}/product`, {product: product})
                 .then(x => { product.changed = false; console.log(this.productList) })
                 .catch(error => console.log(error))
          }
        }
      },
    },
  }
</script>