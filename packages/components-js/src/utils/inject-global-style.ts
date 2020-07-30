import { FONT_FACE_STYLE_CDN_URL } from '@porsche-design-system/utilities';

export const injectGlobalStyle = (): Promise<void> => {
  if (typeof document === 'undefined') {
    return;
  }
  const styleUrl =
    ROLLUP_REPLACE_IS_STAGING === 'production'
      ? FONT_FACE_STYLE_CDN_URL
      : 'http://localhost:3001/style/font-face.min.css';

  return new Promise((resolve) => {
    if (document.querySelector(`link[href="${styleUrl}"]`)) {
      resolve();
    } else {
      const link = document.createElement('link');
      link.href = styleUrl;
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.onload = () => resolve();

      document.getElementsByTagName('head')[0].appendChild(link);
    }
  });
};
