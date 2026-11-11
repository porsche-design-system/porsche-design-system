import { type FrameworkRenderContext, resolveFrameworkValues } from '@/models/framework';
import { normalizeCodeBlock } from '@/utils/normalizeCodeBlock';
import { CodeBlock, type CodeLanguage } from '../../elements/CodeBlock';
import { FrameworkContent } from '../FrameworkContent';

type FrameworkCodeBlockProps = {
  language: CodeLanguage;
  render: (context: FrameworkRenderContext) => string;
};

/** Code that follows the selected framework, highlighted on the server for every framework. */
export const FrameworkCodeBlock = ({ language, render }: FrameworkCodeBlockProps) => (
  <FrameworkContent
    content={resolveFrameworkValues((context) => (
      <CodeBlock language={language}>{normalizeCodeBlock(render(context))}</CodeBlock>
    ))}
  />
);
