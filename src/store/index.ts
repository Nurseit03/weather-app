import { createStore } from 'vuex';
import notificationsModule from './notifications';
import preloaderModule from './preloader';

const store = createStore({
  modules: {
    notifications: notificationsModule,
    preloader: preloaderModule,
  },
});

export default store;
