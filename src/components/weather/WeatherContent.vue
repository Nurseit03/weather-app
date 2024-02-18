<template>
  <div class="q-pa-md content">
    <WeatherBySelect @onCitySelected="handleSelectCity" />
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
import WeatherBySelect from '@/components/weather/weather-widgets/weather-by-select/WeatherBySelect.vue';
import WeatherCard from '@/components/weather/weather-card/WeatherCard.vue';
import WeatherByLocation from '@/components/weather/weather-widgets/weather-by-location/WeatherByLocation.vue';
import { IWeather } from '@/models/weather';
import { ICity } from '@/models/city';

let weatherData = reactive<IWeather>({});
let cityData = reactive<ICity>({
  name: null,
  countryCode: null,
  stateCode: null,
  latitude: null,
  longitude: null,
});

let userCoordinates = reactive({
  latitude: null as number | null,
  longitude: null as number | null,
});

const handleSelectCity = (selectedCity: ICity) => {
  cityData = selectedCity;
  if (selectedCity.latitude && selectedCity.longitude) {
    getWeatherByCoordinates(
      parseFloat(selectedCity.latitude),
      parseFloat(selectedCity.longitude)
    );
  }
};

const getUserCoordinates = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    setUserCoordinates(position?.coords?.latitude, position?.coords?.longitude);
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
    if (cityData.latitude && cityData.longitude) {
      compareUserCoordinates(
        parseFloat(cityData.latitude),
        parseFloat(cityData.longitude)
      );
    }
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
