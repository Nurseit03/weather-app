import { ref, reactive, watch, toRefs } from 'vue';
import * as WeatherApi from '@/api/weather/weatherApi';
import { useI18n } from 'vue-i18n';
import { IWeather } from '@/models/weather';
import { IArea } from '@/models/area';

export const useWeatherService = () => {
  const { locale } = useI18n();

  const weatherData = reactive<IWeather>({});
  const locationData = ref<IArea>({});
  const isFetching = ref(false);

  const showDialog = ref({
    show: false,
    title: 'failed',
    message: '',
  });

  const userCoordinates = reactive({
    latitude: null as number | null,
    longitude: null as number | null,
  });

  const onLocationSelected = (selectedArea: IArea) => {
    locationData.value = selectedArea;
    selectedArea?.name && getWeatherByLocationName(selectedArea.name);
  };

  const getUserCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserCoordinates(
          position?.coords?.latitude,
          position?.coords?.longitude
        );

        getWeatherByCoordinates(
          position?.coords?.latitude,
          position?.coords?.longitude
        );
      },
      (error) => {
        showDialog.value = {
          show: true,
          title: 'failed',
          message: error?.message || 'Unknown error',
        };
      }
    );
  };

  const setUserCoordinates = (latitude: number, longitude: number) => {
    userCoordinates.latitude = latitude;
    userCoordinates.longitude = longitude;
  };

  const getWeatherByLocationName = (name: string) => {
    isFetching.value = true;

    WeatherApi.getWeatherByLocationName(name, locale.value.slice(0, 2))
      .then((data: IArea) => Object.assign(weatherData, toRefs(reactive(data))))
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

    WeatherApi.getWeatherByCoordinates(
      latitude,
      longitude,
      locale.value.slice(0, 2)
    )
      .then((data: IArea) => Object.assign(weatherData, toRefs(reactive(data))))
      .finally(() => {
        setTimeout(() => {
          isFetching.value = false;
        }, 1000);
      });
  };

  const onLocaleChange = () => {
    if (locationData.value?.name) {
      getWeatherByLocationName(locationData.value.name);
    } else if (userCoordinates.latitude && userCoordinates.longitude) {
      getWeatherByCoordinates(
        userCoordinates.latitude,
        userCoordinates.longitude
      );
    }
  };

  watch(() => locale.value, onLocaleChange);

  return {
    weatherData,
    locationData,
    isFetching,
    showDialog,
    onLocationSelected,
    getUserCoordinates,
  };
};
