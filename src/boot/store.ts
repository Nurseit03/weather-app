import { boot } from 'quasar/wrappers';
import { createStore } from 'vuex';
import notificationsModule from '@/store/notifications';
import preloaderModule from '@/store/preloader';

export default boot(({ app }) => {
  const store = createStore({
    modules: {
      notifications: notificationsModule,
      preloader: preloaderModule,
    },
  });

  app.provide('$store', store);
});
