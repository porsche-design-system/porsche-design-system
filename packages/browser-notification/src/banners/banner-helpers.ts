export const isIEorEdgeHTML = (): boolean => {
  const match = /\b(MSIE |Trident.*?rv:|Edge\/)(\d+)/.exec(window.navigator.userAgent || navigator.userAgent);
  const msBrowserVersion = match ? parseInt(match[2]) : -1;
  return msBrowserVersion > 0 && msBrowserVersion <= 18;
};
