import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

interface State {
  isLoading: boolean;
  lastTimeout: undefined;
  isMenuActive: boolean;
}

export default new Vuex.Store({
  state: {
    isLoading: false,
    lastTimeout: undefined,
    isMenuActive: false
  },
  mutations: {
    setIsLoading(state: State, payload): void {
      state.isLoading = payload;
    },
    setLastTimeout(state: State, payload): void {
      state.lastTimeout = payload;
    },
    setIsMenuActive(state: State, payload): void {
      state.isMenuActive = payload;
    },
    toggleIsMenuActive(state: State): void {
      state.isMenuActive = !state.isMenuActive;
    }
  },
  actions: {
    toggleLoadingAsync({commit, state}, payload): void {
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
    isLoading(state: State): boolean {
      return state.isLoading;
    },
    isMenuActive(state: State): boolean {
      return state.isMenuActive;
    }
  }
});
