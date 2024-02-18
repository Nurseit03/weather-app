<template>
  <q-tabs v-model="tempUnit" dense narrow-indicator class="text-center">
    <q-tab name="celsius" :label="$t('Celsius')" />
    <q-tab name="fahrenheit" :label="$t('Fahrenheit')" />
  </q-tabs>
</template>

<script lang="ts">
import { TemperatureUnit } from '@/models/weather';

export default {
  name: 'WeatherTempUnit',
  props: {
    tempUnitTab: {
      type: String as () => TemperatureUnit,
      required: true,
    },
  },
  emits: ['tempUnitTabChanged'],
  computed: {
    tempUnit: {
      get() {
        return this.tempUnitTab;
      },
      set(newValue: TemperatureUnit) {
        this.$emit('tempUnitTabChanged', newValue);
      },
    },
  },
};
</script>
