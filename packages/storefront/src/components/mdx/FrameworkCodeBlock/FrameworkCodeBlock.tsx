import { type FrameworkRenderContext, resolveFrameworkValues } from '@/models/framework';
import { normalizeCodeBlock } from '@/utils/normalizeCodeBlock';
import type { CodeLanguage } from '../shared/CodeBlock';
import { FrameworkCodeBlockRenderer } from './FrameworkCodeBlockRenderer';

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
