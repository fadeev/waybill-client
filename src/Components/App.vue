<template>
  <div>
    <div class="world">
      <Navigation></Navigation>
      <!-- <div class="anim"> -->
      <router-view></router-view>
      <!-- </div> -->
    </div>
  </div>
</template>

<style>
  /* .anim { animation: 1s 1s anim forwards; opacity: 0; }

  @keyframes anim {
    from { opacity: 0; transform: scale(.9); }
    to { opacity: 1; transform: scale(1); }
  } */

  .world { position: relative; overflow-y: scroll; height: 100vh; background: white; overflow-x: hidden; }
  html { width:100vw; overflow-x: hidden; height: 100%; }
  body { margin: 0; font-family: 'Roboto'; height: 100%; background: black; }
  h1 { font-weight: 300; font-size: 1.5rem; line-height: 2em; margin-bottom: 10px; }
  h1 input { font-size: inherit; }
  h2 { font-size: 1.2em; font-weight: normal; }
  input { padding: 0; }
  input, select { font-size: inherit; padding: .3rem; border: 1px solid rgba(0,0,0,.15); box-sizing: border-box; font-weight: inherit; }
  input:focus, select:focus { border: 1px solid rgba(0,0,0,.3); }
  th { color: #ccc; font-weight: normal; }
  .body { margin: 0 .5rem; }

  a { color: rgb(14,122,254); text-decoration: none; cursor: pointer; }
  a:hover { color: red; }
  a:active { color: red; }
  input[disabled] { background: #eee; color: #777; }

  /* .list { position: absolute; margin-top: .5rem; background: white; box-shadow: 0 10px 20px -5px rgba(0,0,0,.15); border-radius: 3px; margin-bottom: 3rem; }
  .list > *:first-child { border-top-left-radius: 3px; border-top-right-radius: 3px; box-shadow: 0 -.1px 0 0 rgba(0,0,0,.15); }
  .list > *:last-child { border-bottom-left-radius: 3px; border-bottom-right-radius: 3px; box-shadow: 0 .1px 0 0 rgba(0,0,0,.15); }
  .list a { padding: .5rem; display: block; box-shadow: .1px 0 0 0 rgba(0,0,0,.15), -.1px 0 0 0 rgba(0,0,0,.15); }
  .list a:hover, .list a:focus { background: linear-gradient(to bottom, rgb(14,122,254), rgb(14,82,254)); color: white; text-decoration: none; outline: none; } */

  .list { position: absolute; margin-top: .5rem; background: white; box-shadow: 0 10px 20px -5px rgba(0,0,0,.15); border-radius: 3px; margin-bottom: 3rem; }
  .list > *:first-child { border-top-left-radius: 3px; border-top-right-radius: 3px; border-top: 1px solid rgba(0,0,0,.15); }
  .list > *:last-child { border-bottom-left-radius: 3px; border-bottom-right-radius: 3px; border-bottom: 1px solid rgba(0,0,0,.15); }
  .list a { padding: .5rem; display: block; border-left: 1px solid rgba(0,0,0,.15); border-right: 1px solid rgba(0,0,0,.15); }
  .list a:hover, .list a:focus { background: linear-gradient(to bottom, rgb(14,122,254), rgb(14,82,254)); color: white; text-decoration: none; outline: none; } 

  * { outline: none; font-family: 'Roboto'; }

  /*Hiding spinners for <input type="number">*/
  [type="number"]::-webkit-inner-spin-button, [type="number"]::-webkit-outer-spin-button, [type="date"]::-webkit-outer-spin-button { -webkit-appearance: none !important; margin: 0 !important; -moz-appearance:textfield !important; }

  .table .text { flex-basis: 400px; }
  .table .number { flex-basis: 150px; }

  input[type="number"] { text-align: right; }
  input[disabled] { background: inherit; }

  .table { display: flex; flex-flow: column nowrap; flex: 0 0 auto; margin-bottom: 1rem; line-height: 1.5; }
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
   button { padding: .5rem .7rem; font-size: inherit; background: white; border-radius: 3px; border: 1px solid rgba(0,0,0,.15); font-weight: 300; } 
  /* button { padding: .5rem 40px; font-size: inherit; background: white; border-radius: 50px; border: 1px solid rgb(14,122,254); font-weight: 300; color: rgb(14,122,254); }
  button:active { border-color: rgba(0,0,0,.4); } */
  button.delete { color: black; border-color: transparent; }
  button:hover { cursor: pointer; }
  button:active { background: linear-gradient(to bottom, rgb(14,122,254), rgb(14,82,254)); color: white; text-decoration: none; outline: none; }
  /* button { padding: .25rem .7rem; font-size: inherit; background: none; border-radius: 3px; ; border: 1px solid rgba(0,0,0,.15); }
  button:active { background: #fcfcfc; transform: scale(.99); } */
  .delete { color: rgba(0,0,0,.3); }

  .tb { display: inline-flex; flex-direction: column; }
  .tb > * { display: flex; flex-direction: row; flex-grow: 0; align-items: baseline; }
  .tb > * > * { width: 205px; padding: 10px 25px 10px 5px; }
  .tb > * > *.nopadding { padding-top: 0; padding-bottom: 0; }
  .tb .text { width: 310px; }
  .tb .date { width: 100px; }
  .tb .number { width: 100px; text-align: right; }
  .tb .header { color: rgba(0,0,0,.3); align-items: baseline; }
  .tb .header input { width: 100%; }
  .tb .unit { position: absolute; margin-left: 5px; float: right; }
  .tb input { width: 100%; }
  .tb .item:hover { cursor: pointer; color: rgb(14,122,254); }
  .tb .router-link-active, .tb .router-link-active:hover { border-radius: 2px; background: linear-gradient(to bottom, rgb(14,122,254), rgb(14,82,254)); color: white; text-decoration: none; }  
  .tb .item.selection:hover { color: white; }

  .meek { font-size: .75em; color: #ccc; }
  .green { color: green; }
  .red { color: red; }

  .deck { padding: 0 5px; margin-top: 10px; margin-bottom: 50px; }

  .padd { padding: 0 5px; }
  .toggle { padding: 5px; border-radius: 2px; }
  a.selection, div.selection { background: linear-gradient(to bottom, rgb(14,122,254), rgb(14,82,254)); color: white; border-radius: 3px; }
  .router-link-exact-active { color: black; cursor: default; }
  .router-link-exact-active:hover { color: black; cursor: default; }

  h1 input[type="date"] { padding-top: 0; padding-bottom: 0; }
</style>

<script>
  import Navigation from './Navigation.vue'

  export default {
    components: { Navigation }
  }
</script>