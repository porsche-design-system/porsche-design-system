'use client';

import { CodeBlock, type CodeLanguage } from '@/components/common/CodeBlock';
import { FrameworkTabs } from '@/components/common/FrameworkTabs';
import { useStorefrontFramework } from '@/hooks/useStorefrontFramework';
import type { FrameworkWithNext } from '@/models/framework';

type PartialExampleProps = {
  /** Usage example per framework, built on the server by `PartialDocs`. */
  frameworkMarkup: Record<FrameworkWithNext, string>;
};

const frameworkLanguageMap = {
  'vanilla-js': 'javascript',
  angular: 'typescript',
  react: 'typescript',
  vue: 'typescript',
  next: 'typescript',
} as const satisfies Record<FrameworkWithNext, CodeLanguage>;

/**
 * Client part of `PartialDocs`. Partials must only ever run at build time, so `PartialDocs` stays a
 * server component and only the framework-dependent rendering happens here.
 */
export const PartialExample = ({ frameworkMarkup }: PartialExampleProps) => {
  const { storefrontFramework } = useStorefrontFramework();

  return (
    <>
      <div className="m-static-md flex gap-fluid-sm justify-between flex-col md:flex-row">
        <FrameworkTabs next={true} label="Select the JavaScript framework for code preview" />
      </div>
      <CodeBlock className="markup" language={frameworkLanguageMap[storefrontFramework]}>
        {frameworkMarkup[storefrontFramework]}
      </CodeBlock>
    </>
  );
};
