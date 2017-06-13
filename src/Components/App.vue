<template>
  <div>
    <Navigation></Navigation>
    <router-view></router-view>
  </div>
</template>

<style>
  body { margin: 0; font-family: sans-serif; }
  h1 { font-weight: normal; font-size: 1.5rem; }
  h1 input { font-size: inherit; }
  input { font-size: inherit; font-family: inherit; padding: .3rem; border: 1px solid #ddd; border-top: 1px solid #aaa; outline: none; }
  th { color: #ccc; font-weight: normal; }
</style>

<script>
  import Navigation from './Navigation.vue'

  export default {
    components: { Navigation }
  }
</script>