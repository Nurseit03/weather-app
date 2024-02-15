<template>
  <div class="q-pa-md content">
    <WeatherCitySelect
      :options="citiesList.cities"
      @onSelect="handleSelectCity"
    />
    <WeatherCard
      v-if="weatherData.main"
      :weatherData="weatherData"
      :cityData="cityData"
    />
    <div class="text-h6 text-weight-light">{{ $t('or') }}</div>
    <WeatherByLocation :getUserCoordinates="getUserCoordinates" />
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, toRefs } from 'vue';
import getCities from '@/server/api/cities/cities';
import WeatherCitySelect from '@/components/WeatherCitySelect.vue';
import WeatherCard from '@/components/WeatherCard.vue';
import WeatherByLocation from '@/components/WeatherByLocation.vue';
import { IWeather } from '@/models/weather';
import { ICity } from '@/models/city';

const citiesList = getCities();
let weatherData = reactive<IWeather>({});
let cityData = reactive<ICity>({
  id: null,
  value: null,
  label: null,
  lat: null,
  lng: null,
  country: null,
});

let userCoordinates = reactive({
  latitude: null as number | null,
  longitude: null as number | null,
});

const handleSelectCity = (selectedCity: ICity) => {
  cityData = selectedCity;
  getWeatherByCoordinates(selectedCity.lat, selectedCity.lng);
};

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

const compareUserCoordinates = (newLatitude: number, newLongitude: number) => {
  const { latitude, longitude } = userCoordinates;

  if (latitude !== newLatitude || longitude !== newLongitude) {
    resetObject(cityData);
  }
};

const resetObject = (obj: any) => {
  Object.keys(obj).forEach((key) => {
    obj[key as keyof typeof obj] = null;
  });
};

watch(userCoordinates, () => {
  if (userCoordinates) {
    getWeatherByCoordinates(
      userCoordinates?.latitude,
      userCoordinates?.longitude
    );
    compareUserCoordinates(cityData.lat ?? 0, cityData.lng ?? 0);
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
