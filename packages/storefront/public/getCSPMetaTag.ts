export const getCSPMetaTag = (): string => {
  const cdnUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://cdn.ui.porsche.com'
      : 'http://localhost:8080 http://localhost:3001';

  const connectUrls = [
    'https://*.algolia.net',
    'https://*.algolianet.com',
    'https://registry.npmjs.org/@porsche-design-system/components-js',
  ].join(' ');

  // TODO: Get rid of 'unsafe-inline' 'unsafe-eval' for script-src (difficult to get embedded Stackblitz example working)
  return `
    <meta http-equiv="Content-Security-Policy" content="
      default-src 'self' ${cdnUrl};
      frame-src https://stackblitz.com;
      style-src 'self' 'unsafe-inline' ${cdnUrl};
      script-src 'self' 'unsafe-inline' 'unsafe-eval' ${cdnUrl};
      img-src 'self' ${cdnUrl} data:;
      media-src 'self' https://porsche-design-system.github.io;
      connect-src 'self' ${connectUrls}" />`;
};
