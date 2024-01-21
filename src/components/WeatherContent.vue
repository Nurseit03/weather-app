<template>
  <div class="product-list">
    <WeatherCitySelect />
    <WeatherCard title="Weather card" />
  </div>
</template>

<script>
import WeatherCard from './WeatherCard.vue';
import WeatherCitySelect from './WeatherCitySelect.vue';

export default {
  name: 'WeatherContent',
  components: { WeatherCard, WeatherCitySelect },
};
</script>
