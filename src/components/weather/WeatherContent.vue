<template>
  <div class="q-pa-md content">
    <div v-if="showWeatherAnimation" class="weather-animation-container">
      <WeatherAnimation :weatherCondition="weatherCondition" />
    </div>
    <WeatherBySelect
      @onLocationSelected="onLocationSelected"
      :defaultAreas="defaultAreas"
    />
    <WeatherCardSkeleton v-if="weatherIsFetching" :customClass="'fade-in'" />
    <WeatherCard
      v-if="weatherData?.main && !weatherIsFetching"
      :weatherData="weatherData"
      :customClass="'fade-in'"
    />
    <div class="text-h6 text-weight-light">{{ $t('or') }}</div>
    <WeatherByLocation :getUserCoordinates="getUserCoordinates" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useWeatherService } from '@/services/weatherService';
import WeatherByLocation from '@/components/weather/weather-widgets/weather-by-location/WeatherByLocation.vue';
import WeatherBySelect from '@/components/weather/weather-widgets/weather-by-select/WeatherBySelect.vue';
import WeatherCardSkeleton from '@/components/weather/weather-card/WeatherCardSkeleton.vue';
import WeatherCard from '@/components/weather/weather-card/WeatherCard.vue';
import WeatherAnimation from '@/components/animations/WeatherAnimation.vue';

const $store = useStore();

const weatherData = computed(() => $store.getters.getWeatherData);
const defaultAreas = computed(() => $store.getters.getSelectedAreas);
const weatherIsFetching = computed(() => $store.getters.getWeatherIsFetching);
const weatherCondition = computed(() => weatherData?.value?.weather?.[0]?.icon);
const showWeatherAnimation = computed(
  () => weatherData?.value?.weather?.[0]?.main && !weatherIsFetching.value
);

const { onLocationSelected, getUserCoordinates } = useWeatherService();
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
}

.weather-animation-container {
  position: relative;
}
</style>
