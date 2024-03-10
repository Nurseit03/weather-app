<template>
  <LottieAnimation
    v-if="isLoading"
    :animation="PageLoading"
    :width="200"
    :height="200"
    :class="'page-preloader'"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { PageLoading } from '@/animations/weather';
import LottieAnimation from '@/components/ui/LottieAnimation.vue';

const $store = useStore();

const isLoading = computed(() => $store.getters.getPageIsLoading);
</script>

<style>
.page-preloader {
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
