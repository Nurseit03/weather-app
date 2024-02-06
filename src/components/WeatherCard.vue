<template>
  <q-card class="my-card">
    <q-card-section class="col text-center">
      <div class="col text-black text-center">
        <div class="text-h4 text-weight-light">
          {{ $t('Country') + ':' + (cityData?.country ?? '') }}
        </div>
        <q-separator
          size="1px"
          :color="$q.dark.isActive ? 'white' : 'black'"
          spaced
        />
        <div class="text-h6 text-weight-light">
          {{ $t('City') + ':' + (cityData?.label ?? '') }}
        </div>
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
import WeatherCardDetails from '@/components/WeatherCardDetails.vue';
import WeatherTempUnit from '@/components/WeatherTempUnit.vue';
import { IWeather, TemperatureUnit } from '@/models/weather';
import { ICity } from '@/models/city';

export default {
  name: 'WeatherCard',
  data() {
    return {
      tempUnitTab: 'celsius' as TemperatureUnit,
    };
  },
  props: {
    weatherData: {
      type: Object as () => IWeather,
      required: true,
    },
    cityData: {
      type: Object as () => ICity,
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
      return useConvert().convertTemperature(temperature, this.tempUnitTab);
    },
  },
};
</script>

<style scoped>
.my-card {
  width: 100vw;
  @media (min-width: 768px) {
    width: 420px;
  }
}
</style>
