<template>
  <q-card :class="['my-card', customClass]">
    <q-card-section class="col text-center">
      <div
        v-if="weatherData?.name"
        class="col text-center"
      >
        <div class="text-h5 text-weight-light">
          {{ weatherLocation }}
        </div>
        <q-separator
          size="1px"
          :color="$q.dark.isActive ? 'white' : 'black'"
          spaced
        />
        <div class="text-h1 text-weight-thin q-my-lg">
          <span>{{ currentTemperature }} </span>
        </div>
      </div>
      <div class="col text-center">
        <WeatherCardDetails
          :weatherData="weatherData"
          :tempUnitTab="tempUnitTab"
        />
      </div>
      <WeatherTempUnit
        v-model:tempUnitTab="tempUnitTab"
        @tempUnitTabChanged="handleTempUnitChange"
      />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import useConvert from '@/composables/useConvert';
import WeatherCardDetails from '@/components/weather/weather-card/WeatherCardDetails.vue';
import WeatherTempUnit from '@/components/weather/weather-widgets/WeatherTempUnit.vue';
import { IWeather, TemperatureUnit } from '@/models/weather';

export default {
  name: 'WeatherCard',
  data() {
    return {
      tempUnitTab: 'celsius' as TemperatureUnit,
    };
  },
  props: {
    customClass: {
      type: String,
      default: '',
    },
    weatherData: {
      type: Object as () => IWeather,
      required: true,
    },
  },
  components: {
    WeatherCardDetails,
    WeatherTempUnit,
  },
  methods: {
    handleTempUnitChange(newValue: TemperatureUnit) {
      this.tempUnitTab = newValue;
    },
  },
  computed: {
    currentTemperature(): string {
      const temperature = this.weatherData.main?.temp ?? 0;
      return useConvert().convertTemperature(
        temperature ?? 0,
        this.tempUnitTab,
        'celsius'
      );
    },
    weatherLocation(): string {
      const cityName = this.weatherData?.name || null;
      const locationDescription = cityName
        ? 'Weather in'
        : 'Weather in your city';

      return `${this.$t(locationDescription)} : ${cityName}`;
    },
  },
};
</script>

<style>
.my-card {
  width: 90vw;
  background-color: rgba(255, 255, 255, 0.13);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  @media (min-width: 768px) {
    width: 420px;
  }
}
</style>
