<template>
  <div>
    <Pane>
      <Waybill :id="id"></Waybill>
    </Pane>
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