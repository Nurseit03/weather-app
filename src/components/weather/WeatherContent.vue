<template>
  <div class="q-pa-md content">
    <WeatherBySelect @onLocationSelected="onLocationSelected" />
    <WeatherCardSkeleton v-if="isFetching" :customClass="'fade-in'" />
    <WeatherCard
      v-if="weatherData?.main && !isFetching"
      :weatherData="weatherData"
      :locationData="locationData"
      :customClass="'fade-in'"
    />
    <div class="text-h6 text-weight-light">{{ $t('or') }}</div>
    <WeatherByLocation :getUserCoordinates="getUserCoordinates" />
    <PopupDialog
      v-if="showDialog.show"
      :title="showDialog.title"
      :content="showDialog.message"
      :buttonText="'OK'"
    />
  </div>
</template>

<script setup lang="ts">
import WeatherByLocation from '@/components/weather/weather-widgets/weather-by-location/WeatherByLocation.vue';
import WeatherBySelect from '@/components/weather/weather-widgets/weather-by-select/WeatherBySelect.vue';
import WeatherCardSkeleton from '@/components/weather/weather-card/WeatherCardSkeleton.vue';
import WeatherCard from '@/components/weather/weather-card/WeatherCard.vue';
import PopupDialog from '@/components/ui/PopupDialog.vue';
import { useWeatherService } from '@/services/weatherService';

const {
  weatherData,
  locationData,
  isFetching,
  showDialog,
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
