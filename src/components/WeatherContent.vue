<template>
  <div class="q-pa-md content">
    <WeatherCitySelect :options="citiesList.cities" />
    <WeatherCard :weatherData="weatherData" />
    <div class="text-h6 text-weight-light">ИЛИ</div>
    <WeatherByLocation :getUserCoordinates="getUserCoordinates"/>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, toRefs } from 'vue';
import { IWeather } from '../models/weather';
import getCities from '../server/api/cities/cities';
import WeatherCitySelect from './WeatherCitySelect.vue';
import WeatherCard from './WeatherCard.vue';
import WeatherByLocation from './WeatherByLocation.vue';

const model = ref(null);
const citiesList = getCities();
let weatherData = reactive<IWeather>({});
let userCoordinates = reactive({ latitude: null, longitude: null });

const getUserCoordinates = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    setUserCoordinates(position?.coords?.longitude, position?.coords?.latitude);
  });
};

const setUserCoordinates = (latitude: any, longitude: any) => {
  userCoordinates.latitude = latitude;
  userCoordinates.longitude = longitude;
};

const getWeatherByCoordinates = (latitude: any, longitude: any) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      Object.assign(weatherData, toRefs(reactive(data)));
    });
};

watch(userCoordinates, () => {
  if (userCoordinates) {
    getWeatherByCoordinates(
      userCoordinates?.latitude,
      userCoordinates?.longitude
    );
  }
});
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
