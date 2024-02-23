import type { Metadata } from 'next';
import './globals.css';
import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react/ssr';
import {
  getFontFaceStylesheet,
  getFontLinks,
  getInitialStyles,
  getMetaTagsAndIconLinks,
} from '@porsche-design-system/components-react/partials';

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
        {getInitialStyles({ format: 'jsx' })}
        {getFontFaceStylesheet({ format: 'jsx' })}
        {getFontLinks({ format: 'jsx', weights: ['regular', 'semi-bold', 'bold'] })}
        {getMetaTagsAndIconLinks({ format: 'jsx', appTitle: 'Porsche Design System' })}
      </head>
      <body>
        <PorscheDesignSystemProvider>{children}</PorscheDesignSystemProvider>
      </body>
    </html>
  );
}
