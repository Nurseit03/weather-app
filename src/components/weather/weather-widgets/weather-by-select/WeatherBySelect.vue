<template>
  <div class="q-gutter-md column">
    <CountrySelect @onSelect="handleSelectCountry" />
    <StateSelect v-if="selectedCountry" :isoCode="selectedCountry?.isoCode" @onSelect="handleSelectState" />
    <CitySelect v-if="selectedCountry" :countryCode="selectedState?.countryCode || selectedCountry?.isoCode" :isoCode="selectedState?.isoCode" @onSelect="handleSelectCity" />
  </div>
</template>

<script lang="ts">
import CountrySelect from '@/components/weather/weather-widgets/weather-by-select/components/select/CountrySelect.vue';
import StateSelect from '@/components/weather/weather-widgets/weather-by-select/components/select/StateSelect.vue';
import CitySelect from '@/components/weather/weather-widgets/weather-by-select/components/select/CitySelect.vue';
import { ICountry } from '@/models/country';
import { IState } from '@/models/state';
import { ICity } from '@/models/city';

export default {
  name: 'WeatherBySelect',
  components: {
    CountrySelect,
    StateSelect,
    CitySelect,
  },
  data() {
    return {
      selectedCountry: null as ICountry | null,
      selectedState: null as IState | null,
      selectedCity: null as ICity | null,
    };
  },
  methods: {
    handleSelectCountry(country: ICountry) {
      this.selectedCountry = country;
    },
    handleSelectState(state: IState) {
      this.selectedState = state;
    },
    handleSelectCity(city: ICity) {
      this.selectedCity = city;
      this.$emit('onCitySelected', city);
    },
  },
};
</script>
