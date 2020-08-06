import { FONT_FACE_STYLE_CDN_URL } from '@porsche-design-system/utilities';
import { fontFaceCssElement } from '@porsche-design-system/assets';

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
      console.warn(`The Porsche Design System had to inject our font-face.css file into your head. If you already reload pls check the ${fontFaceCssElement} for changes and renew it. You can find
      further documentation and examples on how to implement preloading at https://designsystem.porsche.com/v1/#/helpers/flash-of-unstyled-content`);
    }
  });
};
