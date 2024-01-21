<template>
    <div class="product-list">
      <WeatherCard title="Weather card"/>
    </div>
  </template>
  
  <script>
  import WeatherCard from './WeatherCard.vue';
  
  export default {
    name: 'WeatherContent',
    components: { WeatherCard },
  };
  </script>