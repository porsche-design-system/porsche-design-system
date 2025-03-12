'use client';

import { useStorefrontFramework } from '@/hooks/useStorefrontFramework';
import { type Framework, type FrameworkMarkup, frameworkNameMap } from '@/models/framework';
import { PButton, PTabsBar, type TabsBarUpdateEventDetail } from '@porsche-design-system/components-react/ssr';
import React, { type PropsWithChildren } from 'react';
import SyntaxHighlighter, { type SyntaxHighlighterProps } from 'react-syntax-highlighter';

type PlaygroundProps = {
  frameworkMarkup: FrameworkMarkup;
  onOpenInStackblitz: () => void;
};

export const Playground = ({ frameworkMarkup, onOpenInStackblitz, children }: PropsWithChildren<PlaygroundProps>) => {
  const { storefrontFramework, setStorefrontFramework } = useStorefrontFramework();
  const frameworks = Object.keys(frameworkMarkup) as Framework[];
  const tabIndex = frameworks.indexOf(storefrontFramework) !== -1 ? frameworks.indexOf(storefrontFramework) : 0;
  const selectedFramework = frameworks[tabIndex];

  const onUpdate = (e: CustomEvent<TabsBarUpdateEventDetail>) => {
    setStorefrontFramework(frameworks[e.detail.activeTabIndex]);
  };

  const frameworkLanguageMap: Record<Framework, SyntaxHighlighterProps['language']> = {
    'vanilla-js': 'javascript',
    react: 'typescript',
    angular: 'typescript',
    vue: 'typescript',
    next: 'typescript',
  };

  return (
    <div className="playground mt-md flex flex-col gap-sm border-thin border-contrast-low rounded-lg">
      <div className="demo p-static-lg border-b-thin border-contrast-low">{children}</div>
      <div className="mx-static-md flex justify-between">
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
        <PButton
          type="button"
          icon-source="assets/icon-stackblitz.svg"
          variant="ghost"
          compact={true}
          onClick={onOpenInStackblitz}
        >
          Open in Stackblitz
        </PButton>
      </div>
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
