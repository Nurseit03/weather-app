<template>
  <router-view />
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { onMounted } from 'vue';
import { onBeforeMount } from 'vue';
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'App',
  setup() {
    const $q = useQuasar();
    const $store = useStore();

    $q.dark.set(false);

    const showLoading = () => {
      $store.dispatch('setLoading', true);
    };

    const hideLoading = () => {
      $store.dispatch('setLoading', false);
    };

    onBeforeMount(() => {
      showLoading();
    });

    onMounted(() => {
      setTimeout(() => {
        hideLoading();
      }, 3000);
    });
  },
});
</script>
