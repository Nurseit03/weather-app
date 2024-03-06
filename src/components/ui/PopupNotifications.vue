<template>
  <q-btn round icon="notifications">
    <q-badge v-if="showBadge" :class="'fade-in'" floating color="red" rounded>
      {{ notifications.length }}
    </q-badge>

    <q-menu anchor="top right" self="bottom right" @before-hide="resetOffset">
      <q-list v-if="notifications?.length > 0" link class="notifications-list">
        <q-infinite-scroll
          @load="onLoadMenu"
          :offset="280"
          :scroll-target="scrollTargetRef"
          :can-load="canLoadMore"
        >
          <q-item
            v-for="notification in displayedNotifications"
            :key="notification.id"
          >
            <div class="q-item__section text-caption text-left text-bold">
              <q-item-section>{{ notification?.message }}</q-item-section>
              <q-item-section
                left
                :class="{
                  'notification-date': true,
                  'text-smoke': $q.dark.isActive,
                }"
                >{{ formatDate(notification?.date) }}</q-item-section
              >
            </div>
          </q-item>
          <template v-slot:loading v-if="canLoadMore">
            <div class="text-center q-my-md">
              <q-spinner-dots color="primary" size="40px" />
            </div>
          </template>
        </q-infinite-scroll>
        <q-item-label class="text-center">
          <q-btn
            :label="$t('Close')"
            v-close-popup
            @click="onCloseMenu"
            class="full-width"
          />
        </q-item-label>
      </q-list>
      <q-item v-else>
        <q-item-section class="caption text-center text-bold">
          {{ $t('No notifications') }}
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
    const scrollTargetRef = ref(null);

    const initOffset = 3;
    const offset = ref(initOffset);

    const notifications = computed(() => $store.getters.allNotifications);
    const showBadge = computed(
      () => !!notifications.value && notifications.value.length > 0
    );

    const formatDate = (date: Date): string => {
      return format(date, 'dd.MM.yyyy hh:mm');
    };

    const displayedNotifications = computed(() =>
      notifications.value.slice(0, offset.value)
    );

    const loadMoreNotifications = () => {
      offset.value += 5;
    };

    const canLoadMore = computed(() => {
      return offset.value < notifications.value.length;
    });

    const resetOffset = () => {
      offset.value = initOffset;
    };

    const onLoadMenu = (index: number, done: any) => {
      if (canLoadMore.value) {
        setTimeout(() => {
          loadMoreNotifications();
          done();
        }, 2000);
      } else {
        done();
      }
    };

    const onCloseMenu = () => {
      resetOffset();
    };

    return {
      offset,
      showBadge,
      formatDate,
      onLoadMenu,
      onCloseMenu,
      resetOffset,
      notifications,
      scrollTargetRef,
      loadMoreNotifications,
      displayedNotifications,
      canLoadMore,
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

.text-smoke {
  color: rgba(255, 255, 255, 0.6);
}
</style>
