import { nextTick } from 'vue';
import { useStore } from 'vuex';
import { AreaType, IArea } from '@/models/area';
import { fetchCountries } from '@/api/areas/countries';

export const useAreasService = () => {
  const $store = useStore();

  const setSelectedAreas = async (areas: AreaType) => {
    await $store.dispatch('setSelectedAreas', areas);
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

    if (typeof node === 'object' && node != null && parents != null) {
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
    if (!node?.parent_id || node?.parent_id == '1001') {
      return 'country';
    } else if (node?.parent_id != null && !parentNode?.parent_id) {
      return 'state';
    } else {
      return 'city';
    }
  };

  return {
    setDefaultAreas,
    setSelectedAreas,
    determineAreaType,
    findLinkedAreasByName,
  };
};

export const fetchAndFilterCountries = async () => {
  try {
    const countries = await fetchCountries();
    const data = await countries.json();

    const countriesData = Array.isArray(data) ? data : [];

    const otherRegionsObject = countriesData.find(
      (region) => region?.name === 'Другие регионы'
    );

    if (otherRegionsObject && otherRegionsObject.areas) {
      return [
        ...countriesData.filter((region) => region !== otherRegionsObject),
        ...otherRegionsObject.areas,
      ];
    } else {
      return countriesData;
    }
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};
