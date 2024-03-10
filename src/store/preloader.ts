import { Module } from 'vuex';

interface PreloaderState {
  pageIsLoading: boolean;
}

const preloaderModule: Module<PreloaderState, any> = {
  state: {
    pageIsLoading: false,
  },
  mutations: {
    toggle(state): boolean {
      return (state.pageIsLoading = !state.pageIsLoading);
    },

    setPageIsLoading(state, payload: boolean): boolean {
      return (state.pageIsLoading = payload);
    },
  },
  actions: {
    toggle({ commit }, payload: boolean) {
      commit('toggle', payload);
    },
    setPageIsLoading({ commit }, payload: boolean) {
      commit('setPageIsLoading', payload);
    },
  },
  getters: {
    getPageIsLoading(state): boolean {
      return state.pageIsLoading;
    },
  },
};

export default preloaderModule;
