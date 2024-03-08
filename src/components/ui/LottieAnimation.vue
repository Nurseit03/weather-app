<template>
  <div :class="wrapperClass" :style="{ backgroundColor: bgColor }">
    <Vue3Lottie :animationData="animation" :width="width" :height="height" :delay="delay"/>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Vue3Lottie } from 'vue3-lottie';

const { animation, width, height, bgColor = 'inherit', delay = Infinity, wrapperClass } = defineProps([
  'animation',
  'width',
  'height',
  'bgColor',
  'delay',
  'wrapperClass'
]);
</script>
