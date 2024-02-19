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
    :option-label="country => country?.name"
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
import { Country } from 'country-state-city';
import { ICountry } from '@/models/country';

export default {
  name: 'CountrySelect',
  props: {
    onSelect: Function,
  },
  setup(props, { emit }) {
    const selectedCountry = ref(null);
    const filteredCountries = ref(Country.getAllCountries());

    const filterCountries = (val: string, update: (callback: () => void) => void) => {
      update(() => {
        const needle = val.toLocaleLowerCase();
        filteredCountries.value = Country.getAllCountries().filter(
          (country: ICountry) => country.name.toLocaleLowerCase().indexOf(needle) > -1
        );
      });
    };

    const getCountry = () => {
      emit('onSelect', selectedCountry.value);
    };

    onMounted(() => {
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
