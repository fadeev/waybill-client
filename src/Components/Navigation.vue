<template>
  <div v-if="$route.name != 'register'">
    <div class="menu">
      <router-link to="/waybill">Накладные</router-link>
      <router-link to="/product">Товары</router-link>
      <router-link to="/supplier">Поставщики</router-link>
      <router-link to="/sale">Продажи</router-link>
      <router-link to="/inventory">Инвентаризация</router-link>
      <router-link to="/payment">Оплата</router-link>
      <router-link to="/register">Касса</router-link>
    </div>
  </div>
</template>

<style scoped>
  .menu { display: flex; padding: .4rem 10px; position: relative; background: white; }
  .menu > * { margin-right: 1rem; }
  .router-link-active { color: inherit; text-decoration: none; }
</style>