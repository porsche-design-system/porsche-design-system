export function injectGlobalStyle() {
  const link = document.createElement('link');
  link.href = 'https://cdn.ui.porsche.com/porsche-ui-kit/styles/v3/porsche-ui-kit.css';
  link.type = 'text/css';
  link.rel = 'stylesheet';
  document.getElementsByTagName('head')[0].appendChild(link);
}
