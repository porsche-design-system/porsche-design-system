// Ambient declaration for `.mdx` file imports. Next.js' MDX loader transforms
// them into React components at build time, but TypeScript needs to know they
// export a default React component so type-checking works.
declare module '*.mdx' {
  import type { ComponentType } from 'react';
  const MDXComponent: ComponentType<Record<string, unknown>>;
  export default MDXComponent;
}

