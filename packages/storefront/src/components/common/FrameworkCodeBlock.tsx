import type { CodeLanguage } from '@/components/common/CodeBlock';
import { FrameworkCodeBlockRenderer } from '@/components/common/FrameworkCodeBlockRenderer';
import { type FrameworkRenderContext, resolveFrameworkValues } from '@/models/framework';
import { normalizeCodeBlock } from '@/utils/normalizeCodeBlock';

type FrameworkCodeBlockProps = {
  language: CodeLanguage;
  render: (context: FrameworkRenderContext) => string;
};

/** Resolves framework-dependent code on the server so only highlighted strings cross to the client. */
export const FrameworkCodeBlock = ({ language, render }: FrameworkCodeBlockProps) => (
  <FrameworkCodeBlockRenderer
    language={language}
    codeByFramework={resolveFrameworkValues((context) => normalizeCodeBlock(render(context)))}
  />
);
