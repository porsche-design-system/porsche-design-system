import NextScript from 'next/script';
import type { PropsWithChildren } from 'react';
import { HeaderPartials } from '../components';
import { Providers } from './providers';
import './globals.css';

export default function RootLayout({ children }: PropsWithChildren<{}>): JSX.Element {
  const cdn = 'local';

  return (
    <html lang="en">
      <head>
        <title>Porsche Design System - NextJS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="http://localhost:3001/meta-icons/favicon-32x32.d42ac2876697ec701e95e4a4d608fb0e.png" />

        <HeaderPartials cdn={cdn} />
      </head>
      <body>
        <Providers>
          <div id="app">{children}</div>
        </Providers>
        <NextScript />
      </body>
    </html>
  );
}
