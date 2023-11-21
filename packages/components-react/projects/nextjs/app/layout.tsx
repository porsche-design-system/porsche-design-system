import NextScript from 'next/script';
import type { PropsWithChildren } from 'react';
import { FooterPartials, HeaderPartials } from '../components';
import { Providers } from './providers';

export default function RootLayout({ children }: PropsWithChildren<{}>): JSX.Element {
  const cdn = 'local';

  return (
    <html lang="en">
      <head>
        <title>Porsche Design System - NextJS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="http://localhost:3001/meta-icons/favicon-32x32.5638ae59e85b68cac7febfffe555dbe7.png" />

        <HeaderPartials cdn={cdn} />
      </head>
      <body>
        <Providers>
          <div id="app">{children}</div>
        </Providers>
        <NextScript />
        <FooterPartials cdn={cdn} />
      </body>
    </html>
  );
}
