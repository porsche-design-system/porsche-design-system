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
        <link rel="icon" href="http://localhost:3001/meta-icons/favicon-32x32.5638ae59e85b68cac7febfffe555dbe7.png" />

        {getInitialStyles({ format: 'jsx' })}
        <link rel="stylesheet" href="http://localhost:3001/styles/font-face.min.css" />
        {Array.from(getFontLinks({ weights: ['regular', 'semi-bold', 'bold'] }).matchAll(/https:\/\/[a-z0-9./-]+/g))
          .map(([url]) => url.replace('https://cdn.ui.porsche.com/porsche-design-system', 'http://localhost:3001'))
          .map((url) => (
            <link key={url} rel="preload" href={url} as="font" type="font/woff2" crossOrigin="" />
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
