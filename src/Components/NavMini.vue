<template>
  <div>
    <h1>
      <router-link style="padding-right: 20px" :to="`/product/inventory`">Инвентаризация</router-link>
      <router-link :to="`/product/pricetag`" style="padding-right: 20px">Ценники</router-link>
    </h1>
  </div>
</template>

<style scoped>
  .router-link-exact-active { color: black; cursor: default; }
</style>