import path from 'node:path';
import fs from 'fs';
import * as prettier from 'prettier';
import type React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

type StylesheetViewerProps = {
  file: 'color-scheme.css' | 'font-face.css' | 'legacy-radius.css' | 'normalize.css' | 'variables.css';
};

// TODO: it would be better to resolve the path from npm package entrypoint
const filePath = path.resolve(process.cwd(), '../components-react/dist/react-wrapper/stylesheets');

export const StylesheetViewer = async ({ file }: StylesheetViewerProps) => {
  const rawCss = fs.readFileSync(path.resolve(`${filePath}/${file}`), 'utf8');
  const formattedCss = await prettier.format(rawCss, { parser: 'css' });
  const content = `/* @porsche-design-system/components-{js|angular|react|vue}/${file} */\n\n${formattedCss}`;

  return (
    <SyntaxHighlighter
      dir="ltr"
      className="markup"
      language="css"
      showLineNumbers={false}
      useInlineStyles={false}
      codeTagProps={{
        tabIndex: 0,
        className:
          'my-fluid-md max-h-96 overflow-auto rounded-3xl focus-visible:outline outline-focus outline-offset-2 select-none',
      }}
    >
      {content}
    </SyntaxHighlighter>
  );
};
