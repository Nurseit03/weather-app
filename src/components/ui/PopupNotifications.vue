<template>
  <q-btn round icon="notifications" @click="showNotifications">
    <q-badge v-if="showBadge" :class="'fade-in'" floating color="red" rounded>
      {{ notifications.length }}
    </q-badge>

    <q-menu anchor="top right" self="bottom right">
      <q-list v-if="notifications?.length > 0" link>
        <q-item
          v-for="notification in displayedNotifications"
          :key="notification.id"
        >
          <q-item-section>{{ notification?.message }}</q-item-section>
          <q-item-section side top>{{ notification?.date }}</q-item-section>
        </q-item>
        <q-infinite-scroll :handler="loadMoreNotifications" :offset="offset">
          <template v-slot:loading> Загрузка... </template>
        </q-infinite-scroll>
      </q-list>
      <q-item v-else>
        <q-item-section class="text-caption text-center text-bold">
          Нет уведомлений
        </q-item-section>
      </q-item>
    </q-menu>
  </q-btn>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const $store = useStore();
    const notifications = computed(
      () => $store.getters['notifications/allNotifications']
    );
    const showBadge = computed(
      () => !!notifications.value && notifications.value.length > 0
    );

    const showMenu = ref(false);
    const offset = ref(5); 
    const displayedNotifications = computed(() =>
      notifications.value.slice(0, offset.value)
    );

    const showNotifications = () => {
      showMenu.value = !showMenu.value;
    };

    const loadMoreNotifications = () => {
      offset.value += 5; 
    };

    return {
      showBadge,
      notifications,
      showNotifications,
      showMenu,
      offset,
      displayedNotifications,
      loadMoreNotifications,
    };
  },
};
</script>
