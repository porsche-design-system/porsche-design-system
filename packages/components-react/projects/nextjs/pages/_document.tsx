import { Head, Html, Main, NextScript } from 'next/document';
import {
  getBrowserSupportFallbackScript,
  getCookiesFallbackScript,
  getDSRPonyfill,
  getFontLinks,
  getInitialStyles,
} from '@porsche-design-system/components-react/partials';
import { getSharedStyles } from '../styles/getSharedStyles';

const Document = (): JSX.Element => {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="http://localhost:3001/meta-icons/favicon-32x32.10be24507223bc4ef63effe0eb750e58.png" />

        {getInitialStyles({ format: 'jsx', normalize: true })}
        <link rel="stylesheet" href="http://localhost:3001/styles/font-face.min.css" />
        {getFontLinks({ weights: ['thin', 'regular', 'semi-bold', 'bold'], withoutTags: true })
          .map((x) => x.replace('https://cdn.ui.porsche.com/porsche-design-system', 'http://localhost:3001'))
          .map((url) => (
            <link key={url} rel="preload" href={url} as="font" type="font/woff2" crossOrigin="true" />
          ))}
        {getSharedStyles()}
      </Head>
      <body>
        <Main />
        <NextScript />
        {getDSRPonyfill({ format: 'jsx' })}
        {getBrowserSupportFallbackScript({ format: 'jsx' })}
        {getCookiesFallbackScript({ format: 'jsx' })}
      </body>
    </Html>
  );
};

export default Document;
