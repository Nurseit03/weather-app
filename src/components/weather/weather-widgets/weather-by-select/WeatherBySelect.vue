<template>
  <div class="q-gutter-md column">
    <CountrySelect
      v-if="!defaultAreas?.country"
      :class="defaultAreas?.country ? 'fade-out' : 'fade-in'"
      :defaultArea="defaultAreas?.country"
      @onSelect="handleSelectCountry"
    />
    <CountrySelect
      v-if="defaultAreas?.country"
      class="fade-in"
      :defaultArea="defaultAreas?.country"
      @onSelect="handleSelectCountry"
    />
    <StateSelect
      v-if="
        (selectedCountry?.areas && selectedCountry.areas.length > 0) ||
        defaultAreas?.state
      "
      class="fade-in"
      :areas="stateAreas"
      :defaultArea="defaultAreas?.state"
      @onSelect="handleSelectState"
    />
    <CitySelect
      v-if="
        (selectedState?.areas && selectedState.areas.length > 0) ||
        defaultAreas?.city
      "
      class="fade-in"
      :areas="cityAreas"
      :defaultArea="defaultAreas?.city"
      @onSelect="handleSelectCity"
    />
  </div>
</template>

<script lang="ts">
import CountrySelect from '@/components/weather/weather-widgets/weather-by-select/components/select/CountrySelect.vue';
import StateSelect from './components/select/StateSelect.vue';
import CitySelect from '@/components/weather/weather-widgets/weather-by-select/components/select/CitySelect.vue';
import { AreaType, IArea } from '@/models/area';

export default {
  name: 'WeatherBySelect',
  components: {
    CountrySelect,
    StateSelect,
    CitySelect,
  },
  props: {
    defaultAreas: {
      type: Object as () => AreaType | null,
      default: null,
    },
  },
  computed: {
    stateAreas(): IArea[] | null {
      return (
        this.selectedCountry?.areas || this.defaultAreas?.country?.areas || null
      );
    },
    cityAreas(): IArea[] | null {
      return (
        this.selectedState?.areas ||
        this.defaultAreas?.state?.areas ||
        this.defaultAreas?.country?.areas ||
        null
      );
    },
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
