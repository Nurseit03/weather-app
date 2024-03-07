<template>
  <router-view />
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { onMounted } from 'vue';
import { onBeforeMount } from 'vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    const $q = useQuasar();

    $q.dark.set(false);

    const showLoading = () => {
      $q.loading.show();
    };

    const hideLoading = () => {
      $q.loading.hide();
    };

    onBeforeMount(() => {
      showLoading();
    });

    onMounted(() => {
      setTimeout(() => {
        hideLoading();
      }, 2000);
    });
  },
});
</script>
