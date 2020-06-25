import { CDN_BASE_URL, FONT_FACE_CSS_NAME } from '@porsche-design-system/fonts';

export const injectGlobalStyle = (): void => {
  if (typeof document === 'undefined') {
    return;
  }

  const link = document.createElement('link');
  link.href =
    ROLLUP_REPLACE_IS_STAGING === 'production'
      ? `${CDN_BASE_URL}/${FONT_FACE_CSS_NAME}`
      : 'http://localhost:3001/fonts/font-face.min.css';
  link.type = 'text/css';
  link.rel = 'stylesheet';
  document.getElementsByTagName('head')[0].appendChild(link);
};
