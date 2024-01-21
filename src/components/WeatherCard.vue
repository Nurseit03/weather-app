<template>
  <div>
    <p>{{ title }}</p>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
} from 'vue';
import { Weather } from '../models/weather';

export default defineComponent({
  name: 'WeatherCard',
  props: {
    title: {
      type: String as PropType<Weather['title']>,
      required: true
    }
  },
  setup (props) {
    return {};
  },
});
</script>
