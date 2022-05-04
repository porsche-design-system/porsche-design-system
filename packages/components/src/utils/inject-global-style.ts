import { FONT_FACE_CDN_URL } from '@porsche-design-system/styles';
import { TAG_NAMES } from '@porsche-design-system/shared';

export const injectGlobalStyle = (): void => {
  if (typeof document === 'undefined') {
    return;
  }

  const styleUrl =
    ROLLUP_REPLACE_IS_STAGING === 'production' ? FONT_FACE_CDN_URL : 'http://localhost:3001/styles/font-face.min.css';

  const { head } = document;
  if (!head.querySelector(`link[href="${styleUrl}"]`)) {
    const link = document.createElement('link');
    link.href = styleUrl;
    link.type = 'text/css';
    link.rel = 'stylesheet';

    head.appendChild(link);

    console.warn(`The Porsche Design System had to inject our font-face.css file into your head. Please preload it in the head of your 'index.html'.
You find detailed documentation and examples on how to implement preloading at https://designsystem.porsche.com/v2/performance/loading-behaviour`);
  }

  if (!head.querySelector('style[pds-initial-styles]')) {
    const style = document.createElement('style');
    style.setAttribute('pds-initial-styles', '');
    style.innerText = TAG_NAMES.join(',') + '{visibility:hidden}.hydrated{visibility:inherit}';

    head.appendChild(style);

    console.warn(
      `The Porsche Design System had to inject its initial styles into your head.
Please make sure to apply the 'getInitialStyles()' partial as described at https://designsystem.porsche.com/v2/partials/initial-styles`
    );
  }
};
