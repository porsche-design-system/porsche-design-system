import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    lastTimeout: undefined
  },
  mutations: {
    toggleLoading(state, payload) {
      state.loading = payload;
    },
    setLastTimeout(state, payload) {
      state.lastTimeout = payload;
    }
  },
  actions: {
    toggleLoadingAsync({commit, state}, payload) {
      const delay = 200;
      const timeout = setTimeout(() => {
        commit('toggleLoading', payload);
        commit('setLastTimeout', undefined);
      }, delay);
      clearTimeout(state.lastTimeout);
      commit('setLastTimeout', timeout);
    }
  },
  getters: {
    loading(state) {
      return state.loading;
    }
  }
});
