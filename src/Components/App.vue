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
  h2 { font-size: 1.2em; font-weight: normal; }
  input, select { font-size: inherit; font-family: inherit; padding: .3rem; border: 1px solid rgba(0,0,0,.15); box-sizing: border-box; }
  input:focus, select:focus { border: 1px solid rgba(0,0,0,.3); }
  th { color: #ccc; font-weight: normal; }
  .body { margin: 0 .5rem; }

  a { color: rgb(14,122,254); text-decoration: none; }
  a:hover { color: red; }
  input[disabled] { background: #eee; color: #777; }

  .list { position: absolute; margin-top: .5rem; background: white; box-shadow: 0 10px 20px -5px rgba(0,0,0,.15); border-radius: 3px; margin-bottom: 3rem; }
  .list > *:first-child { border-top-left-radius: 3px; border-top-right-radius: 3px; border-top: 1px solid rgba(0,0,0,.15); }
  .list > *:last-child { border-bottom-left-radius: 3px; border-bottom-right-radius: 3px; border-bottom: 1px solid rgba(0,0,0,.15); }
  .list a { padding: .5rem; display: block; border-left: 1px solid rgba(0,0,0,.15); border-right: 1px solid rgba(0,0,0,.15); }
  .list a:hover, .list a:focus { background: linear-gradient(to bottom, rgb(14,122,254), rgb(14,82,254)); color: white; text-decoration: none; outline: none; }

  * { outline: none; }

  /*Hiding spinners for <input type="number">*/
  [type="number"]::-webkit-inner-spin-button, [type="number"]::-webkit-outer-spin-button, [type="date"]::-webkit-outer-spin-button { -webkit-appearance: none !important; margin: 0 !important; -moz-appearance:textfield !important; }

  .table .text { flex-basis: 400px; }
  .table .number { flex-basis: 150px; }

  input[type="number"] { text-align: right; }
  input[disabled] { background: inherit; }

  .table { display: flex; flex-flow: column nowrap; flex: 1 1 auto; margin-bottom: 1rem; line-height: 1.5; }
  .table > * { align-items: baseline; display: flex; flex-flow: row nowrap; width: 100; align-content: center; background: white; margin-bottom: .4em; }
  .table > * > * { flex-basis: 200px; display: flex; flex-flow: row nowrap; flex-grow: 0; flex-basis: 0; min-width: 0px; padding-right: .4em; justify-content: center; align-items: center; }
  .table.stretch > * > * { flex-grow: 1; }
  .table .header { color: #ccc; }
  .table .text { flex-basis: 500px; justify-content: flex-start; }
  .table .number { justify-content: flex-end; }
  .table .number input { text-align: right; }
  .table .narrow { flex-basis: 30px; flex-grow: 0; }
  .table .narrow a { text-decoration: none; }
  .table input, .table select { width: 100%; }
  button { padding: .5rem .7rem; font-size: inherit; background: white; border-radius: 3px; border: 1px solid rgba(0,0,0,.15); }
  button:hover { cursor: pointer; }
  button:active { background: linear-gradient(to bottom, rgb(14,122,254), rgb(14,82,254)); color: white; text-decoration: none; outline: none; }
  /* button { padding: .25rem .7rem; font-size: inherit; background: none; border-radius: 3px; ; border: 1px solid rgba(0,0,0,.15); }
  button:active { background: #fcfcfc; transform: scale(.99); } */
  .delete { color: rgba(0,0,0,.3); }
</style>

<script>
  import Navigation from './Navigation.vue'

  export default {
    components: { Navigation }
  }
</script>