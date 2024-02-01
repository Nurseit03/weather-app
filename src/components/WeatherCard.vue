<template>
  <q-card class="my-card">
    <q-card-section>
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
          <span>{{ weatherData.main?.temp }}&deg;C</span>
        </div>
      </div>
      <div class="col text-center">
        <WeatherCardDetails :weatherData="weatherData" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import WeatherCardDetails from '@/components/WeatherCardDetails.vue';
import { IWeather } from '@/models/weather';
import { ICity } from '@/models/city';

export default {
  name: 'WeatherCard',
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
};
</script>

<style scoped>
.my-card {
  width: 100%;
}
</style>
