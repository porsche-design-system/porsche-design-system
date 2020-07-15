import { STYLE_CDN_URL } from '@porsche-design-system/assets';

export const injectGlobalStyle = (): void => {
  if (typeof document === 'undefined') {
    return;
  }

  const link = document.createElement('link');
  link.href = ROLLUP_REPLACE_IS_STAGING === 'production' ? STYLE_CDN_URL : 'http://localhost:3001/style/style.min.css';
  link.type = 'text/css';
  link.rel = 'stylesheet';
  document.getElementsByTagName('head')[0].appendChild(link);
};
