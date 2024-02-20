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
    :option-label="(city: ICity) => city?.name"
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
    const filteredCities = ref(
      City.getCitiesOfCountry(props?.countryCode ?? '')
    );

    watch(
      [() => props?.countryCode, () => props?.isoCode],
      ([newCountryCode, newIsoCode]) => {
        if (newIsoCode && newCountryCode) {
          filteredCities.value = City.getCitiesOfState(
            newCountryCode,
            newIsoCode
          );
        } else if (newCountryCode) {
          filteredCities.value = City.getCitiesOfCountry(newCountryCode);
        }
      }
    );

    const filterCities = (
      val: string,
      update: (callback: () => void) => void
    ) => {
      update(() => {
        const needle = val.toLocaleLowerCase();
        const { countryCode, isoCode } = props;

        if (isoCode && countryCode) {
          filteredCities.value = City.getCitiesOfState(
            countryCode,
            isoCode
          ).filter(
            (city) => city.name.toLocaleLowerCase().indexOf(needle) > -1
          );
        } else if (countryCode) {
          filteredCities.value = City.getCitiesOfCountry(countryCode)?.filter(
            (city) => city.name.toLocaleLowerCase().indexOf(needle) > -1
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
