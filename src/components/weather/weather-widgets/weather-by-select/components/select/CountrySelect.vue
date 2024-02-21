<template>
  <q-select
    filled
    :label="$t('Select country')"
    v-model="selectedCountry"
    use-input
    hide-selected
    fill-input
    input-debounce="0"
    :options="filteredCountries"
    :option-label="(country: IArea) => country?.name"
    :option-value="(country: IArea) => country?.id"
    @filter="filterCountries"
    @update:model-value="getCountry"
    style="width: 250px"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          {{ $t('No results') }}
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { IArea } from '@/models/area';

export default {
  name: 'CountrySelect',
  props: {
    onSelect: Function,
  },

  setup(props, { emit }) {
    const selectedCountry = ref(null);
    const filteredCountries = ref<IArea[]>([]);
    const countriesFromApi = ref<IArea[]>([]);

    const filterCountries = (
      val: string,
      update: (callback: () => void) => void
    ) => {
      update(() => {
        const needle = val.toLocaleLowerCase();
        filteredCountries.value = countriesFromApi.value.filter(
          (country: any) =>
            country?.name &&
            country.name.toLocaleLowerCase().indexOf(needle) > -1
        );
      });
    };

    const getCountry = () => {
      emit('onSelect', selectedCountry.value);
    };

    onMounted(async () => {
      try {
        const response = await fetch('https://api.hh.ru/areas');
        const data = await response.json();

        const countriesData: Array<IArea> = data;

        const otherRegionsObject = countriesData.find(
          (region: IArea) => region?.name === 'Другие регионы'
        );

        if (otherRegionsObject && otherRegionsObject.areas) {
          countriesFromApi.value = [
            ...countriesData.filter(region => region !== otherRegionsObject),
            ...otherRegionsObject.areas,
          ];
        } else {
          countriesFromApi.value = countriesData;
        }

        filteredCountries.value = countriesFromApi.value;
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
      getCountry();
    });

    return {
      selectedCountry,
      filteredCountries,
      filterCountries,
      getCountry,
    };
  },
};
</script>
