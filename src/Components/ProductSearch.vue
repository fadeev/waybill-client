<template>
  <div>
    <input type="text" v-model="name" @input="get" placeholder="Добавить наименование">
    <div v-if="name" class="list">
      <a v-for="product in list" :key="product.product_id" href="" @click.prevent="select(product)">{{product.name}}</a>
      <a href="" @click.prevent="submit(name)">Создать товар "{{name}}"</a>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data: () => ({
      name: null,
      list: null,
    }),
    methods: {
      get(e) {
        let name = e.target.value;
        if (name === "") return this.list  = null;
        axios.get(`${URL}/product?search=${name}`)
             .then(({data: {data: {product}}}) => this.list = product)
             .catch(error => console.log(error));
      },
      select(product) {
        this.name = null;
        this.list = null;
        this.$emit('selected', Object.assign({quantity: null, sale_price: null, cost_total: null}, product));
      },
      submit(name) {
        axios.post(`${URL}/product`, {product: {name: name}})
             .then(({data: {data: {product}}}) => {
               this.select(product)
             })
             .catch(error => console.log(error))        
      },
    },
  }
</script>