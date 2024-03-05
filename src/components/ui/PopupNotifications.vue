<template>
  <q-btn round icon="notifications" @click="showNotifications">
    <q-badge
      v-if="showBadge"
      :class="'fade-in'"
      floating
      color="red"
      rounded
    >
      {{ notifications.length }}
    </q-badge>
  </q-btn>
</template>

<script lang="ts">
import { computed, ComputedRef } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const $store = useStore();
    const notifications = computed(
      () => $store.getters['notifications/allNotifications']
    );

    const showBadge: ComputedRef<boolean> = computed(() => !!notifications.value && notifications.value.length > 0);

    const showNotifications = () => {
      console.log(notifications.value);
    };

    return {
      showBadge,
      notifications,
      showNotifications,
    };
  },
};
</script>
