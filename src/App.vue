<template>
  <router-view />
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { computed, onMounted } from 'vue';
import { onBeforeMount } from 'vue';
import { defineComponent } from 'vue';
import { mapActions, useStore } from 'vuex';

export default defineComponent({
  name: 'App',
  setup() {
    const $q = useQuasar();
    const $store = useStore();

    $q.dark.set(false);

    const showLoading = () => {
      $store.dispatch('setLoading', true);
      // $q.loading.show();
    };

    const hideLoading = () => {
      $store.dispatch('setLoading', false);
      // $q.loading.hide();
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
