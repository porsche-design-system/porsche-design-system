import Vue from 'vue';
import Vuex from 'vuex';
import {
  type Framework,
  type PlaygroundDir,
  type PlaygroundTheme,
  type StorefrontTheme,
  FRAMEWORK_TYPES,
  PLAYGROUND_DIR_TYPES,
  PLAYGROUND_THEME_TYPES,
} from '@/models';

Vue.use(Vuex);

const sanitizeSelectedFrameworkValue = (value: string | null): Framework =>
  (FRAMEWORK_TYPES.includes(value as Framework) ? value : 'vanilla-js') as Framework;

const sanitizePlaygroundThemeValue = (value: string | null): PlaygroundTheme =>
  (PLAYGROUND_THEME_TYPES.includes(value as PlaygroundTheme) ? value : 'light') as PlaygroundTheme;

const sanitizePlaygroundDirValue = (value: string | null): PlaygroundDir =>
  (PLAYGROUND_DIR_TYPES.includes(value as PlaygroundDir) ? value : 'ltr') as PlaygroundDir;

export type State = {
  isLoading: boolean;
  isMenuActive: boolean;
  isSearchActive: boolean;
  selectedFramework: Framework;
  playgroundDir: PlaygroundDir;
  playgroundTheme: PlaygroundTheme;
  storefrontTheme: StorefrontTheme;
};

const initialState: State = {
  isLoading: false,
  isMenuActive: false,
  isSearchActive: false,
  selectedFramework: sanitizeSelectedFrameworkValue(localStorage.getItem('selectedFramework')),
  playgroundDir: sanitizePlaygroundDirValue(localStorage.getItem('playgroundDir')),
  playgroundTheme: sanitizePlaygroundThemeValue(localStorage.getItem('playgroundTheme')),
  storefrontTheme: 'auto',
};

export default new Vuex.Store({
  state: initialState,
  mutations: {
    setIsLoading(state: State, payload: boolean): void {
      state.isLoading = payload;
    },
    setIsMenuActive(state: State, payload: boolean): void {
      state.isMenuActive = payload;
    },
    setIsSearchActive(state: State, payload: boolean): void {
      state.isSearchActive = payload;
    },
    setSelectedFramework(state: State, payload: Framework): void {
      localStorage.setItem('selectedFramework', payload);
      state.selectedFramework = payload;
    },
    setPlaygroundDir(state: State, payload: PlaygroundDir): void {
      localStorage.setItem('playgroundDir', payload);
      state.playgroundDir = payload;
    },
    setPlaygroundTheme(state: State, payload: PlaygroundTheme): void {
      localStorage.setItem('playgroundTheme', payload);
      state.playgroundTheme = payload;
    },
    setStorefrontTheme(state: State, payload: StorefrontTheme): void {
      state.storefrontTheme = payload;
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
    playgroundDir(state: State): PlaygroundDir {
      return state.playgroundDir;
    },
    playgroundTheme(state: State): PlaygroundTheme {
      return state.playgroundTheme;
    },
    storefrontTheme(state: State): StorefrontTheme {
      return state.storefrontTheme;
    },
  },
});
