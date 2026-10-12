import type { ReactNode } from 'react';

export type StorefrontOnlyProps = {
  children?: ReactNode;
};

/**
 * Content that only makes sense in a browser, e.g. a live demo. Rendered as it is in the Storefront and left out of
 * the Markdown output. Use it rarely: everything else should reach agents too.
 */
export const StorefrontOnly = ({ children }: StorefrontOnlyProps) => <>{children}</>;
