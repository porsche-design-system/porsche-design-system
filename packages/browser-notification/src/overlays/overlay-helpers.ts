// TODO: extend array if new technologies are used
export const supportsUsedPDSTechnologies = (): boolean => {
  return !['IntersectionObserver', 'MutationObserver', 'customElements'].some((x) => !(x in window));
};

export const hasCookiesEnabled = (): boolean => (window.navigator || navigator).cookieEnabled;
