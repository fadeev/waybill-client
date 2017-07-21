<template>
  <div class="backdrop">
    <div class="page" :style="{width: width + 'vw', right: x + 'px'}" @mousemove="move">
      <slot></slot>
    </div>
  </div>
</template> 

<style scoped>
  .backdrop { width: 100vw; height: 100vh;; position: fixed; background: rgba(0,0,0,.2); top: 0; pointer-events: none;  }
  .page { transition: transform .1s; user-select: none; opacity: 1; background: white; padding-top: .1px; width: 80vw; right: 0; height: 100%;  position: absolute; padding: 1.5rem 3rem; pointer-events: all; overflow: scroll; }
  .page > * { animation: .5s .2s page forwards ease-out; opacity: 0; }

  @keyframes page {
    from { opacity: 0; }
    to { opacity: 1; }
  }
</style>

<script>
  export default {
    props: ['width'],
    data: () => ({
      x: null,
    }),
    methods: {
      move(e) {
        if (e.buttons == 1 && e.target.nodeName != "INPUT") {
          this.x -= e.movementX;
        }
      },
    }
  }
</script>