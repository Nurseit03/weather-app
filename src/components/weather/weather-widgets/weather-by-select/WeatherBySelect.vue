<template>
  <div class="q-gutter-md column">
    <CountrySelect
      class="fade-in"
      :defaultArea="countryDefaultArea"
      @onSelect="handleSelectCountry"
    />
    <StateSelect
      v-if="showState"
      class="fade-in"
      :areas="stateAreas"
      :defaultArea="stateDefaultArea"
      @onSelect="handleSelectState"
    />
    <CitySelect
      v-if="showCity"
      class="fade-in"
      :areas="cityAreas"
      :defaultArea="cityDefaultArea"
      @onSelect="handleSelectCity"
    />
  </div>
</template>

<script lang="ts">
import CountrySelect from '@/components/weather/weather-widgets/weather-by-select/components/select/CountrySelect.vue';
import StateSelect from '@/components/weather/weather-widgets/weather-by-select/components/select/StateSelect.vue';
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
      this.$emit('onLocationSelected', country);
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
    countryDefaultArea(): IArea | null {
      return this.defaultAreas?.country ?? null;
    },
    stateDefaultArea(): IArea | null {
      return this.defaultAreas?.state ?? null;
    },
    cityDefaultArea(): IArea | null {
      return this.defaultAreas?.city ?? null;
    },
    showState(): boolean {
      return !!(
        (this.selectedCountry?.areas &&
          this.selectedCountry?.areas?.length > 0) ||
        (this.defaultAreas?.country?.areas &&
          this.defaultAreas?.country?.areas.length > 0) ||
        this.defaultAreas?.state
      );
    },
    showCity(): boolean {
      return !!(
        (this.selectedState?.areas && this.selectedState?.areas?.length > 0) ||
        (this.defaultAreas?.state?.areas &&
          this.defaultAreas?.state?.areas.length > 0) ||
        this.defaultAreas?.city
      );
    },
  },
};
</script>
