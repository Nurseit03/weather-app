<template>
  <div class="custom-loader">
    <Vue3Lottie :animationData="animation" :width="width" :height="height" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Vue3Lottie } from 'vue3-lottie';

const { animation, width, height } = defineProps([
  'animation',
  'width',
  'height',
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
  background-color: rgba(105, 105, 100, 0.534);
}
</style>
