<template>
  <div class="q-pa-md content">
    <WeatherBySelect @onLocationSelected="onLocationSelected" :defaultAreas="defaultAreas" />
    <WeatherCardSkeleton v-if="isFetching" :customClass="'fade-in'" />
    <WeatherCard
      v-if="weatherData?.main && !isFetching"
      :weatherData="weatherData"
      :locationName="locationName"
      :customClass="'fade-in'"
    />
    <div class="text-h6 text-weight-light">{{ $t('or') }}</div>
    <WeatherByLocation :getUserCoordinates="getUserCoordinates" />
  </div>
</template>

<script setup lang="ts">
import WeatherByLocation from '@/components/weather/weather-widgets/weather-by-location/WeatherByLocation.vue';
import WeatherBySelect from '@/components/weather/weather-widgets/weather-by-select/WeatherBySelect.vue';
import WeatherCardSkeleton from '@/components/weather/weather-card/WeatherCardSkeleton.vue';
import WeatherCard from '@/components/weather/weather-card/WeatherCard.vue';
import { useWeatherService } from '@/services/weatherService';
import { useStore } from 'vuex';
import { computed } from 'vue';

const $store = useStore();

const weatherData = computed(() =>$store.getters.getWeatherData);
const defaultAreas = computed(() => $store.getters.getSelectedAreas);

const {
  locationName,
  isFetching,
  onLocationSelected,
  getUserCoordinates,
} = useWeatherService();
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
}
</style>
