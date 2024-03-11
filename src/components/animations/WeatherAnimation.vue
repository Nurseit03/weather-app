<template>
  <LottieAnimation :animation="weatherAnimation" :width="200" :height="200" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  WeatherClearDay,
  WeatherClearNight,
  WeatherRainDay,
  WeatherRainNight,
  WeatherStorm,
  WeatherMist,
  WeatherClouds,
  WeatherSnow,
} from '@/animations/weather';
import LottieAnimation from '@/components/ui/LottieAnimation.vue';

interface WeatherAnimationProps {
  weatherCondition: string;
}

const props: WeatherAnimationProps = defineProps<WeatherAnimationProps>();

const weatherCondition = computed(() => props?.weatherCondition);

const weatherAnimations: Record<string, any> = {
  // дневные анимации
  '01d': WeatherClearDay,
  '02d': WeatherClouds,
  '03d': WeatherClouds,
  '04d': WeatherClouds,
  '09d': WeatherRainDay,
  '10d': WeatherRainDay,
  '11d': WeatherStorm,
  '13d': WeatherSnow,
  '50d': WeatherMist,

  // ночные анимации
  '01n': WeatherClearNight, 
  '02n': WeatherClouds, //
  '03n': WeatherClouds, //
  '04n': WeatherClouds,
  '09n': WeatherRainDay,
  '10n': WeatherRainNight, 
  '11n': WeatherStorm,
  '13n': WeatherSnow,
  '50n': WeatherMist,
};

const weatherAnimation = computed(() => {
  const animation = weatherAnimations[weatherCondition.value];
  if (animation) {
    return animation;
  } else {
    console.warn('Unknown weather condition:', weatherCondition.value);
    return null;
  }
});
</script>
