'use client';

import { PTabsBar, type TabsBarUpdateEventDetail } from '@porsche-design-system/components-react/ssr';
import type { Framework, FrameworkMarkup } from '@porsche-design-system/shared';
import React, { type PropsWithChildren } from 'react';
import SyntaxHighlighter, { type SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { useStorefrontFramework } from '@/hooks/useStorefrontFramework';
import { frameworkNameMap } from '@/models/framework';

type CodeBlockProps = {
  frameworkMarkup: FrameworkMarkup & { next?: string };
};

export const CodeBlock = ({ frameworkMarkup, children }: PropsWithChildren<CodeBlockProps>) => {
  const { storefrontFramework, setStorefrontFramework } = useStorefrontFramework();
  const frameworks = Object.keys(frameworkMarkup) as Framework[];
  const tabIndex = frameworks.indexOf(storefrontFramework) !== -1 ? frameworks.indexOf(storefrontFramework) : 0;
  const selectedFramework = frameworks[tabIndex];

  const onUpdate = (e: CustomEvent<TabsBarUpdateEventDetail>) => {
    setStorefrontFramework(frameworks[e.detail.activeTabIndex]);
  };

  const frameworkLanguageMap: Record<Framework | 'next', SyntaxHighlighterProps['language']> = {
    'vanilla-js': 'javascript',
    react: 'typescript',
    angular: 'typescript',
    vue: 'typescript',
    next: 'typescript',
  };

  return (
    <>
      <div className="m-static-md flex gap-fluid-sm justify-between flex-col md:flex-row">
        <PTabsBar className="framework-select" activeTabIndex={tabIndex} onUpdate={onUpdate}>
          {frameworks.map((framework, index) => (
            <button
              key={framework}
              type="button"
              role="tab"
              tabIndex={index === tabIndex ? 0 : -1}
              aria-selected={index === tabIndex}
            >
              {frameworkNameMap[framework]}
            </button>
          ))}
        </PTabsBar>
        {children}
      </div>
      {/* @ts-expect-error: Suppress type incompatibility */}
      <SyntaxHighlighter
        dir="ltr"
        className="markup"
        language={frameworkLanguageMap[selectedFramework]}
        showLineNumbers={false}
        useInlineStyles={false}
        codeTagProps={{
          tabIndex: 0,
          className:
            'max-h-96 overflow-auto rounded-lg focus-visible:outline-focus outline outline-solid outline-transparent -outline-offset-1',
        }}
      >
        {frameworkMarkup[selectedFramework]}
      </SyntaxHighlighter>
    </>
  );
};
