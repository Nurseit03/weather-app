<template>
  <q-btn round icon="notifications">
    <q-badge v-if="showBadge" :class="'fade-in'" floating color="red" rounded>
      {{ notifications.length }}
    </q-badge>

    <q-menu anchor="top right" self="bottom right">
      <q-list v-if="notifications?.length > 0" link class="notifications-list">
        <q-item
          v-for="notification in displayedNotifications"
          :key="notification.id"
        >
          <div class="q-item__section text-caption text-left text-bold">
            <q-item-section>{{ notification?.message }}</q-item-section>
            <q-item-section left class="notification-date">{{
              formatDate(notification?.date)
            }}</q-item-section>
          </div>
        </q-item>
      </q-list>
      <q-item v-else>
        <q-item-section class="caption text-center text-bold">
          {{ $t('No notifications') }}
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section class="text-center">
          <q-btn :label="$t('Close')" v-close-popup />
        </q-item-section>
      </q-item>
    </q-menu>
  </q-btn>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { format } from 'date-fns';

export default {
  setup() {
    const $store = useStore();
    const notifications = computed(() => $store.getters.allNotifications);
    const showBadge = computed(
      () => !!notifications.value && notifications.value.length > 0
    );

    function formatDate(date: Date): string {
      return format(date, 'dd.MM.yyyy hh:mm');
    }

    const offset = ref(5);
    const displayedNotifications = computed(() =>
      notifications.value.slice(0, offset.value)
    );

    const loadMoreNotifications = () => {
      offset.value += 5;
    };

    return {
      offset,
      showBadge,
      formatDate,
      notifications,
      loadMoreNotifications,
      displayedNotifications,
    };
  },
};
</script>

<style scoped>
.notifications-list {
  max-width: 240px !important;
  max-height: 280px !important;
}
.notification-date {
  margin: 0;
  color: rgba(0, 0, 0, 0.6);
}
</style>
