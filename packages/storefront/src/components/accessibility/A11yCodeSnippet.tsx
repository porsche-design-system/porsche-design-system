import type { Framework } from '@porsche-design-system/shared';
import SyntaxHighlighter from 'react-syntax-highlighter';

type A11yCodeSnippetProps = {
  code: string;
  framework: Framework;
  // Accessible name for the focusable, scrollable code region.
  label: string;
};

/** Accessibility snippets are bare markup: tag-based for every framework except React, whose JSX
 * carries object expressions (e.g. the `aria` prop) that only the TS grammar highlights correctly. */
const FRAMEWORK_LANGUAGE: Record<Framework, string> = {
  'vanilla-js': 'xml',
  angular: 'xml',
  react: 'typescript',
  vue: 'xml',
};

export const A11yCodeSnippet = ({ code, framework, label }: A11yCodeSnippetProps) => (
  <SyntaxHighlighter
    dir="ltr"
    language={FRAMEWORK_LANGUAGE[framework]}
    showLineNumbers={false}
    useInlineStyles={false}
    codeTagProps={{
      // The snippet scrolls, so it must be keyboard reachable — which in turn requires a role and an
      // accessible name for the focus stop to be announced meaningfully.
      tabIndex: 0,
      role: 'region',
      'aria-label': label,
      className:
        'my-fluid-sm p-fluid-md max-h-96 overflow-auto rounded-3xl focus-visible:outline-focus outline outline-solid outline-transparent outline-offset-2',
    }}
  >
    {code}
  </SyntaxHighlighter>
);
