<template>
  <div>
    <Navigation></Navigation>
    <router-view></router-view>
  </div>
</template>

<style>
  html { width:100vw; overflow-x: hidden; height: 100%; }
  body { margin: 0; font-family: sans-serif; height: 100%; }
  h1 { font-weight: normal; font-size: 1.5rem; }
  h1 input { font-size: inherit; }
  input, select { font-size: inherit; font-family: inherit; padding: .3rem; border: 1px solid rgba(0,0,0,.15); box-sizing: border-box; }
  input:focus, select:focus { border: 1px solid rgba(0,0,0,.3); }
  th { color: #ccc; font-weight: normal; }
  .body { margin: 0 .5rem; }

  a { color: rgb(14,122,254); text-decoration: none; }
  a:hover { color: red; }
  input[disabled] { background: #eee; color: #777; }

  * { outline: none; }

  /*Hiding spinners for <input type="number">*/
  [type="number"]::-webkit-inner-spin-button, [type="number"]::-webkit-outer-spin-button { -webkit-appearance: none !important; margin: 0 !important; -moz-appearance:textfield !important; }
</style>

<script>
  import Navigation from './Navigation.vue'

  export default {
    components: { Navigation }
  }
</script>