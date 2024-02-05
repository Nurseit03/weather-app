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
        <WeatherCardDetails :weatherData="weatherData" :isCelsius="isCelsius" />
      </div>
      <q-tabs v-model="activeTab" dense narrow-indicator class="text-center">
        <q-tab name="celsius" label="Celsius" />
        <q-tab name="fahrenheit" label="Fahrenheit" />
      </q-tabs>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import useConvert from '@/composables/useConvert';
import WeatherCardDetails from '@/components/WeatherCardDetails.vue';
import { IWeather } from '@/models/weather';
import { ICity } from '@/models/city';

export default {
  name: 'WeatherCard',
  data() {
    return {
      activeTab: 'celsius',
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
  },
  computed: {
    isCelsius(): boolean {
      return this.activeTab === 'celsius';
    },
    currentTemperature(): string {
      const temperature = this.weatherData.main?.temp ?? 0;
      const unit = this.isCelsius ? 'celsius' : 'fahrenheit';
      return useConvert().convertTemperature(temperature, unit);
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
