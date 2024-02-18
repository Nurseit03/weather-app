<template>
  <q-select
    filled
    :label="$t('Select city')"
    v-model="selectedCity"
    use-input
    hide-selected
    fill-input
    input-debounce="0"
    :options="filteredCities"
    :option-label="city => city?.name"
    @filter="filterCities"
    @update:model-value="getCity"
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
import { ref, watch } from 'vue';
import { City } from 'country-state-city';
import { ICity } from '@/models/city';

export default {
  name: 'CitySelect',
  props: {
    countryCode: String,
    isoCode: String,
    onSelect: Function,
  },
  setup(props, { emit }) {
    const selectedCity = ref(null);
    const filteredCities = ref(City.getCitiesOfCountry(props?.countryCode));

    watch(
      [() => props?.countryCode, () => props?.isoCode],
      ([newCountryCode, newIsoCode]) => {
        if (newIsoCode) {
          filteredCities.value = City.getCitiesOfState(
            newCountryCode,
            newIsoCode
          );
        } else {
          filteredCities.value = City.getCitiesOfCountry(newCountryCode);
        }
      }
    );

    const filterCities = (val, update) => {
      update(() => {
        const needle = val.toLocaleLowerCase();
        if (props?.isoCode) {
          filteredCities.value = City.getCitiesOfState(
            props?.countryCode,
            props?.isoCode
          ).filter(
            (city: ICity) => city.name.toLocaleLowerCase().indexOf(needle) > -1
          );
        } else {
          filteredCities.value = City.getCitiesOfCountry(
            props?.countryCode
          ).filter(
            (city: ICity) => city.name.toLocaleLowerCase().indexOf(needle) > -1
          );
        }
      });
    };

    const getCity = () => {
      emit('onSelect', selectedCity.value);
    };

    return {
      selectedCity,
      filteredCities,
      filterCities,
      getCity,
    };
  },
};
</script>
