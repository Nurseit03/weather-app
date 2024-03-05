import { boot } from 'quasar/wrappers';
import { createStore } from 'vuex';
import notificationsModule from '@/store/notifications';

export default boot(({ app }) => {
  const store = createStore({
    modules: {
      notifications: notificationsModule,
    },
  });

  app.provide('$store', store);
});