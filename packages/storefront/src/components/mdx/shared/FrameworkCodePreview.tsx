'use client';

import type { ReactNode } from 'react';
import { useStorefrontFramework } from '@/hooks/useStorefrontFramework';
import type { FrameworkWithNext } from '@/models/framework';
import { FrameworkTabs } from '../FrameworkTabs/FrameworkTabs';
import { CodeBlock, type CodeLanguage } from './CodeBlock';

type FrameworkCodePreviewProps = {
  /** The code per framework. */
  frameworkMarkup: Partial<Record<FrameworkWithNext, string>>;
  /** Additionally offers a Next tab, for code that has a Next.js specific variant. */
  next?: boolean;
  /** Rendered next to the framework tabs, e.g. a button to open the code in StackBlitz. */
  actions?: ReactNode;
};

const frameworkLanguageMap = {
  'vanilla-js': 'javascript',
  angular: 'typescript',
  react: 'typescript',
  vue: 'typescript',
  next: 'typescript',
} as const satisfies Record<FrameworkWithNext, CodeLanguage>;

/** The framework tabs and the code of the framework they select, below a playground or on its own. */
export const FrameworkCodePreview = ({ frameworkMarkup, next = false, actions }: FrameworkCodePreviewProps) => {
  const { storefrontFramework, framework } = useStorefrontFramework();
  // Without a Next tab, Next shows the code of React, like the tabs show React selected.
  const selectedFramework = next ? storefrontFramework : framework;

  return (
    <>
      <div className="m-static-md flex gap-fluid-sm justify-between flex-col md:flex-row">
        <FrameworkTabs next={next} label="Select the JavaScript framework for code preview" />
        {actions}
      </div>
      <CodeBlock className="markup" language={frameworkLanguageMap[selectedFramework]}>
        {frameworkMarkup[selectedFramework] ?? ''}
      </CodeBlock>
    </>
  );
};
