export type Cdn = 'auto' | 'cn';

export type Format = 'html' | 'jsx';

const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
export const throwIfRunInBrowser = (partialName: string): void => {
  if (isBrowser) {
    throw new Error(
      `Partials should only be used during build time. It looks like you are using '${partialName}' at run time in a browser.`
    );
  }
};
