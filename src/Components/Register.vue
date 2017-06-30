<template>
  <div>
    <div class="layout">
      <div>
        <div>
          <input class="search" type="text" v-model="productQuery" placeholder="Поиск" @focus="productQuery = null">
          <!--<div class="clear" @click.prevent="productQuery = null" v-if="productQuery">✖</div>-->
        </div>
        <div class="product" v-for="product in productList" @click.prevent="selectProduct(product)">
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
          <!--<div>
            <div class="text"></div>
            <div class="number"></div>
            <div class="number"></div>
            <div class="number">
              {{total.toLocaleString()}} ₽
            </div>
          </div>-->
        </div>
      </div>
    </div>
    <div class="actions" v-if="cart.length > 0">
      <div></div>
      <div class="right">
        <div>
          <button @click.prevent="postSale">Оплатить картой</button>
          <button @click.prevent="postSale">Оплатить наличными</button>
          <span class="total">
            {{total.toLocaleString()}} ₽
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .layout { display: flex; justify-content: space-between; font-size: 1.5rem; position: absolute; top: 0; width: 100vw; min-height: 100%; }
  .layout input { width: 100%; text-align: center; border: none; border-bottom: 1px solid #ccc; }
  .layout input.search { line-height: 4rem; }
  .layout > * { padding-bottom: 4rem; }
  .layout > *:first-child { flex-basis: 30%; border-right: 1px solid #ccc; }
  .layout > *:last-child { flex-basis: 70%; }
  .actions { display: flex; justify-content: space-between; position: fixed; width: 100vw; font-size: 1.5rem; bottom: 0; }
  .actions > *:first-child { flex-basis: 30%; border-right: 1px solid #ccc; }
  .actions > *:last-child { flex-basis: 70%; }
  .actions .right { background: white; line-height: 4rem; border-top: 1px solid #ccc; }
  .actions .right > * { padding: .3rem 2rem; display: flex; align-items: center; }
  /*.layout > *:last-child { flex-basis: 70%; display: flex; flex-flow: column nowrap; justify-content: space-between; }
  .actions { background: #ffe77f; padding: 1rem 2rem; display: flex; align-items: center; justify-content: flex-start; }*/
  .actions .total { margin-left: auto; margin-right: .5rem; }
  .left { border-right: 1px solid #ccc; padding-right: 1rem; }
  .query { position: relative; margin: 1rem 0; display: flex; align-items: center; border: 1px solid rgba(0,0,0,.15); }
  .clear { padding: 0 1rem; }
  .clear:hover { cursor: pointer; }
  .product { border-bottom: 1px solid rgba(0,0,0,.15); padding: 1.5rem 1rem; cursor: pointer; user-select: none; }
  .cart { display: flex; flex-flow: column nowrap; align-content: center; padding: 1rem 2rem; }
  .cart .header { color: #ccc; font-size: .7em; }
  .cart > * { display: flex; flex-flow: row nowrap; width: 100; align-content: center; background: white; align-items: baseline; margin-bottom: 1rem; }
  .cart > * > * { display: flex; flex-flow: row nowrap; flex-grow: 1; flex-basis: 0; min-width: 0px; padding: 0.2rem; margin-right: .5rem; align-items: baseline; }
  .cart .text { flex-grow: 3; justify-content: flex-start; }
  .cart .quantity { border: 1px solid rgba(0,0,0,.15); border-radius: 5px; }
  .cart .quantity input { border: none; text-align: center; border-left: 1px solid rgba(0,0,0,.15); border-right: 1px solid rgba(0,0,0,.15) }
  .cart .quantity .control { padding: 0 .5rem; cursor: pointer; user-select: none; }
  .cart .quantity .control:active { transform: scale(.95); }
  .number { justify-content: flex-end; }
  .number input { text-align: right; }
  /*.actions { padding: 1rem 0; display: flex; justify-content: flex-end; align-items: center; position: absolute; bottom: 0;  }*/
  /*.control { border: 1px solid black; border-radius: 100%; display: flex; margin: .2rem; font-weight: bold; cursor: pointer; user-select: none; margin-right: .5rem; }
  .control > * { height: 1.5rem; width: 1.5rem; display: flex; align-items: center; justify-content: center; top: 0px; }*/
  /*button { margin-right: 1rem; padding: .75rem 1rem; font-size: 1rem; background: rgba(255, 255, 255, .5); color: rgba(0,0,0,.7); border-radius: 3px; ; border: 1px solid rgba(0,0,0,.15); }*/
  button { margin-right: 1rem; padding: .75rem 1rem; font-size: 1rem; background: rgba(255, 231, 127, .5); color: rgb(94, 85, 47); border-radius: 3px; ; border: 1px solid rgba(0,0,0,.15); }
  button:active { transform: scale(.99); }
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
        this.cart.unshift(Object.assign({quantity: 0}, product));
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
      postSale() {
        axios.post(`${URL}/sale`, {sale_item: this.cart})
             .then(({data}) => Object.assign(this.$data, this.$options.data()))
             .catch(error => console.log(error))
      },
    },
}
</script>