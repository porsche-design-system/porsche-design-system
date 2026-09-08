import { CodeBlock } from '@/components/common/CodeBlock';

type A11yCodeSnippetProps = {
  code: string;
  // Accessible name for the focusable, scrollable code region.
  label: string;
};

/**
 * Accessibility snippets are bare markup for every framework, so all of them are highlighted as HTML
 * — React included. Without a surrounding component the JS grammar only enters its JSX sub-mode once
 * an element sits in expression position, which leaves the first element of a multi-element snippet
 * unhighlighted while later ones are colored. The trade-off is that the contents of a `{{ ... }}`
 * expression, such as the `aria` prop, are colored as attributes rather than strings.
 */
export const A11yCodeSnippet = ({ code, label }: A11yCodeSnippetProps) => (
  <CodeBlock className="my-fluid-sm" language="html" label={label}>
    {code}
  </CodeBlock>
);
