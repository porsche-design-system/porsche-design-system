import { createHash } from 'crypto';

export type Cdn = 'auto' | 'cn';

export type Format = 'html' | 'jsx';

const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
export const throwIfRunInBrowser = (partialName: string): void => {
  if (isBrowser) {
    throw new Error(
      `[Porsche Design System] Partials can only be used during build time. You are using '${partialName}' at run time in a browser which defeats the effect of the partial.`
    );
  }
};

const hashMap: Record<string, string> = {};

export const generatePartialHash = (partialName: string, content: string): void => {
  const hash = 'sha256-' + createHash('sha256').update(content).digest('base64');
  hashMap[partialName] = hash;
};

export const getHashMap = (): Record<string, string> => hashMap;
