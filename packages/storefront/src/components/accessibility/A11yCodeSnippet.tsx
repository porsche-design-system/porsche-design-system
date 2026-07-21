import SyntaxHighlighter from 'react-syntax-highlighter';

type A11yCodeSnippetProps = {
  code: string;
};

export const A11yCodeSnippet = ({ code }: A11yCodeSnippetProps) => (
  <pre className="my-fluid-sm" dir="ltr">
    <code
      className="my-fluid-md p-fluid-md max-h-96 overflow-auto rounded-3xl focus-visible:outline-focus outline outline-solid outline-transparent outline-offset-2"
      tabIndex={0}
    >
      <SyntaxHighlighter language="xml" PreTag="div" CodeTag="div" showLineNumbers={false} useInlineStyles={false}>
        {code}
      </SyntaxHighlighter>
    </code>
  </pre>
);
