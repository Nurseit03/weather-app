<template>
  <div class="custom-loader" :style="{ backgroundColor: bgColor }">
    <Vue3Lottie :animationData="animation" :width="width" :height="height" :delay="delay"/>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Vue3Lottie } from 'vue3-lottie';

const { animation, width, height, bgColor = 'inherit', delay = Infinity } = defineProps([
  'animation',
  'width',
  'height',
  'bgColor',
  'delay',
]);
</script>

<style scoped>
.custom-loader {
  position: absolute;
  display: flex;
  align-items: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
