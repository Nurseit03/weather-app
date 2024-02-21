<template>
  <div class="q-gutter-md column">
    <CountrySelect
      class="fade-in"
      @onSelect="handleSelectCountry"
    />
    <StateSelect
      v-if="selectedCountry?.areas && selectedCountry.areas.length > 0"
      class="fade-in"
      :areas="selectedCountry?.areas"
      @onSelect="handleSelectState"
    />
    <CitySelect
      v-if="selectedState?.areas && selectedState.areas.length > 0"
      class="fade-in"
      :areas="selectedState?.areas"
      @onSelect="handleSelectCity"
    />
  </div>
</template>

<script lang="ts">
import CountrySelect from '@/components/weather/weather-widgets/weather-by-select/components/select/CountrySelect.vue';
import StateSelect from './components/select/StateSelect.vue';
import CitySelect from '@/components/weather/weather-widgets/weather-by-select/components/select/CitySelect.vue';
import { IArea } from '@/models/area';

export default {
  name: 'WeatherBySelect',
  components: {
    CountrySelect,
    StateSelect,
    CitySelect,
  },
  data() {
    return {
      selectedCountry: null as IArea | null,
      selectedState: null as IArea | null,
      selectedCity: null as IArea | null,
    };
  },
  methods: {
    handleSelectCountry(country: IArea) {
      this.selectedCountry = country;
    },
    handleSelectState(state: IArea) {
      this.selectedState = state;
      this.$emit('onLocationSelected', state);
    },
    handleSelectCity(city: IArea) {
      this.selectedCity = city;
      this.$emit('onLocationSelected', city);
    },
  },
};
</script>
