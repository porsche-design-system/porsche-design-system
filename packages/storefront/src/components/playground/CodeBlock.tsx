'use client';

import { type Framework, type FrameworkMarkup, frameworkNameMap } from '@/models/framework';
import { PTabsBar, type TabsBarUpdateEventDetail } from '@porsche-design-system/components-react/ssr';
import type React from 'react';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

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

  return (
    <div className="">
      <PTabsBar activeTabIndex={tabIndex} onUpdate={onUpdate}>
        {frameworks.map((framework) => (
          <button key={framework} type="button">
            {frameworkNameMap[framework as Framework]}
          </button>
        ))}
      </PTabsBar>
      <SyntaxHighlighter language="html">{frameworkMarkup[selectedFramework]}</SyntaxHighlighter>
    </div>
  );
};
