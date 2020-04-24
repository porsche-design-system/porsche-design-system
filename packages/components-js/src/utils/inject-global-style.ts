export const injectGlobalStyle = (): void => {
  if (typeof document === 'undefined') {
    return;
  }

  const link = document.createElement('link');
  link.href = 'https://cdn.ui.porsche.com/porsche-design-system/styles/v2/porsche-design-system.css';
  link.type = 'text/css';
  link.rel = 'stylesheet';
  document.getElementsByTagName('head')[0].appendChild(link);
};
