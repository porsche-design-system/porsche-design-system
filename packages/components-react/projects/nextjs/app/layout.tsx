import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react/ssr';
import NextScript from 'next/script';
import { Select } from '../components/Select';
import { FooterPartials, HeaderPartials } from '../components';
import { ComponentsReady } from './components-ready';

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
        <ComponentsReady>
          <PorscheDesignSystemProvider cdn="auto">
            <Select />
            <div id="app">{children}</div>
          </PorscheDesignSystemProvider>
          <NextScript />
          <FooterPartials cdn={cdn} />
        </ComponentsReady>
      </body>
    </html>
  );
}
