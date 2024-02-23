import type { MDXComponents } from 'mdx/types';
import { PHeading } from '@porsche-design-system/components-react/ssr';

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <PHeading tag="h1" size="xx-large">
        {children}
      </PHeading>
    ),
    h2: ({ children }) => (
      <PHeading tag="h2" size="x-large">
        {children}
      </PHeading>
    ),
    h3: ({ children }) => (
      <PHeading tag="h3" size="large">
        {children}
      </PHeading>
    ),
    h4: ({ children }) => (
      <PHeading tag="h4" size="medium">
        {children}
      </PHeading>
    ),
    h5: ({ children }) => (
      <PHeading tag="h5" size="small">
        {children}
      </PHeading>
    ),
    h6: ({ children }) => (
      <PHeading tag="h6" size="small">
        {children}
      </PHeading>
    ),
    ...components,
  };
}
