export const injectGlobalStyle = (styleUrl: string): void => {
  const { head } = document;
  const link = document.createElement('link');
  link.href = styleUrl;
  link.type = 'text/css';
  link.rel = 'stylesheet';

  head.appendChild(link);
};
