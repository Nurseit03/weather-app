<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="header">
      <q-toolbar>
        <q-toolbar-title> Weather App </q-toolbar-title>

        <LocaleSwitcher />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import LocaleSwitcher from '../components/ui/LocaleSwitcher.vue';

export default defineComponent({
  name: 'MainLayout',

  components: { LocaleSwitcher },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

<style scoped>
.header {
  background-color: #231b1b;
}
</style>
