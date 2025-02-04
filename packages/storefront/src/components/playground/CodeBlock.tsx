'use client';

import { type Framework, type FrameworkMarkup, frameworkNameMap } from '@/models/framework';
import { PTabsBar, type TabsBarUpdateEventDetail } from '@porsche-design-system/components-react/ssr';
import React, { useState } from 'react';
import SyntaxHighlighter, { type SyntaxHighlighterProps } from 'react-syntax-highlighter';

const getVanillaJsCode = (code: string | undefined) => `<!doctype html>
<html lang="en">
<head>
  <title></title>
</head>
<body>

${code}

</body>
</html>`;

const getReactCode = (code: string | undefined) => `export const Example = () => {
  return (
    <>
      ${code}
    </>
  )
}`;

const getAngularCode = (code: string | undefined) => `@Component({
  selector: 'example',
  template: \`
    ${code}
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ExampleComponent {}`;

const getVueCode = (code: string | undefined) => `<script setup lang="ts"></script>

<template>
  ${code}
</template>`;

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

  const getMarkupMap = {
    'vanilla-js': getVanillaJsCode,
    react: getReactCode,
    next: getReactCode,
    angular: getAngularCode,
    vue: getVueCode,
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
        language={frameworkLanguageMap[selectedFramework]}
        showLineNumbers={false}
        useInlineStyles={false}
      >
        {getMarkupMap[selectedFramework]?.(frameworkMarkup[selectedFramework])}
      </SyntaxHighlighter>
    </div>
  );
};
