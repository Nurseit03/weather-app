<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="header">
      <q-toolbar>
        <q-toolbar-title> {{ $t('Weather App') }} </q-toolbar-title>

        <div class="header__switchers">
          <LocaleSwitcher />
          <ThemeSwitcher />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import LocaleSwitcher from '@/components/ui/LocaleSwitcher.vue';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher.vue';

export default defineComponent({
  name: 'MainLayout',
  components: { LocaleSwitcher, ThemeSwitcher },
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
