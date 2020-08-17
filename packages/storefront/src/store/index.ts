import Vue from 'vue';
import Vuex from 'vuex';
import { Framework } from '@/models';

Vue.use(Vuex);

export type State = {
  isLoading: boolean;
  lastTimeout?: number;
  isMenuActive: boolean;
  selectedFramework: Framework;
};

const initialState: State = {
  isLoading: false,
  lastTimeout: undefined,
  isMenuActive: false,
  selectedFramework: 'vanilla-js'
};

export default new Vuex.Store({
  state: initialState,
  mutations: {
    setIsLoading(state: State, payload: boolean): void {
      state.isLoading = payload;
    },
    setLastTimeout(state: State, payload): void {
      state.lastTimeout = payload;
    },
    setIsMenuActive(state: State, payload: boolean): void {
      state.isMenuActive = payload;
    },
    toggleIsMenuActive(state: State): void {
      state.isMenuActive = !state.isMenuActive;
    },
    setSelectedFramework(state: State, payload: Framework): void {
      state.selectedFramework = payload;
    }
  },
  actions: {
    toggleLoadingAsync({ commit, state }, payload): void {
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
    },
    selectedFramework(state: State): Framework {
      return state.selectedFramework;
    }
  }
});
