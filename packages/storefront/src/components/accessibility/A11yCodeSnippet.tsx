import type { Framework } from '@porsche-design-system/shared';
import { CodeBlock, type CodeLanguage } from '@/components/common/CodeBlock';

type A11yCodeSnippetProps = {
  code: string;
  framework: Framework;
  // Accessible name for the focusable, scrollable code region.
  label: string;
};

/** Accessibility snippets are bare markup: tag-based for every framework except React, whose JSX
 * carries object expressions (e.g. the `aria` prop) that only the TS grammar highlights correctly. */
const frameworkLanguageMap = {
  'vanilla-js': 'html',
  angular: 'html',
  react: 'typescript',
  vue: 'html',
} as const satisfies Record<Framework, CodeLanguage>;

export const A11yCodeSnippet = ({ code, framework, label }: A11yCodeSnippetProps) => (
  <CodeBlock className="my-fluid-sm" language={frameworkLanguageMap[framework]} label={label}>
    {code}
  </CodeBlock>
);
