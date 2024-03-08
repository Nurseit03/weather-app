import { Module } from 'vuex';

interface PreloaderState {
  isLoading: boolean;
}

const preloaderModule: Module<PreloaderState, any> = {
  state: {
    isLoading: false,
  },
  mutations: {
    toggle(state): boolean {
      return (state.isLoading = !state.isLoading);
    },

    setLoading(state, payload: boolean): boolean {
      return (state.isLoading = payload);
    },
  },
  actions: {
    toggle({ commit }, payload: boolean) {
      commit('toggle', payload);
    },
    setLoading({ commit }, payload: boolean) {
      commit('setLoading', payload);
    },
  },
  getters: {
    isLoading(state): boolean {
      return state.isLoading;
    },
  },
};

export default preloaderModule;
