import { createStore } from 'vuex';
import notificationsModule from './notifications';
import preloaderModule from './preloader';
import weatherModule from './weather';
import { fetchCountries } from '@/api/areas/countries';

const store = createStore({
  modules: {
    notifications: notificationsModule,
    preloader: preloaderModule,
    weather: weatherModule,
  },
  plugins: [
    (store) => {
      fetchCountries().then((data) => data.json()).then((countriesData) => {
        store.commit('setCountriesData', countriesData);
      });
    },
  ],
});

export default store;
