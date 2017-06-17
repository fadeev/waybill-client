<template>
  <div class="backdrop">
    <div class="page">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
  .backdrop { width: 100vw; height: 100vh;; position: fixed; background: rgba(0,0,0,.2); top: 0; pointer-events: none;  }
  .page { background: white; padding-top: .1px; width: 80vw; right: 0; height: 100%;  position: absolute; padding: 1.5rem 3rem; pointer-events: all; overflow: scroll; }
  /*.page { transition: transform .5s .5s ease-in-out; }
  .page:not(:hover) { transform: translateX(25vw); }*/
</style>