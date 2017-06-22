<template>
  <div>
    <div class="body register">
      <div>
        <div class="query">
          <input class="search" type="text" v-model="productQuery" placeholder="Поиск" @focus="productQuery = null">
          <div class="clear" @click.prevent="productQuery = null" v-if="productQuery">✖</div>
        </div>
        <div v-for="product in productList" class="product" @click.prevent="selectProduct(product)">
          {{product.name}}
        </div>
      </div>
      <div>
        <div class="cart" v-if="cart.length > 0">
          <div class="header">
            <div class="text">Наименование</div>
            <div class="number">Количество</div>
            <div class="number">Цена</div>
            <div class="number">Сумма</div>
          </div>
          <div v-for="(product, index) in cart">
            <div class="text">
              {{product.name}}, 
              {{product.unit == '1' ? 'кг' : 'шт.'}}
            </div>
            <div class="number quantity">
              <div class="control" @click.prevent="changeQuantityDown(product, index)">−</div>
              <input type="number" v-model="product.quantity">
              <div class="control" @click.prevent="changeQuantityUp(product, index)">+</div>
            </div>
            <div class="number">
              {{product.sale_price}} ₽
            </div>
            <div class="number">
              {{(product.sale_price * product.quantity).toFixed(2)}} ₽
            </div>
          </div>
          <div>
            <div class="text"></div>
            <div class="number"></div>
            <div class="number"></div>
            <div class="number">
              {{total.toLocaleString()}} ₽
            </div>
          </div>
        </div>
        <div v-if="cart.length > 0">
          <button>Оплатить картой</button>
          <button>Оплатить наличными</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .register { display: flex; justify-content: space-between; font-size: 1.5rem; }
  .register input { width: 100%; text-align: center; border: none; }
  .register input.search { line-height: 4rem; }
  .register > *:first-child { flex-basis: 30%; }
  .register > *:last-child { flex-basis: 68%; }
  .query { position: relative; margin-bottom: 1rem; display: flex; align-items: center; border: 1px solid rgba(0,0,0,.15); }
  .clear { padding: 0 1rem; }
  .clear:hover { cursor: pointer; }
  .product { margin-bottom: 1rem; border: 1px solid rgba(0,0,0,.15); padding: .6rem .3rem; border-radius: 5px; cursor: pointer; text-align: center; user-select: none; }
  .product:active { box-shadow: 0 0 0 4px rgb(14,122,254); border-color: rgba(0,0,0,0); }
  .cart .header { color: #ccc; font-size: .7em; }
  .cart { display: flex; flex-flow: column nowrap; margin-bottom: 1rem; align-content: center; }
  .cart > * { display: flex; flex-flow: row nowrap; width: 100; align-content: center; background: white; align-items: baseline; margin-bottom: 1rem; }
  .cart > * > * { display: flex; flex-flow: row nowrap; flex-grow: 1; flex-basis: 0; min-width: 0px; padding: 0.2rem; margin-right: .5rem; align-items: baseline; }
  .cart .text { flex-grow: 3; justify-content: flex-start; }
  .cart .quantity { border: 1px solid rgba(0,0,0,.15); border-radius: 5px; }
  .cart .quantity input { border: none; text-align: center; border-left: 1px solid rgba(0,0,0,.15); border-right: 1px solid rgba(0,0,0,.15) }
  .cart .quantity .control { padding: 0 .5rem; cursor: pointer; user-select: none; }
  .cart .quantity .control:active { transform: scale(.95); }
  .number { justify-content: flex-end; }
  .number input { text-align: right; }
  /*.control { border: 1px solid black; border-radius: 100%; display: flex; margin: .2rem; font-weight: bold; cursor: pointer; user-select: none; margin-right: .5rem; }
  .control > * { height: 1.5rem; width: 1.5rem; display: flex; align-items: center; justify-content: center; top: 0px; }*/
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
    watch: {
      productQuery() {
        this.getProductList();
      }
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
      changeQuantityDown(product, index) {
        let newQuantity = +(+product.quantity - (product.unit == 1 ? .1 : 1)).toFixed(12)
        if (product.quantity == 0) return this.cart.splice(index, 1);
        if (newQuantity < 0) return product.quantity = 0;
        product.quantity = newQuantity;
      },
      changeQuantityUp(product, index) {
        product.quantity = +(+product.quantity + (product.unit == 1 ? .1 : 1)).toFixed(12)
      },
    },
}
</script>