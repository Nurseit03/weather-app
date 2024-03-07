<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="header">
      <q-toolbar>
        <q-toolbar-title> {{ $t('Weather App') }} </q-toolbar-title>

        <div class="header__switchers">
          <LocaleSwitcher />
          <ThemeSwitcher />
          <PopupNotifications />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
  <LottieAnimation :animation="PageLoading" :width="200" :height="200" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LocaleSwitcher from '@/components/ui/LocaleSwitcher.vue';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher.vue';
import PopupNotifications from '@/components/ui/PopupNotifications.vue';
import { PageLoading } from '@/animations/weather';
import LottieAnimation from '@/components/ui/LottieAnimation.vue';

export default defineComponent({
  name: 'MainLayout',
  data: () => {
    return {
      PageLoading,
    };
  },
  components: {
    LocaleSwitcher,
    ThemeSwitcher,
    PopupNotifications,
    LottieAnimation,
  },
});
</script>

<style scoped>
.header {
  background-color: #231b1b;
}

.header__switchers {
  display: flex;
  gap: 20px;
}
</style>
