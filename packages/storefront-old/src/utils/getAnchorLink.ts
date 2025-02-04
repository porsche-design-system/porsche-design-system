export const getAnchorLink = (id: string): string => {
  // strip away base href url path
  const baseHref = document.querySelector('base')!.getAttribute('href')!;
  const currentUrl = document.location.pathname.replace(baseHref, '');

  return currentUrl + '#' + id;
};
