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
  text: 'plaintext',
  html: 'xml',
  scss: 'scss',
  css: 'css',
  shell: 'shell',
  bash: 'bash',
} satisfies Record<string, SyntaxHighlighterProps['language']>;

export type CodeLanguage = keyof typeof languageMap;

type CodeBlockProps = {
  /** Language of the code block; an unknown language falls back to JavaScript highlighting. */
  language?: string;
  children: string;
};

/** Block-level code rendering of the MDX `pre` mapping, also used for framework-dependent snippets. */
export const CodeBlock = ({ language, children }: CodeBlockProps) => (
  <pre className="my-fluid-sm" dir="ltr">
    {language ? (
      <code
        className="my-fluid-md p-fluid-md max-h-96 overflow-auto rounded-3xl focus-visible:outline-focus outline outline-solid outline-transparent outline-offset-2"
        tabIndex={0}
      >
        <SyntaxHighlighter
          language={languageMap[language as CodeLanguage] || 'javascript'}
          PreTag="div"
          CodeTag="div"
          showLineNumbers={false}
          useInlineStyles={false}
        >
          {children}
        </SyntaxHighlighter>
      </code>
    ) : (
      <code className="my-fluid-md rounded-lg">{children}</code>
    )}
  </pre>
);
