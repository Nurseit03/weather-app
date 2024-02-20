<template>
  <q-page class="row items-center justify-evenly">
    <weather-content></weather-content>
  </q-page>
</template>

<script lang="ts">
import WeatherContent from '@/components/weather/WeatherContent.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  components: { WeatherContent },
});
</script>

<style>
.fade-out {
  animation: fade-out 0.9s ease-in-out;
}

.fade-in {
  animation: fade-in 0.9s ease-in-out;
}

@keyframes fade-out {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
