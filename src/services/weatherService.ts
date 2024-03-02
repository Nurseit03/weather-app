import { useQuasar } from 'quasar';
import { ref, reactive, watch, toRefs, nextTick } from 'vue';
import * as WeatherApi from '@/api/weather/weatherApi';
import { fetchCountries } from '@/api/areas/countries';
import { useI18n } from 'vue-i18n';
import { IWeather } from '@/models/weather';
import { AreaType, IArea } from '@/models/area';

export const useWeatherService = () => {
  const $q = useQuasar();
  const { locale, t } = useI18n();

  const defaultAreas = ref<AreaType>({});
  const weatherData = reactive<IWeather>({});
  const locationData = ref<IArea>({});
  const isFetching = ref(false);

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
        $q.dialog({
          title: t('failed'),
          message: t(`${error?.message ?? 'Unknown error'}`),
        });
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
      .then((data: IArea) => {
        data?.name && setDefaultAreas(data?.name);
        Object.assign(weatherData, toRefs(reactive(data)));
      })
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

  const setDefaultAreas = async (name: string) => {
    const data = await fetchCountries().then((data) => data.json());
    const parents = findLinkedAreasByName(name, data);

    await nextTick(() => {
      defaultAreas.value = parents;
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
          [determineAreaType(area,node[0])]: { ...area },
        });
        if (Object.keys(result).length > 0) {
          return result;
        }
      }
      return {};
    }

    if (typeof node === 'object' && node !== null && parents != null) {
      if (node?.name?.toLowerCase() === searchedName?.toLowerCase()) {
        return { ...parents, [determineAreaType(node, parents?.country)]: { ...node } };
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
    weatherData,
    locationData,
    isFetching,
    onLocationSelected,
    getUserCoordinates,
    findLinkedAreasByName,
    defaultAreas,
  };
};
