<template>
  <div>
    <pane class="pane" width="60">
      <product :id="id"></product>
    </pane> 
  </div>
</template>

<script>
  import Pane from './Pane.vue';
  import Product from './Product.vue';

  export default {
    components: { Pane, Product },
    props: ['id'],
  }
</script>