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
import { useI18n } from 'vue-i18n';
import { reactive, watch, toRefs, ref } from 'vue';
import WeatherByLocation from '@/components/weather/weather-widgets/weather-by-location/WeatherByLocation.vue';
import WeatherBySelect from '@/components/weather/weather-widgets/weather-by-select/WeatherBySelect.vue';
import WeatherCardSkeleton from '@/components/weather/weather-card/WeatherCardSkeleton.vue';
import WeatherCard from '@/components/weather/weather-card/WeatherCard.vue';
import PopupDialog from '@/components/ui/PopupDialog.vue';
import { IWeather } from '@/models/weather';
import { IArea } from '@/models/area';

const { locale } = useI18n();

let weatherData = reactive<IWeather>({});
let locationData = reactive<IArea>({});
let isFetching = ref(false);

const showDialog = ref({
  show: false,
  title: 'failed',
  message: '',
});

let userCoordinates = reactive({
  latitude: null as number | null,
  longitude: null as number | null,
});

const onLocationSelected = (selectedArea: IArea) => {
  // запросить погоду при выборе локации из списка
  locationData = selectedArea;
  selectedArea?.name && getWeatherByLocationName(selectedArea.name);
};

const getUserCoordinates = () => {
  // получение местоположения пользователя
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

const getWeatherByLocationName = (name: string) => {
  isFetching.value = true;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${
      process.env.WEATHER_API_KEY
    }&units=metric&lang=${locale.value.slice(0, 2)}`
  )
    .then((response) => response.json())
    .then((data) => Object.assign(weatherData, toRefs(reactive(data))))
    .finally(() => {
      setTimeout(() => {
        isFetching.value = false;
      }, 1200);
    });
};

const getWeatherByCoordinates = (
  latitude: number | null,
  longitude: number | null
) => {
  isFetching.value = true;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
      process.env.WEATHER_API_KEY
    }&units=metric&lang=${locale.value.slice(0, 2)}`
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

const onLocaleChange = () => {      // при смене языка сделать обратно запрос с новым параметром языка
  if (locationData?.name) {
    getWeatherByLocationName(locationData.name);
  } else if (userCoordinates?.latitude && userCoordinates?.longitude) {
    getWeatherByCoordinates(userCoordinates.latitude, userCoordinates.longitude);
  }
};

watch(() => locale.value, onLocaleChange);

watch(userCoordinates, () => {
  //  запросить погоду при получении местоположения пользователя
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
