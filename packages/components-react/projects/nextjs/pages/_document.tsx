import { Head, Html, Main, NextScript } from 'next/document';
import { getInitialStyles } from '@porsche-design-system/components-react/partials';

const Document = (): JSX.Element => {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <title>Porsche Design System - NextJS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="http://localhost:3001/meta-icons/favicon-32x32.10be24507223bc4ef63effe0eb750e58.png" />

        <link rel="stylesheet" href="http://localhost:3001/styles/font-face.min.css" />
        {getInitialStyles({ format: 'jsx' })}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
