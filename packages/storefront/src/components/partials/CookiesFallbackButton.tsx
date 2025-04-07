'use client';

import { isDevEnvironment } from '@/utils/isDev';
import { PButton } from '@porsche-design-system/components-react/ssr';
import { CDN_BASE_PATH, FALLBACKS_MANIFEST } from '@porsche-design-system/fallbacks';

export const showCookiesFallback = () => {
  const script = document.createElement('script');
  const src = `https://cdn.ui.porsche.com${CDN_BASE_PATH}/${FALLBACKS_MANIFEST.cookies}`;
  script.src = isDevEnvironment
    ? src.replace('https://cdn.ui.porsche.com/porsche-design-system', 'http://localhost:3001')
    : src;
  document.body.appendChild(script);
};

export const CookiesFallbackButton = () => {
  return <PButton onClick={() => showCookiesFallback()}>Force display of cookies fallback</PButton>;
};
