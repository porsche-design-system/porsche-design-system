import type { ReactNode } from 'react';

/**
 * The props of every registered component, shared by its React and Markdown implementation so both accept the same
 * MDX. `children` is a React node in the Storefront and an opaque element tree in the Markdown build.
 */

export type TableOfContentsProps = {
  headings: string[];
};

export type NotificationProps = {
  heading?: string;
  headingTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  state?: 'warning' | 'error' | 'success' | 'info';
  children?: ReactNode;
};

export type DependencyListProps = {
  /** Package specifiers with their version, e.g. `react@19`. */
  items: string[];
};

export type TargetOnlyProps = {
  children?: ReactNode;
};
