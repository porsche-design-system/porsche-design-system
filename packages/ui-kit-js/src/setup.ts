export default () => {
  const link = document.createElement('link');
  link.href = 'http://cdn.ui.porsche.com/porsche-ui-kit/styles/v1/porsche-ui-kit.css';
  link.type = 'text/css';
  link.rel = 'stylesheet';
  document.getElementsByTagName( 'head')[0].appendChild(link);
};
