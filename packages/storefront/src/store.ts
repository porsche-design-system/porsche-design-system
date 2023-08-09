import Vue from 'vue';
import Vuex from 'vuex';
import type { Framework, Theme } from '@/models';

Vue.use(Vuex);

export type State = {
  isLoading: boolean;
  lastTimeout?: number;
  isMenuActive: boolean;
  isSearchActive: boolean;
  selectedFramework: Framework;
  theme: Theme;
};

const initialState: State = {
  isLoading: false,
  lastTimeout: undefined,
  isMenuActive: false,
  isSearchActive: false,
  selectedFramework: 'vanilla-js',
  theme: 'light',
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
    setIsSearchActive(state: State, payload: boolean): void {
      state.isSearchActive = payload;
    },
    setSelectedFramework(state: State, payload: Framework): void {
      state.selectedFramework = payload;
    },
    setTheme(state: State, payload: Theme): void {
      state.theme = payload;
    },
  },
  actions: {
    toggleLoadingAsync({ commit }, payload): void {
      commit('setIsLoading', payload);
    },
  },
  getters: {
    isLoading(state: State): boolean {
      return state.isLoading;
    },
    isMenuActive(state: State): boolean {
      return state.isMenuActive;
    },
    isSearchActive(state: State): boolean {
      return state.isSearchActive;
    },
    selectedFramework(state: State): Framework {
      return state.selectedFramework;
    },
    theme(state: State): Theme {
      return state.theme;
    },
  },
});
