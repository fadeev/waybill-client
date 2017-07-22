<template>
  <div>
    <div class="deck">
      <div>
        <h1 class="padd">Список товаров</h1>
        <div class="tb">
          <router-link class="item" :to="`/product/${product.product_id}`" tag="div" v-for="product in productList">
            <div class="text">
              {{product.name}}
            </div>
            <div class="number" v-if="!id">
              {{product.stock_quantity}}
            </div>
            <div class="number" v-if="!id">
              {{product.sale_price}}
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <pane v-if="id">
      <router-view></router-view>
    </pane>
  </div>
</template>

<style scoped>
  .deck { display: flex; padding: 0 5px; }

  .padd { padding: 0 5px; }

  .tb { display: flex; flex-direction: column;  }
  .tb > * { display: flex; flex-direction: row; flex-grow: 0; }
  .tb > * > * { width: 200px; padding: 10px 5px; }
  .tb .text { width: 330px; }
  .tb .date { width: 120px; }
  .tb .number { width: 100px; text-align: right; }

  .item { cursor: pointer; }
  .router-link-active, .router-link-active:hover { border-radius: 2px; background: linear-gradient(to bottom, rgb(14,122,254), rgb(14,82,254)); color: white; text-decoration: none; }  
</style>

<script>
  import forEach from 'lodash/forEach';
  import Pane from './Pane.vue';

  export default {
    components: {Pane},
    data: () => ({
      search: null,
    }),
    mounted() {
      this.$store.dispatch('getProductList')
    },
    watch: {
      search(e) {
        forEach(this.productList, (x) => {
          x.hidden = x.name.match(new RegExp(this.search, 'i')) ? false : true
        })
      }
    },
    computed: {
      id() {
        return this.$route.params.id
      },
      productList() {
        return this.$store.state.productList;
      },
      productListChanged() {
        if (this.productList)
          return this.productList.filter(x => x.changed).length
      }
    },
    methods: {
      submitProductList() {
        this.$store.dispatch('postProductList', {productList: this.productList})
      },
    },
  }
</script>

<nope>
  <div>
    <div :class="{changes: true, open: productListChanged}">
      <div>
        Были внесены изменения о {{productListChanged}} ед. товаров
        <button @click.prevent="submitProductList">Сохранить изменения</button>
      </div>
    </div>
    <div class="body">
      <h1>Список товаров</h1>
    </div>
    <div class="table body" v-if="productList.length > 0">
      <div class="header">
        <div class="narrow">
          <!-- <input type="checkbox"> -->
        </div>  
        <div class="text">
          <input type="text" placeholder="Наименование" v-model="search">
        </div>
        <div class="number">Остаток</div> 
        <div class="text narrow"></div>  
        <div class="number">Продажа</div> 
      </div>
      <div v-if="!product.hidden" v-for="product in productList" :key="product.product_id">
         <div class="narrow">
          <input type="checkbox" :checked="product.changed">
        </div>  
        <div class="text">
           <router-link class="item" style="padding-left:.3em" :to="`/product/${product.product_id}`" tag="div">{{product.name}}</router-link> 
           <!-- <input type="text" v-model="product.name" @input="product.changed = true">  -->
        </div>
          <div class="number" style="flex-grow:0">
          <span>{{product.stock_quantity}}</span>
          <!-- <div style="flex-basis:30px; margin-left:10px;">{{['кг', 'шт.'][product.unit-1]}}</div> -->
        </div> 
         <div class="text narrow">
          {{['кг', 'шт.'][product.unit-1]}}
           <!-- <select v-model="product.unit" @input="product.changed = true">
            <option value="1">кг</option>
            <option value="2">шт.</option>
          </select>  -->
        </div> 
         <div class="number">
          <router-link :to="`/waybill/${product.waybill_id}`">
            {{product.sale_price ? `${product.sale_price} ₽` : ''}}
          </router-link>
        </div> 
      </div>
    </div>
    <router-view></router-view>
  </div>
</nope>

<!-- <style scoped>
  .table > * { margin-bottom: 10px; }
  .table > * > *.text { flex-basis: 400px; }
  .table > * > *.text.narrow { flex-basis: 30px; }
  .table > * > *.number { flex-basis: 90px; }
  .narrow { flex-basis: 20px; }
  .item:hover { cursor: pointer; }
  input[type="checkbox"] { opacity: .5; }

  button { padding: .25rem .7rem; font-size: inherit; background: none; border-radius: 3px; ; border: 1px solid rgba(0,0,0,.15); }
  button:active { background: #fcfcfc; transform: scale(.99); }

  .changes { transform: translateY(100%); position: fixed; bottom: 0; width: 100vw; transition: .5s transform; }
  .changes > * { background: #ffe77f; margin: 1rem; padding: 1rem; border-radius: 5px; }
  .changes button { background: white; }
  .open { transform: translateY(0); }
</style> -->
