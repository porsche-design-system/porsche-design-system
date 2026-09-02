import SyntaxHighlighter, { type SyntaxHighlighterProps } from 'react-syntax-highlighter';

const languageMap = {
  js: 'javascript',
  javascript: 'javascript',
  jsx: 'javascript',
  ts: 'typescript',
  typescript: 'typescript',
  tsx: 'typescript',
  diff: 'diff',
  json: 'json',
  markdown: 'markdown',
  text: 'plaintext',
  html: 'xml',
  xml: 'xml',
  scss: 'scss',
  css: 'css',
  shell: 'shell',
  bash: 'bash',
} satisfies Record<string, SyntaxHighlighterProps['language']>;

export type CodeLanguage = keyof typeof languageMap;

type CodeBlockProps = {
  /** Omitted renders the code unhighlighted, an unsupported language falls back to JavaScript. */
  language?: CodeLanguage | (string & {});
  /** Accessible name of the focusable, scrollable code region. */
  label?: string;
  className?: string;
  children: string;
};

/** Renders code as a scrollable, syntax highlighted box. */
export const CodeBlock = ({ language, label, className, children }: CodeBlockProps) => {
  const highlightLanguage = language ? languageMap[language as CodeLanguage] || 'javascript' : 'plaintext';

  return (
    <SyntaxHighlighter
      dir="ltr"
      className={className}
      language={highlightLanguage}
      showLineNumbers={false}
      useInlineStyles={false}
      codeTagProps={{
        // The code scrolls, so it must be keyboard reachable — which in turn requires a role and an
        // accessible name for the focus stop to be announced meaningfully.
        tabIndex: 0,
        ...(label && { role: 'region', 'aria-label': label }),
        // Passing `codeTagProps` replaces the language class the highlighter adds by default.
        className: `language-${highlightLanguage} max-h-96 overflow-auto rounded-3xl focus-visible:outline-focus outline outline-solid outline-transparent outline-offset-2`,
      }}
    >
      {children}
    </SyntaxHighlighter>
  );
};
