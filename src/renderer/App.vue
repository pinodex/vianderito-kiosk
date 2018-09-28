<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<style>
  html, body {
    margin: 0;
    padding: 0;

    height: 100%;
    width: 100%;

    overflow: hidden !important;
  }

  .table td,
  .table th {
    vertical-align: middle !important;
  }

  .table .is-fit {
    width: 1%;
  }

  /*
   * Animations
   */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 200ms ease;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>

<script>
  export default { name: 'vianderito-kiosk' }
</script>


