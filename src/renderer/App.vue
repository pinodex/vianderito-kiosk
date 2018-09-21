<template>
  <div id="app">
    <router-view></router-view>
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
</style>

<script>
  export default { name: 'vianderito-kiosk' }
</script>


