import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    lastTimeout: undefined,
    isMenuActive: false
  },
  mutations: {
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
    setLastTimeout(state, payload) {
      state.lastTimeout = payload;
    },
    setIsMenuActive(state, payload) {
      state.isMenuActive = payload;
    },
    toggleIsMenuActive(state) {
      state.isMenuActive = !state.isMenuActive;
    }
  },
  actions: {
    toggleLoadingAsync({commit, state}, payload) {
      const delay = 200;
      const timeout = setTimeout(() => {
        commit('setIsLoading', payload);
        commit('setLastTimeout', undefined);
      }, delay);
      clearTimeout(state.lastTimeout);
      commit('setLastTimeout', timeout);
    }
  },
  getters: {
    isLoading(state) {
      return state.isLoading;
    },
    isMenuActive(state) {
      return state.isMenuActive;
    }
  }
});
