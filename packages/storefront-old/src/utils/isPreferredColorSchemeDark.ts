import Vue from 'vue';

export const isPreferredColorSchemeDark = (): boolean => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const handlersMap: Map<Vue, () => void> = new Map();

// singleton listener shared across entire app, also matchmedia-polyfill only implements addListener
window.matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', () => handlersMap.forEach((cb) => cb()));

export const onPrefersColorSchemeChange = (vueComponent: Vue, cb: () => void): void => {
  handlersMap.set(vueComponent, cb);
};

export const removeOnPrefersColorSchemeChange = (vueComponent: Vue): void => {
  handlersMap.delete(vueComponent);
};
