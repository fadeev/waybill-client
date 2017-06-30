<template>
  <div>
    <div :class="{changes: true, open: productListChanged}">
      Были внесены изменения о {{productList && productList.filter(x => x.changed).length}} ед. товаров
      <button @click.prevent="submitProductList">Сохранить изменения</button>
    </div>
    <div class="body">
      <h1>Список товаров</h1>
      <!--{{productList}}-->
    </div>
    <div class="table body" v-if="productList">
      <div class="header">
        <div class="narrow"></div>
        <div class="text">
          Наименование
        </div>
        <div class="number">Ед. измерения</div>
        <div class="number">Цена продажи</div>
      </div>
      <div v-for="product in productList" :key="product.product_id">
        <div class="narrow">
          <input type="checkbox" :checked="product.changed" disabled>
        </div>
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
            {{product.sale_price ? `${product.sale_price} ₽` : ''}}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .table { display: flex; flex-flow: column nowrap; line-height: 1.5; }
  .table > * { display: flex; flex-flow: row nowrap; min-height: 2.5rem; align-items: baseline; }
  .table > * > * { display: flex; flex-basis: 250px; padding: .2rem .2rem; align-items: baseline; }
  .table > * > *.text { flex-basis: 400px; }
  /*.table > * > *.text > * { margin-right: 1rem; }*/
  .table > * > *.text input { flex-basis: 100%; }
  .table > * > *.number { flex-basis: 150px; text-align: right; justify-content: flex-end; }
  .table .header { color: #ccc; }
  .narrow { flex-basis: 20px; }
  .changed { border: 1px solid #ffe77f; }

  button { padding: .25rem .7rem; font-size: inherit; background: none; border-radius: 3px; ; border: 1px solid rgba(0,0,0,.15); }
  button:active { background: #fcfcfc; transform: scale(.99); }

  .changes { transform: translateY(100%); position: fixed; bottom: 0; background: #ffe77f; padding: 1rem .5rem; width: 100vw; transition: .5s transform; }
  .open { transform: translateY(0); }
  .changes button { background: white; }
</style>

<script>
  import axios from 'axios';
  import forEach from 'lodash/forEach';

  export default {
    // data: () => ({
    //   productList: null,
    // }),
    mounted() {
      this.$store.dispatch('getProductList')
      // this.productList = this.$store.state.productList;
      // this.$store.dispatch('getProductList')
      //     .then(data => this.productList = data)
      // this.getProductList();
    },
    computed: {
      productList() {
        return this.$store.state.productList;
      },
      productListChanged() {
        if (this.productList)
          return this.productList.filter(x => x.changed).length
      }
    },
    methods: {
      // getProductList() {
      //   axios.get(`${URL}/product`)
      //        .then(({data: {data: {product}}}) => {
      //          this.productList = product.map(p => { p.changed = null; return p })
      //        })
      // },
      change(product) {
        product.changed = true;
      },
      submitProductList() {
        this.$store.dispatch('postProductList', {productList: this.productList})
        // axios.all(
        //   this.productList
        //     .filter(p => p.changed)
        //     .map(p => axios.post(`${URL}/product`, {product: p})))
        //   .then(x => this.$store.dispatch('getProductList'))
        //   .catch(x => x)
      },
    },
  }
</script>