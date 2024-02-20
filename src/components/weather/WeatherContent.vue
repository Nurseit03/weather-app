<template>
  <div class="q-pa-md content">
    <WeatherBySelect @onLocationSelected="onLocationSelected" />
    <WeatherCardSkeleton v-if="isFetching" :customClass="'fade-in'" />
    <WeatherCard
      v-if="weatherData.main && !isFetching"
      :weatherData="weatherData"
      :cityData="cityData"
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
import { reactive, watch, toRefs, ref } from 'vue';
import WeatherBySelect from '@/components/weather/weather-widgets/weather-by-select/WeatherBySelect.vue';
import WeatherCard from '@/components/weather/weather-card/WeatherCard.vue';
import WeatherByLocation from '@/components/weather/weather-widgets/weather-by-location/WeatherByLocation.vue';
import { IWeather } from '@/models/weather';
import { ICity } from '@/models/city';
import WeatherCardSkeleton from '@/components/weather/weather-card/WeatherCardSkeleton.vue';
import PopupDialog from '@/components/ui/PopupDialog.vue';

let weatherData = reactive<IWeather>({});
let cityData = reactive<ICity>({});

let userCoordinates = reactive({
  latitude: null as number | null,
  longitude: null as number | null,
});

let isFetching = ref(false);
const showDialog = ref({
  show: false,
  title: 'failed',
  message: '',
});

const onLocationSelected = (selectedCity: ICity) => {
  cityData = selectedCity;
  if (cityData?.latitude && cityData?.longitude) {
    getWeatherByCoordinates(
      parseFloat(cityData.latitude),
      parseFloat(cityData.longitude)
    );
  }
};

const getUserCoordinates = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      setUserCoordinates(
        position?.coords?.latitude,
        position?.coords?.longitude
      );
    },
    (error) =>
      (showDialog.value = {
        show: true,
        title: 'failed',
        message: error?.message || 'Unknown error',
      })
  );
};

const setUserCoordinates = (latitude: number, longitude: number) => {
  userCoordinates.latitude = latitude;
  userCoordinates.longitude = longitude;
};

const getWeatherByCoordinates = (
  latitude: number | null,
  longitude: number | null
) => {
  isFetching.value = true;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      Object.assign(weatherData, toRefs(reactive(data)));
    })
    .finally(() => {
      setTimeout(() => {
        isFetching.value = false;
      }, 1200);
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
