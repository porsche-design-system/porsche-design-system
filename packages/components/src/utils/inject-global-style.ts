import { getFontFaceCSS } from '@porsche-design-system/partials';

export const injectGlobalStyle = (): void => {
  if (typeof document === 'undefined') {
    return;
  }

  const styleUrl =
    ROLLUP_REPLACE_IS_STAGING === 'production'
      ? getFontFaceCSS({ withoutTags: true })
      : 'http://localhost:3001/styles/font-face.min.css';

  if (!document.querySelector(`link[href="${styleUrl}"]`)) {
    const link = document.createElement('link');
    link.href = styleUrl;
    link.type = 'text/css';
    link.rel = 'stylesheet';

    document.getElementsByTagName('head')[0].appendChild(link);

    const partial = getFontFaceCSS();
    console.warn(`The Porsche Design System had to inject our font-face.css file into your head. Please preload it with '${partial}' in the head of your 'index.html'.
If you are already preloading font-face.css please update your snippet to '${partial}'.
You find further documentation and examples on how to implement preloading at https://designsystem.porsche.com/v2/#/performance/loading-behaviour`);
  }
};
