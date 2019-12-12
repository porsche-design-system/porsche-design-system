export default () => {
  const link = document.createElement('link');
  link.href = 'https://cdn.ui.porsche.com/porsche-ui-kit/styles/v2/porsche-ui-kit.css';
  link.type = 'text/css';
  link.rel = 'stylesheet';
  document.getElementsByTagName('head')[0].appendChild(link);
};
