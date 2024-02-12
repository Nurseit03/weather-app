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
          <div>{{ $t('Current') }}: {{ displayTemperature(weatherData.main?.temp) }}</div>
          <div>{{ $t('Minimal') }}: {{ displayTemperature(weatherData.main?.temp_min) }}</div>
          <div>{{ $t('Maximal') }}: {{ displayTemperature(weatherData.main?.temp_max) }}</div>
          <div>
            {{ $t('Feels like') }}: {{ displayTemperature(weatherData.main?.feels_like) }}
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
            style="object-fit: contain; width: 100%; height: 100%;"
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
import useConvert from '@/composables/useConvert';
import { IWeather, TemperatureUnit } from '@/models/weather';
import { PropType } from 'vue';

export default {
  name: 'WeatherCardDetails',
  props: {
    weatherData: {
      type: Object as () => IWeather,
      required: true,
    },
    tempUnitTab: {
      type: String as PropType<TemperatureUnit>,
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
    displayTemperature(temperature: number | undefined) {
      return useConvert().convertTemperature(temperature ?? 0, this.tempUnitTab, 'celsius');
    },
  },
};
</script>
