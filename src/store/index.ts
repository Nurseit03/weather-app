import { createStore } from 'vuex';
import notificationsModule from './notifications';

const store = createStore({
  modules: {
    notifications: notificationsModule,
  },
});

export default store;
