'use client';

import type { Framework } from '@porsche-design-system/shared';
import { CodeBlock, type CodeLanguage } from '@/components/common/CodeBlock';
import { useStorefrontFramework } from '@/hooks/useStorefrontFramework';

type FrameworkCodeBlockRendererProps = {
  language: CodeLanguage;
  codeByFramework: Record<Framework, string>;
};

/** Client part of `FrameworkCodeBlock`, picking the code of the selected framework. */
export const FrameworkCodeBlockRenderer = ({ language, codeByFramework }: FrameworkCodeBlockRendererProps) => (
  <CodeBlock language={language}>{codeByFramework[useStorefrontFramework().framework]}</CodeBlock>
);
