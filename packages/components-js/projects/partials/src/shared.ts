import { createHash } from 'crypto';

export type Cdn = 'auto' | 'cn';

export type Format = 'html' | 'jsx';
export type FormatWithCSP = Format | 'sha256';

const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
export const throwIfRunInBrowser = (partialName: string): void => {
  if (isBrowser) {
    throw new Error(
      `[Porsche Design System] Partials can only be used during build time. You are using '${partialName}' at run time in a browser which defeats the effect of the partial.`
    );
  }
};

export const getSha256Hash = (content: string): string => {
  return `'sha256-${createHash('sha256').update(content).digest('base64')}'`;
};
