<template>
  <q-btn
    :label="$t('Details')"
    @click="togglePopup"
    style="margin-bottom: 10px"
    :icon="isPopupOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
  />
  <q-popup
    transition-show="flip-right"
    transition-hide="flip-left"
    anchor="bottom right"
    self="bottom left"
    v-show="!!isPopupOpen"
  >
    <q-list>
      <q-item clickable v-ripple v-show="weatherData.main">
        <q-item-section>{{ $t('Temperature') }}</q-item-section>
        <q-item-section>
          <div>{{ $t('Current') }}: {{ weatherData.main?.temp }}F&deg;</div>
          <div>{{ $t('Minimal') }}: {{ weatherData.main?.temp_min }}&deg;</div>
          <div>{{ $t('Maximal') }}: {{ weatherData.main?.temp_max }}&deg;</div>
          <div>
            {{ $t('Feels like') }}: {{ weatherData.main?.feels_like }}&deg;
          </div>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item clickable v-ripple v-show="weatherData.main?.humidity">
        <q-item-section>{{ $t('Humidity') }}</q-item-section>
        <q-item-section>
          <div>{{ weatherData.main?.humidity }} %</div>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item clickable v-ripple v-show="weatherData.main?.pressure">
        <q-item-section>{{ $t('Pressure') }}</q-item-section>
        <q-item-section>
          <div>{{ weatherData.main?.pressure }} hPa</div>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item clickable v-ripple v-show="weatherData.wind">
        <q-item-section>{{ $t('Wind') }}</q-item-section>
        <q-item-section>
          <div>{{ $t('Speed') }}: {{ weatherData.wind?.speed }} м/с</div>
          <div>{{ $t('Direction') }}: {{ weatherData.wind?.deg }}&deg;</div>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple v-show="weatherData.weather">
        <q-item-section>
          <img
            :src="`https://openweathermap.org/img/wn/${weatherData?.weather?.[0]?.icon}@2x.png`"
          />
        </q-item-section>
        <q-item-section>
          {{ $t(weatherData.weather?.[0]?.main || 'Undefined') }}
        </q-item-section>
      </q-item>
    </q-list>
  </q-popup>
</template>

<script lang="ts">
import { IWeather } from '../models/weather';

export default {
  name: 'WeatherCardDetails',
  props: {
    weatherData: {
      type: Object as () => IWeather,
      required: true,
    },
  },
  data() {
    return {
      isPopupOpen: false,
    };
  },
  methods: {
    togglePopup() {
      this.isPopupOpen = !this.isPopupOpen;
    },
  },
};
</script>
