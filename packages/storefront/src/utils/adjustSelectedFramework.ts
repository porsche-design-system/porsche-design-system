import store from '../store';
import type { FrameworkMarkup } from '@/models';

/**
 * adjust selected framework on pages like styles/border where don't have vanilla-js markup
 */
export const adjustSelectedFramework = (markup: FrameworkMarkup): void => {
  const frameworks = Object.keys(markup);

  if (!frameworks.includes(store.getters.selectedFramework)) {
    store.commit('setSelectedFramework', frameworks[0]);
  }
};
