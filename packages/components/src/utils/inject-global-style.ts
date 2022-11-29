import { FONT_FACE_CDN_URL } from '@porsche-design-system/styles';

export const injectGlobalStyle = (): void => {
  const styleUrl =
    ROLLUP_REPLACE_IS_STAGING === 'production' ? FONT_FACE_CDN_URL : 'http://localhost:3001/styles/font-face.min.css';
  if (!document.head.querySelector(`link[href="${styleUrl}"]`)) {
    const { head } = document;
    const link = document.createElement('link');
    link.href = styleUrl;
    link.type = 'text/css';
    link.rel = 'stylesheet';

    head.appendChild(link);
  }
};
