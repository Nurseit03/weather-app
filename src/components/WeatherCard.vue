<template>
  <q-card class="my-card">
    <q-card-section>
      <div class="col text-black text-center">
        <div class="text-h4 text-weight-light">
          {{ $t('Country') + ':' }}
        </div>
        <q-separator
          size="1px"
          :color="$q.dark.isActive ? 'white' : 'black'"
          spaced
        />
        <div class="text-h6 text-weight-light">
          {{ $t('City') + ':' }}
        </div>
        <div class="text-h1 text-weight-thin q-my-lg">
          <span>{{ weatherData.main?.temp }}&deg;C</span>
        </div>
      </div>
      <div class="col text-center">
        <q-btn :label="$t('Details')">
          <WeatherCardDetails :weatherData="weatherData" />
        </q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import WeatherCardDetails from './WeatherCardDetails.vue';
import { IWeather } from '../models/weather';

export default {
  props: {
    weatherData: {
      type: Object as () => IWeather,
      required: true,
    },
  },
  components: {
    WeatherCardDetails,
  },
};
</script>

<style scoped>
.my-card {
  width: 100%;
}
</style>
