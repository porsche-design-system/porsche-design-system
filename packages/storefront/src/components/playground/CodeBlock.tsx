'use client';

import { DirectionSelect } from '@/components/common/DirectionSelect';
import { FrameworkSelect } from '@/components/common/FrameworkSelect';
import { ThemeSelect } from '@/components/common/ThemeSelect';
import type { FrameworkMarkup } from '@/models/framework';
import type { SelectUpdateEventDetail } from '@porsche-design-system/components-react/ssr';
import type React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

type CodeBlockProps = {
  frameworkMarkup: FrameworkMarkup;
};

export const CodeBlock = ({ frameworkMarkup }: CodeBlockProps) => {
  const selectedFramework = 'vanilla-js';

  const handleFrameworkUpdate = (e: CustomEvent<SelectUpdateEventDetail>) => {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.log(e);
  };

  const handleThemeUpdate = (e: CustomEvent<SelectUpdateEventDetail>) => {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.log(e);
  };

  const handleDirectionUpdate = (e: CustomEvent<SelectUpdateEventDetail>) => {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.log(e);
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
      <div className="flex flex-col gap-xs xs:flex-row">
        <FrameworkSelect framework="vanilla-js" onUpdate={(e) => handleFrameworkUpdate(e)} hideLabel={true} />
        <ThemeSelect theme="light" onUpdate={(e) => handleThemeUpdate(e)} hideLabel={true} />
        <DirectionSelect dir="ltr" onUpdate={(e) => handleDirectionUpdate(e)} hideLabel={true} />
      </div>
      {/* @ts-expect-error: Suppress type incompatibility */}
      <SyntaxHighlighter language="html" showLineNumbers={false} useInlineStyles={false}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};
