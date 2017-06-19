<template>
  <div>
    <div class="body">
      <h1>Список товаров</h1>
      <div class="table">
        <div>
          <div class="text">
            <input type="text">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .table { display: flex; flex-flow: column nowrap; flex: 1 1 auto; margin-bottom: 1rem; align-content: center; }
  .table > * { display: flex; flex-flow: row nowrap; width: 100; align-content: center; background: white; }
  .table > * > * { display: flex; flex-flow: row nowrap; flex-grow: 1; flex-basis: 0; min-width: 0px; padding: 0.2rem; justify-content: center; align-items: center; }
  .table > * > *:first-child { padding-left: 0; }
  .table .header { color: #ccc; }
  .table .text { flex-grow: 4; justify-content: flex-start; }
  .table .number { justify-content: flex-end; }
  .table .number input { text-align: right; }
  .table .actions { flex-grow: .2; }
  .table .actions a { text-decoration: none; }
  .table input, .table select { width: 100%; }
</style>

<script>
  export default {
    
  }
</script>