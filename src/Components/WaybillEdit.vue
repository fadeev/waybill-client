<template>
  <div>
    <!-- <pane class="pane"> -->
    <waybill :id="id"></waybill>
    <!-- </pane> -->
  </div>
</template>

<script>
  import Pane from './Pane.vue';
  import Waybill from './Waybill.vue';

  export default {
    components: { Pane, Waybill },
    props: ['id'],
  }
</script>