<template>
  <div>
    <div class="body register">
      <div>
        <input class="search" type="text" v-model="productQuery" @input="getProductList">
        <div v-for="product in productList" class="product">
          <a href="" @click.prevent="selectProduct(product)">{{product.name}}</a>
        </div>
      </div>
      <div>
        <div class="cart">
          <div class="header">
            <div class="text">Наименование</div>
            <div class="number">Количество</div>
            <div class="number">Цена</div>
            <div class="number">Сумма</div>
          </div>
          <div v-for="product in cart">
            <div class="text">
              {{product.name}}, 
              {{product.unit == '1' ? 'кг' : 'шт.'}}
            </div>
            <div class="number">
              <div class="control"><div @click.prevent="changeQuantityDown(product)">−</div></div>
              <div class="control"><div @click.prevent="changeQuantityUp(product)">+</div></div>
              <input type="text" v-model="product.quantity">
            </div>
            <div class="number">
              {{product.sale_price}}
            </div>
            <div class="number">
              {{(product.sale_price * product.quantity).toFixed(2)}}
            </div>
          </div>
          <div>
            <div class="text"></div>
            <div class="number"></div>
            <div class="number"></div>
            <div class="number">
              {{total}}
            </div>
          </div>
        </div>
        <button>Оплатить картой</button>
        <button>Оплатить наличными</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .search { margin-bottom: 1rem; }
  .register { display: flex; justify-content: space-between; font-size: 1.5rem; }
  .register input { width: 100%; }
  .register > *:first-child { flex-basis: 30%; }
  .register > *:last-child { flex-basis: 68%; }
  .product { margin-bottom: 1rem; }
  .cart .header { color: #ccc; font-size: .7em; }
  .cart { display: flex; flex-flow: column nowrap; margin-bottom: 1rem; align-content: center; }
  .cart > * { display: flex; flex-flow: row nowrap; width: 100; align-content: center; background: white; align-items: baseline; margin-bottom: 1rem; }
  .cart > * > * { display: flex; flex-flow: row nowrap; flex-grow: 1; flex-basis: 0; min-width: 0px; padding: 0.2rem; margin-right: .5rem; align-items: baseline; }
  .cart .text { flex-grow: 3; justify-content: flex-start; }
  .number { justify-content: flex-end; }
  .number input { text-align: right; }
  .control { border: 1px solid black; border-radius: 100%; display: flex; margin: .2rem; font-weight: bold; cursor: pointer; user-select: none; margin-right: .5rem; }
  .control > * { height: 1.5rem; width: 1.5rem; display: flex; align-items: center; justify-content: center; top: 0px; }
  button { padding: .25rem .7rem; font-size: inherit; background: none; border-radius: 3px; ; border: 1px solid rgba(0,0,0,.15); }
  button:active { background: #fcfcfc; transform: scale(.99); }
</style>

<script>
  import axios from 'axios';

  export default {
    data: () => ({
      productList: [],
      cart: [],
      productQuery: null,
    }),
    computed: {
      total: function () {
        try {
          return this.cart.reduce((sum, e) => sum + e.sale_price * e.quantity, 0).toFixed(2)
        }
        catch (e) {
          return 0;
        }
      },
    },
    methods: {
      getProductList() {
        if (this.productQuery === "") return this.productList  = [];
        axios.get(`${URL}/product?search=${this.productQuery}`)
             .then(({data: {data: {product}}}) => this.productList = product)
             .catch(error => console.log(error));
      },
      selectProduct(product) {
        this.cart.push(Object.assign({quantity: 0}, product));
      },
      changeQuantityDown(product) {
        product.quantity = +(product.quantity - (product.unit == 1 ? .1 : 1)).toFixed(12)
      },
      changeQuantityUp(product) {
        product.quantity = +(product.quantity + (product.unit == 1 ? .1 : 1)).toFixed(12)
      },
    },
}
</script>