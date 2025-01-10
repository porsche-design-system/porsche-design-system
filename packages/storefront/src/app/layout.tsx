import type { Metadata } from 'next';
import './globals.css';
import { Canvas } from '@/components/layout/Canvas';
import { HeaderPartials } from '@/partials/HeaderPartials';
import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react/ssr';

export const metadata: Metadata = {
  title: 'Porsche Design System',
  description:
    'Find all the fundamental UXI guidelines and pattern-based web components to build brand driven, consistent and intuitive designs for digital Porsche products.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <HeaderPartials />
      </head>
      <body>
        <PorscheDesignSystemProvider>
          <Canvas>{children}</Canvas>
        </PorscheDesignSystemProvider>
      </body>
    </html>
  );
}
