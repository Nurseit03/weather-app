<template>
  <div class="q-pa-md content">
    <WeatherCitySelect
      :options="citiesList.cities"
      @onSelect="handleSelectCity"
    />
    <WeatherCard v-if="weatherData.main" :weatherData="weatherData" :cityData="cityData" />
    <div class="text-h6 text-weight-light">{{ $t('or') }}</div>
    <WeatherByLocation :getUserCoordinates="getUserCoordinates" />
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, toRefs } from 'vue';
import { IWeather } from '../models/weather';
import getCities from '../server/api/cities/cities';
import WeatherCitySelect from './WeatherCitySelect.vue';
import WeatherCard from './WeatherCard.vue';
import WeatherByLocation from './WeatherByLocation.vue';
import { ICity } from 'src/models/city';

const citiesList = getCities();
let weatherData = reactive<IWeather>({});
let cityData = reactive<ICity>({
  id: null,
  value: null,
  label: null,
  lat: null,
  lng: null,
  country: null
});

let userCoordinates = reactive({
  latitude: null as number | null,
  longitude: null as number | null,
});

const getUserCoordinates = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    setUserCoordinates(position?.coords?.longitude, position?.coords?.latitude);
  });
};

const setUserCoordinates = (latitude: number, longitude: number) => {
  userCoordinates.latitude = latitude;
  userCoordinates.longitude = longitude;
};

const getWeatherByCoordinates = (
  latitude: number | null,
  longitude: number | null
) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      Object.assign(weatherData, toRefs(reactive(data)));
    });
};

const handleSelectCity = (selectedCity: ICity) => {
  cityData = selectedCity;
  getWeatherByCoordinates(selectedCity.lat, selectedCity.lng);
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
