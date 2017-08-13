<template>
  <div v-if="$route.name != 'register'">
    <div class="menu">
      <router-link class="item" to="/" exact>
        <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M20 7.093v-5.093h-3v2.093l3 3zm4 5.907l-12-12-12 12h3v10h7v-5h4v5h7v-10h3zm-5 8h-3v-5h-8v5h-3v-10.26l7-6.912 7 6.99v10.182z"/></svg>
      </router-link>
      <router-link class="item" to="/waybill" exact>Накладные</router-link>
      <router-link class="item" to="/product" exact>Товары</router-link>
      <router-link class="item" to="/sale/date" exact>Продажи</router-link>
      <router-link class="item" to="/register" exact>Касса</router-link>
      <!-- <span class="item">|</span> -->
      <!-- <transition-group name="fade" mode="in-out" class="pane">
        <router-link class="cl item" to="/waybill/new" exact v-if="routeHas('waybill')" key="waybill">Новая накладная</router-link>
        <router-link class="cl item" to="/product/inventory" exact v-if="routeHas('product')" key="inventory">Инвентаризация</router-link>
        <router-link class="cl item" to="/product/pricetag" exact v-if="routeHas('product')" key="pricetag">Ценники</router-link>
        <router-link class="cl item" to="/product/new" exact v-if="routeHas('product')" key="new">Новый товар</router-link>
      </transition-group>   -->
    </div>
  </div>
</template>

<style scoped>
  .menu { display: flex; width: 100%; position: fixed; bottom: 0; z-index: 100; background: rgba(255,255,255,1); align-items: center; }
  .menu .item { margin-right: 20px; display: inline-block; padding: 10px 0; display: inline-flex; }
  .menu > .item:first-child { padding-left: 10px; }
  .menu a { fill: rgb(14,122,254); }
  .menu .router-link-exact-active { fill: black; }
  /* .menu a { color: rgba(255,255,255,.8); } */
  .router-link-active { color: inherit; text-decoration: none; }
  .fade-enter-active { transition: all .5s .5s; }
  .fade-leave-active { transition: all .5s; }
  .fade-enter, .fade-leave-to { opacity: 0; }

  @keyframes enter {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  /* .menu { display: flex; padding: .4rem 10px; position: relative; background: white; align-items: center; }
  .menu .item { margin-right: 1rem; display: inline-block; }
  .router-link-active { color: inherit; text-decoration: none; }
  .fade-enter-active { transition: all .5s .5s; }
  .fade-leave-active { transition: all .5s; }
  .fade-enter, .fade-leave-to { transform: translateY(-200%); } */
</style>

<script>
  export default {
    methods: {
      routeHas(name) {
        return this.$route.path.split('/').filter(r => r == name).length > 0
      },
    }
  }
</script>