<template>
  <div class="pane">
    <div>
      <slot></slot>
    </div>
  </div>
</template> 

<style scoped>
  .pane { left: 380px; position: fixed; width: calc(100vw - 380px); bottom: 0; top: 0; overflow-y: scroll; }
  .pane > * { animation: .5s .2s move forwards; opacity: 0; background: white; padding-left: 20px; }

  @keyframes move {
    from { transform: scale(.99); opacity: 0; }
    25% { opacity: 1; }
    to { transform: scale(1); opacity: 1; }
  }
</style>