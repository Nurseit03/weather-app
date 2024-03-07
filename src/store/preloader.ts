import { Module } from 'vuex';

const preloaderModule: Module<any, any> = {
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
      console.log(1111);
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
