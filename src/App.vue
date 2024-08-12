<script setup>
import { Map } from 'leaflet';
import { onMounted, ref } from 'vue';

onMounted(()=>{
   const map = new Map("map");
})
</script>

<template>
  <main>
    <h1>Plantilla de Geosphere lista para el trabajo</h1>
    <h4>Librerias y dependencias a usar </h4>
    <h5>leaflet</h5>
    <p>trabajo con informacion geografica</p>
    <h5>vitest</h5>
    <p> unit testing para funcionalidades y componentes</p>
    <div id="map"></div>
  </main>
</template>

<style>
  #map{
    height: 300px;
    width: 300px;
  }
</style>
