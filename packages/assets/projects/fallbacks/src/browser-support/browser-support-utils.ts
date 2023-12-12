export const hasPorscheDesignSystemBrowserSupport = (): boolean => {
  return !['IntersectionObserver', 'MutationObserver', 'customElements'].some((x) => !(x in window));
};
