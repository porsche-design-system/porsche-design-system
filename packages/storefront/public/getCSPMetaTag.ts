export const getCSPMetaTag = (): string => {
  const cdnUrl = 'https://cdn.ui.porsche.com';

  const connectUrls = [
    'https://*.algolia.net',
    'https://*.algolianet.com',
    'https://registry.npmjs.org/@porsche-design-system/components-js',
  ].join(' ');

  return process.env.NODE_ENV === 'production'
    ? `
    <meta http-equiv="Content-Security-Policy" content="
      default-src 'self' ${cdnUrl};
      style-src 'self' 'unsafe-inline' ${cdnUrl};
      script-src 'self' 'unsafe-inline' 'unsafe-eval' ${cdnUrl};
      img-src 'self' ${cdnUrl} data:;
      media-src 'self' https://porsche-design-system.github.io;
      connect-src 'self' ${connectUrls}" />`
    : '';
};
