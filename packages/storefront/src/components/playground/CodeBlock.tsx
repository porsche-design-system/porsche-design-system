'use client';

import { type Framework, type FrameworkMarkup, frameworkNameMap } from '@/models/framework';
import { PTabsBar, type TabsBarUpdateEventDetail } from '@porsche-design-system/components-react/ssr';
import React, { useState } from 'react';
import SyntaxHighlighter, { type SyntaxHighlighterProps } from 'react-syntax-highlighter';

type CodeBlockProps = {
  frameworkMarkup: FrameworkMarkup;
};

export const CodeBlock = ({ frameworkMarkup }: CodeBlockProps) => {
  const [tabIndex, setTabIndex] = useState(0);
  const frameworks = Object.keys(frameworkMarkup) as Framework[];
  const selectedFramework = frameworks[tabIndex];

  const onUpdate = (e: CustomEvent<TabsBarUpdateEventDetail>) => {
    setTabIndex(e.detail.activeTabIndex);
  };

  const frameworkLanguageMap: Record<Framework, SyntaxHighlighterProps['language']> = {
    'vanilla-js': 'javascript',
    react: 'typescript',
    angular: 'typescript',
    vue: 'typescript',
    next: 'typescript',
  };

  return (
    <div className="flex flex-col gap-sm">
      <PTabsBar activeTabIndex={tabIndex} onUpdate={onUpdate}>
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
      {/* @ts-expect-error: Suppress type incompatibility */}
      <SyntaxHighlighter
        className="markup"
        language={frameworkLanguageMap[selectedFramework]}
        showLineNumbers={false}
        useInlineStyles={false}
      >
        {frameworkMarkup[selectedFramework]}
      </SyntaxHighlighter>
    </div>
  );
};
