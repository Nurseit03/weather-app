import { reactive } from 'vue';
import { useQuasar } from 'quasar';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { IWeather } from '@/models/weather';
import { IArea } from '@/models/area';
import * as WeatherApi from '@/api/weather/weatherApi';
import { useAreasService } from '@/services/areasService';

export const useWeatherService = () => {
  const $q = useQuasar();
  const $store = useStore();
  const { t } = useI18n();

  const { setDefaultAreas } = useAreasService();

  const userCoordinates = reactive({
    latitude: null as number | null,
    longitude: null as number | null,
  });

  const addNotification = async (message: string) => {
    const notification = {
      id: Date.now(),
      date: new Date(),
      message,
    };

    await $store.dispatch('addNotification', notification);
  };

  const setWeatherData = async (data: IWeather) => {
    await $store.dispatch('setWeatherData', data);
  };

  const setWeatherIsFetching = async (value: boolean) => {
    await $store.dispatch('setWeatherIsFetching', value);
  };

  const onLocationSelected = (selectedArea: IArea) => {
    if(selectedArea?.name && selectedArea.parent_id == null) {
      setDefaultAreas(selectedArea.name);
      return;
    }
    
    if (selectedArea?.name) {
      getWeatherByLocationName(selectedArea.name);
    }
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
        $q.dialog({
          title: t('failed'),
          message: t(`${error?.message ?? 'Unknown error'}`),
        });

        addNotification('Ошибка получения координат пользователя');
      }
    );
  };

  const setUserCoordinates = (latitude: number, longitude: number) => {
    userCoordinates.latitude = latitude;
    userCoordinates.longitude = longitude;
  };

  const getWeatherByLocationName = async (name: string) => {
    await setWeatherIsFetching(true);

    await WeatherApi.getWeatherByLocationName(name)
      .then(async (data: IWeather) => {
        data?.name && (await setDefaultAreas(data?.name));

        await setWeatherData(data);
        await addNotification(`Погода успешно получена для: ${name}`);
      })
      .finally(() => {
        setTimeout(async () => {
          await setWeatherIsFetching(false);
        }, 1200);
      })
      .catch(async (error: Error | undefined) => {
        $q.dialog({
          title: t('failed'),
          message: t(`${error?.message ?? 'Unknown error'}`),
        });

        await addNotification(`Ошибка получения погоды для: ${name}`);
      });
  };

  const getWeatherByCoordinates = async (
    latitude: number | null,
    longitude: number | null
  ) => {
    await setWeatherIsFetching(true);

    await WeatherApi.getWeatherByCoordinates(latitude, longitude)
      .then(async (data: IWeather) => {
        data?.name && (await setDefaultAreas(data?.name));

        await setWeatherData(data);
        await addNotification(`Погода успешно получена для: ${data?.name}`);
      })
      .finally(() => {
        setTimeout(async () => {
          await setWeatherIsFetching(false);
        }, 1000);
      })
      .catch(async (error: Error | undefined) => {
        $q.dialog({
          title: t('failed'),
          message: t(`${error?.message ?? 'Unknown error'}`),
        });

        await addNotification('Ошибка получения погоды по координатам');
      });
  };

  return {
    onLocationSelected,
    getUserCoordinates,
  };
};
