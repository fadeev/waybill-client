<template>
  <div>
    <Navigation></Navigation>
    <router-view></router-view>
  </div>
</template>

<style>
  body { margin: 0; font-family: sans-serif; }
</style>

<script>
  import Navigation from './Navigation.vue'

  export default {
    components: { Navigation }
  }
</script>