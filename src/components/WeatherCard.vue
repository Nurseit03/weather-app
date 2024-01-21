<template>
  <q-card v-if="weatherData.main" class="my-card">
    <q-card-section>
      <div class="col text-black text-center">
        <div class="text-h4 text-weight-light">Kyrgyzstan</div>
        <q-separator size="1px" color="black" spaced />
        <div class="text-h6 text-weight-light">Bishkek</div>
        <div class="text-h1 text-weight-thin q-my-lg">
          <span>{{ weatherData.main?.temp }}&deg;C</span>
        </div>
      </div>
      <div class="col text-center">
        <q-btn label="Детали">
          <WeatherCardDetails :weatherData="weatherData" />
        </q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import WeatherCardDetails from './WeatherCardDetails.vue';

export default {
  props: {
    weatherData: {
      type: Object,
      required: true,
    },
  },
  components: {
    WeatherCardDetails,
  },
};
</script>
