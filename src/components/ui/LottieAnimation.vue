<template>
  <div class="custom-loader">
    <Vue3Lottie
      :animationData="animation"
      :width="width"
      :height="height"
    />
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
