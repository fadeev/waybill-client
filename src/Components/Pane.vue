<template>
  <div class="backdrop">
    <div class="page">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
  .backdrop { width: 100vw; height: 100vh;; position: fixed; background: rgba(0,0,0,.2); top: 0; pointer-events: none;  }
  .page { opacity: 1; background: white; padding-top: .1px; width: 80vw; right: 0; height: 100%;  position: absolute; padding: 1.5rem 3rem; pointer-events: all; overflow: scroll; }
  .page > * { animation: .5s .2s page forwards ease-out; opacity: 0; }

  @keyframes backdrop {
    from { background: rgba(0,0,0,0) }
    to { background: rgba(0,0,0,.2) }
  }
  @keyframes page {
    from { opacity: 0; }
    to { opacity: 1; }
  }
</style>