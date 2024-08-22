<script setup>
  import MapComponent from './components/Views/MapComponent.vue';
</script>

<template>
  <main class="app-container" >
      <MapComponent></MapComponent>
  </main>
</template>

<style>
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  }
  .app-container{
    width: 1250px;
    margin: auto;
    position: relative;
  }
  @media screen and (max-width: 800px){
    .app-container{
      width: 600px;
      margin: auto;
    }
  }
  @media screen and (max-width: 400px){
      .app-container{
        width: 400px;
        margin: auto;
      }
  }
</style>