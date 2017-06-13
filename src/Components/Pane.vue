<template>
  <div class="backdrop">
    <div class="page">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
  .backdrop { width: 100%; height: 100vh; position: absolute; background: rgba(0,0,0,.5); top: 0; pointer-events: none; }
  .page { background: white; padding-top: .1px; width: 75%; right: 0; position: absolute; padding: 1.5rem 3rem; pointer-events: all; }
</style>