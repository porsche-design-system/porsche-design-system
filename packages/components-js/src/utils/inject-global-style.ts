export function injectGlobalStyle() {
  const link = document.createElement('link');
  link.href = 'https://cdn.ui.porsche.com/porsche-design-system/styles/v1/porsche-design-system.css';
  link.type = 'text/css';
  link.rel = 'stylesheet';
  document.getElementsByTagName('head')[0].appendChild(link);
}
