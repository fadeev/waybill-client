<template>
  <div>
    <div class="tb">
      <div class="header" v-if="productList && productList.length > 0">
        <div class="narrow" @click="selectAll">
          <svg v-if="!all" xmlns="http://www.w3.org/2000/svg" :class="{checkbox: true, active: all}"  width="12" height="12" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12z"/></svg>                 
          <svg v-if="all" xmlns="http://www.w3.org/2000/svg" :class="{checkbox: true, active: all}" width="12" height="12" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12"/></svg>
        </div>
        <div class="text">
          <input type="text" placeholder="Наименование" v-model="search">
        </div>
        <div class="number" v-if="details">Остаток</div>
        <div class="number" v-if="details">Цена</div>
      </div>
      <div v-if="!product.hidden" :class="{'router-link-active': id == product.product_id}" class="item" v-for="product in productList">
        <div class="narrow" @click="addProduct(product)">
          <svg v-if="!product.selected" xmlns="http://www.w3.org/2000/svg" :class="{checkbox: true, active: product.selected}"  width="12" height="12" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12z"/></svg>                
          <svg v-if="product.selected" xmlns="http://www.w3.org/2000/svg" :class="{checkbox: true, active: product.selected}" width="12" height="12" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12"/></svg>
        </div>
        <div class="text" @click="selectProduct(product)">
          {{product.name}}
        </div>
        <div class="number" v-if="details">
          <span v-if="product.unit == 1 && product.stock_quantity">
            <span v-if="product.stock_quantity">{{product.stock_quantity.toFixed(2)}}</span>
            <span class="unit">кг</span>
          </span>
          <span v-if="product.unit == 2">
            <span v-if="product.stock_quantity">{{product.stock_quantity}}</span>
            <span class="unit">шт.</span>
          </span>
        </div>
        <div class="number" v-if="details">
          <span v-if="product.sale_price">
            {{product.sale_price}}
            <span class="unit">₽</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  input[type="checkbox"] { margin: 0; }
  .tb > * > * { align-items: center; }
  .tb .narrow { text-align: center; width: 20px; padding: 0; }
  .checkbox { fill: rgba(0,0,0,.3); }
  .checkbox:hover { fill: rgb(14,82,254); }
  .active { fill: rgb(14,82,254); animation: .2s resize forwards; transform: scale(.5); }
  /* .router-link-active .checkbox { fill: white; }
  .router-link-active .active { fill: white; } */

  @keyframes resize {
    from { transform: scale(.9); }
    50% { transform: scale(1.1); }
    to { transform: scale(1); }
  }
</style>

<script>
  import forEach from 'lodash/forEach';

  export default {
    props: {id: null, productList: null, selectionMode: null, details: {type: Boolean, default: true}},
    data: () => ({
      search: null,
      all: false,
    }),
    watch: {
      search(e) {
        forEach(this.productList, (x) => {
          x.hidden = x.name.match(new RegExp(this.search, 'i')) ? false : true
        })
      }
    },
    methods: {
      selectProduct(product) {
        if (this.selectionMode) {
          this.$emit('selected', product);
        }
        if (!this.selectionMode && product.product_id != this.id)
          this.$router.push(`/product/${product.product_id}`)
        if (!this.selectionMode && product.product_id == this.id)
          this.$router.push(`/product`)
      },
      selectAll() {
        this.all = !this.all;
        if (this.all) return this.productList.filter(x => !x.hidden).map(x => x.selected = true);
        if (!this.all) return this.productList.filter(x => !x.hidden).map(x => x.selected = false);
      },
      addProduct(product) {
        product.selected = !product.selected;
      },
    }
  }
</script>