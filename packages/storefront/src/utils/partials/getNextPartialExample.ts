import type { Partials } from '@/models/partials';

export const getNextPartialExample = (name: Partials) => {
  return nextExamples[name];
};

const nextExamples: {
  [partial in Partials]: string;
} = {
  getMetaTagsAndIconLinks: `/* ./app/layout.tsx */
import type { Metadata, Viewport } from "next";
import { getMetaTagsAndIconLinks } from '@porsche-design-system/components-react/partials';

const { themeColor, appleWebApp, icons, manifest } = getMetaTagsAndIconLinks({
  appTitle: 'TITLE_OF_YOUR_APP',
  format: 'js',
  /* cdn: 'cn' // Alternative: force using China CDN */
});

export const viewport: Viewport = {
  themeColor,
};

export const metadata: Metadata = {
  appleWebApp,
  icons,
  /* Next.js currently automatically sets crossorigin="use-credentials" on the manifest link which causes cors problems */
  /* manifest */
};`,
  getComponentChunkLinks: `/* ./app/layout.tsx */
import React from 'react';
import { preload } from 'react-dom';
import { getComponentChunkLinks } from '@porsche-design-system/components-react/partials';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

getComponentChunkLinks({ format: 'js', components: ['button', 'marque'] }).forEach(
    ({ href, options }) => preload(href, options)
);

/* Alternative: force using China CDN */
getComponentChunkLinks({ format: 'js', components: ['button', 'marque'], cdn: 'cn' }).forEach(
    ({ href, options }) => preload(href, options)
);

/* root layout... */
`,
  getFontLinks: `/* ./app/layout.tsx */
import React from 'react';
import { preload } from 'react-dom';
import { getFontLinks } from '@porsche-design-system/components-react/partials';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

getFontLinks({ format: 'js' }).forEach(
    ({ href, options }) => preload(href, options)
);

/* Alternative: force using China CDN */
getFontLinks({ format: 'js', cdn: 'cn' }).forEach(
    ({ href, options }) => preload(href, options)
);

/* root layout... */`,
  getIconLinks: `/* ./app/layout.tsx */
import React from 'react';
import { prefetchDNS } from 'react-dom';
import { getIconLinks } from '@porsche-design-system/components-react/partials';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

getIconLinks({ format: 'js', icons: ['arrow-head-right', 'plus'] }).forEach(({ href }) => prefetchDNS(href));

/* Alternative: force using China CDN */
getIconLinks({ format: 'js', icons: ['arrow-head-right', 'plus'], cdn: 'cn' }).forEach(({ href }) => prefetchDNS(href));

/* root layout... */`,
  getInitialStyles: `/* ./components/partials.tsx */
"use client";
import { useServerInsertedHTML } from "next/navigation";
import { useRef } from 'react';
import { getInitialStyles } from "@porsche-design-system/components-react/partials";

export const Partials = () => {
  const isServerInserted = useRef(false);

  useServerInsertedHTML(() => {
    // There seems to be some strange behavior where Next calls this multiple times
    // To ensure this is only called once we use a ref
    if (!isServerInserted.current) {
      isServerInserted.current = true;
      return <>
        {getInitialStyles({ format: 'jsx' })}
        <!-- Alternative: Force using China CDN -->
        {getInitialStyles({ format: 'jsx', cdn: 'cn' })}
      </>
    }
  });

  return null;
}

/* render </Partials> component in root layout */`,
  getFontFaceStylesheet: `/* ./components/partials.tsx */
"use client";
import { useServerInsertedHTML } from "next/navigation";
import { useRef } from 'react';
import { getFontFaceStylesheet } from "@porsche-design-system/components-react/partials";

export const Partials = () => {
  const isServerInserted = useRef(false);

  useServerInsertedHTML(() => {
    // There seems to be some strange behavior where Next calls this multiple times
    // To ensure this is only called once we use a ref
    if (!isServerInserted.current) {
      isServerInserted.current = true;
      return <>
          {getFontFaceStylesheet({ format: 'jsx' })}
          <!-- Alternative: Force using China CDN -->
          {getFontFaceStylesheet({ format: 'jsx', cdn: 'cn' })}
      </>
    }
  });

  return null;
}

/* render </Partials> component in root layout */`,
  getFontFaceStyles: `/* ./components/partials.tsx */
"use client";
import { useServerInsertedHTML } from "next/navigation";
import { useRef } from 'react';
import { getFontFaceStyles } from "@porsche-design-system/components-react/partials";

export const Partials = () => {
  const isServerInserted = useRef(false);

  useServerInsertedHTML(() => {
    // There seems to be some strange behavior where Next calls this multiple times
    // To ensure this is only called once we use a ref
    if (!isServerInserted.current) {
      isServerInserted.current = true;
      return <>
          {getFontFaceStyles({ format: 'jsx' })}
          <!-- Alternative: Force using China CDN -->
          {getFontFaceStyles({ format: 'jsx', cdn: 'cn' })}
      </>
    }
  });

  return null;
}

/* render </Partials> component in root layout */`,
  getLoaderScript: `/* ./app/layout.tsx */
import React from 'react';
import { preload } from 'react-dom';
import { getLoaderScript } from '@porsche-design-system/components-react/partials';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      {getLoaderScript({ format: 'jsx' })}
      <!-- Alternative: With custom prefix -->
      {getLoaderScript({ format: 'jsx', prefix: 'custom-prefix' })}
      <!-- Alternative: With multiple custom prefixes -->
      {getLoaderScript({ format: 'jsx', prefix: ['', 'custom-prefix', 'another-prefix'] })}
    </>
  );
}\`,`,
};
