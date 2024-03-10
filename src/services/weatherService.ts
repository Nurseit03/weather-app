import { useQuasar } from 'quasar';
import { ref, reactive, watch, toRefs, nextTick } from 'vue';
import * as WeatherApi from '@/api/weather/weatherApi';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { IWeather } from '@/models/weather';
import { AreaType, IArea } from '@/models/area';

export const useWeatherService = () => {
  const $q = useQuasar();
  const $store = useStore();
  const { locale, t } = useI18n();

  const locationData = ref<IArea>({});
  const isFetching = ref(false);

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
  
  const setSelectedAreas = async (areas: AreaType) => {
    await $store.dispatch('setSelectedAreas', areas);
  };

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
        $q.dialog({
          title: t('failed'),
          message: t(`${error?.message ?? 'Unknown error'}`),
        });

        addNotification(`Ошибка получения координат пользователя`);
      }
    );
  };

  const setUserCoordinates = (latitude: number, longitude: number) => {
    userCoordinates.latitude = latitude;
    userCoordinates.longitude = longitude;
  };

  const getWeatherByLocationName = async (name: string) => {
    isFetching.value = true;

    await WeatherApi.getWeatherByLocationName(name, locale.value.slice(0, 2))
      .then(async (data: IWeather) => {
        data?.name && await setDefaultAreas(data?.name);
        await setWeatherData(data);
        await addNotification(`Погода успешно получена для: ${name}`);
      })
      .finally(() => {
        setTimeout(() => {
          isFetching.value = false;
        }, 1200);
      })
      .catch(async (error: any) => {
        $q.dialog({
          title: t('failed'),
          message: t(`${error?.message ?? 'Unknown error'}`),
        });

        await addNotification(`Ошибка получения погоды для: ${name}`);
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
      .then(async (data: IWeather) => {
        data?.name && await setDefaultAreas(data?.name);
        await setWeatherData(data);
        await addNotification(`Погода успешно получена для: ${data?.name}`);
      })
      .finally(() => {
        setTimeout(() => {
          isFetching.value = false;
        }, 1000);
      })
      .catch(async (error: any) => {
        $q.dialog({
          title: t('failed'),
          message: t(`${error?.message ?? 'Unknown error'}`),
        });

        await addNotification(`Ошибка получения погоды по координатам`);
      });
  };

  const onLocaleChange = async() => {
    if (locationData.value?.name) {
      await setDefaultAreas(locationData.value?.name);
      await getWeatherByLocationName(locationData.value.name);
    } else if (userCoordinates.latitude && userCoordinates.longitude) {
      getWeatherByCoordinates(
        userCoordinates.latitude,
        userCoordinates.longitude
      );
    }
  };

  const setDefaultAreas = async (name: string) => {
    const countriesData = $store.getters.getCountriesData;
    const parents = findLinkedAreasByName(name, countriesData);

    await nextTick(async () => {
      await setSelectedAreas(parents);
    });
  };

  const findLinkedAreasByName = (
    searchedName: string,
    node: IArea | IArea[],
    parents: Record<string, IArea> = {}
  ): Record<string, IArea> => {
    if (Array.isArray(node)) {
      for (const area of node) {
        const result = findLinkedAreasByName(searchedName, area, {
          ...parents,
          [determineAreaType(area, node[0])]: { ...area },
        });
        if (Object.keys(result).length > 0) {
          return result;
        }
      }
      return {};
    }

    if (typeof node === 'object' && node !== null && parents != null) {
      if (node?.name?.toLowerCase() === searchedName?.toLowerCase()) {
        return {
          ...parents,
          [determineAreaType(node, parents?.country)]: { ...node },
        };
      }

      if (node?.areas && node?.areas?.length > 0) {
        for (const area of node.areas) {
          const result = findLinkedAreasByName(searchedName, area, {
            ...parents,
            [determineAreaType(area, node)]: { ...area },
          });
          if (Object.keys(result).length > 0) {
            return result;
          }
        }
      }
    }

    return {};
  };

  const determineAreaType = (node: IArea, parentNode?: IArea) => {
    if (!node?.parent_id) {
      return 'country';
    } else if (node?.parent_id != null && !parentNode?.parent_id) {
      return 'state';
    } else {
      return 'city';
    }
  };

  watch(() => locale.value, onLocaleChange);

  return {
    locationData,
    isFetching,
    onLocationSelected,
    getUserCoordinates,
  };
};
