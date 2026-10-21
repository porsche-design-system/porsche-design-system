// The descriptions are compiled by their consumer, the Storefront's MDX loader, into React components.
declare module '*.mdx' {
  import type { ComponentType } from 'react';

  const MDXComponent: ComponentType<Record<string, unknown>>;
  export default MDXComponent;
}
