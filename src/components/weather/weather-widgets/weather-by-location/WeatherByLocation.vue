<template>
  <div class="col text-black text-center">
    <div
      class="text-h5 text-weight-light"
      :class="{
        'text-dark': !$q.dark.isActive,
        'text-white': $q.dark.isActive,
      }"
    >
      {{ $t('Find out the weather in your city') }}
    </div>
    <q-separator
      size="1px"
      :color="$q.dark.isActive ? 'white' : 'black'"
      spaced
    />
    <div class="text-h6 text-weight-light pulse">
      <q-btn @click="getUserCoordinates" color="primary" class="fullWidth">
        <q-tooltip>
          {{ $t('Click to find out the weather in your city') }}
        </q-tooltip>
        <q-icon name="location_on" />{{ $t('Specify my location') }}
      </q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WeatherByLocation',
  props: {
    getUserCoordinates: {
      type: Function as () => any,
      required: true,
    },
  },
});
</script>

<style scoped>
.pulse {
  animation: pulse-animation 1.6s infinite;
}

@keyframes pulse-animation {
  0% {
    box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.2);
  }
  100% {
    box-shadow: 0 0 0 18px rgba(91, 164, 224, 0.281);
  }
}
</style>
