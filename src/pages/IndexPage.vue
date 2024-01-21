<template>
  <q-page class="row items-center justify-evenly">
    <weather-content
    ></weather-content>
  </q-page>
</template>

<script lang="ts">
import WeatherContent from 'components/WeatherContent.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  components: { WeatherContent },
});
</script>
