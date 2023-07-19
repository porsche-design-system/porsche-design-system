import { FONT_FACE_CDN_FILE_COM, FONT_FACE_CDN_FILE_CN } from '@porsche-design-system/styles'; // TODO: import from assets once it is treeshakable
import { getCDNBaseURL } from './getCDNBaseURL';

// TODO: should be removed, instead consumers should be forced via validation to use the partial for preloading
export const injectGlobalStyle = (): void => {
  if (typeof document !== 'undefined' && ROLLUP_REPLACE_IS_STAGING === 'production') {
    const baseUrl = getCDNBaseURL();
    const styleUrl = `${baseUrl}/styles/${baseUrl.match(/\.cn\//) ? FONT_FACE_CDN_FILE_CN : FONT_FACE_CDN_FILE_COM}`;
    const { head } = document;
    if (!head.querySelector(`link[href="${styleUrl}"]`)) {
      const link = document.createElement('link');
      link.href = styleUrl;
      link.type = 'text/css';
      link.rel = 'stylesheet';

      head.appendChild(link);
    }
  }
};
