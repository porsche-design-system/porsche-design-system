export type Cdn = 'auto' | 'cn';

export type Format = 'html' | 'jsx';

const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
export const throwIfRunInBrowser = (partialName: string): void => {
  if (isBrowser) {
    throw new Error(
      `Partials can only be used during build time. You are using '${partialName}' at run time in a browser which defeats the effect of the partial.`
    );
  }
};
