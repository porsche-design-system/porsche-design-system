import store from '../store';
import type { FrameworkMarkup } from '@/models';

/**
 * adjust selected framework on pages like styles/border where vanilla-js markup is not present
 */
export const adjustSelectedFramework = (markup: FrameworkMarkup): void => {
  const frameworks = Object.keys(markup);

  if (!frameworks.includes(store.getters.selectedFramework)) {
    store.commit('setSelectedFramework', frameworks[0]);
  }
};
