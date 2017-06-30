<template>
  <div v-if="$route.name != 'register'">
    <div class="menu">
      <!--<div><router-link to="/" exact>Главная страница</router-link></div>-->
      <div><router-link to="/waybill">Накладные</router-link></div>
      <div><router-link to="/product">Товары</router-link></div>
      <div><router-link to="/supplier">Поставщики</router-link></div>
      <div><router-link to="/register">Касса</router-link></div>
    </div>
  </div>
</template>

<style scoped>
  .menu { display: flex; padding: .5rem; }
  .menu > * { margin-right: 1rem; }
  .router-link-active { color: inherit; text-decoration: none; }
</style>