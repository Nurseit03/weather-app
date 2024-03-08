<template>
  <LottieAnimation v-if="isLoading" :animation="PageLoading" :width="200" :height="200" :bgColor="'rgba(105, 105, 100, 0.534)'"/>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { PageLoading } from '@/animations/weather';
import LottieAnimation from '@/components/ui/LottieAnimation.vue';

const $store = useStore();

const isLoading = computed(() => $store.getters.isLoading);
</script>
