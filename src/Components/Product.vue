<template>
  <div>
    <h1><input type="text" v-model="product.name">
    <select v-model="product.unit" @input="product.changed = true">
      <option value="1">кг</option>
      <option value="2">шт.</option>
    </select></h1>
    <button>Сохранить товар</button>
  </div>
</template>

<style scoped>
  h1 input { width: 500px; }
</style>

<script>
  import axios from 'axios';

  export default {
    props: ['id'],
    data: () => ({
      product: {
        name: null,
      }
    }),
    mounted() {
      this.getProductById(this.id)
    },
    watch: {
      id() {
        this.getProductById(this.id)
      }
    },
    methods: {
      resetFields() {
        Object.assign(this.$data, this.$options.data());
      },
      getProductById(id) {
        if (this.id === 'new') return this.resetFields();
        axios.get(`${URL}/product/${id}`)
             .then(({data: {data: {product}}}) => {
               this.resetFields();
               this.product = Object.assign(this.product, product)
             })
             .catch(error => this.resetFields());
      },
    },
  }
</script>