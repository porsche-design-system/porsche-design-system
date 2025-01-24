'use client';

import { type Framework, type FrameworkMarkup, frameworkNameMap } from '@/models/framework';
import { PTabsBar, type TabsBarUpdateEventDetail } from '@porsche-design-system/components-react/ssr';
import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

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

  const code = `<!doctype html>
<html lang="en">
<head>
  <title></title>
</head>
<body>

${frameworkMarkup[selectedFramework]}

</body>
</html>`;

  return (
    <div className="flex flex-col gap-sm">
      <PTabsBar activeTabIndex={tabIndex} onUpdate={onUpdate}>
        {frameworks.map((framework) => (
          <button key={framework} type="button">
            {frameworkNameMap[framework]}
          </button>
        ))}
        <button type="button">Angular</button>
        <button type="button">React</button>
        <button type="button">Next</button>
        <button type="button">Vue</button>
      </PTabsBar>
      {/* @ts-expect-error: Suppress type incompatibility */}
      <SyntaxHighlighter language="html" showLineNumbers={false} useInlineStyles={false}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};
