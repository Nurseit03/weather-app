import { createStore } from 'vuex';
import notificationsModule from './notifications';
import preloaderModule from './preloader';
import weatherModule from './weather';
import { fetchAndFilterCountries } from '@/services/areasService';

const store = createStore({
  modules: {
    notifications: notificationsModule,
    preloader: preloaderModule,
    weather: weatherModule,
  },
  plugins: [
    async (store) => {
      try {
        const filteredCountries = await fetchAndFilterCountries();
        store.commit('setCountriesData', filteredCountries);
      } catch (error) {
        console.error('Error in store initialization:', error);
      }
    },
  ],
});

export default store;
