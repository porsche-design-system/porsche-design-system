import fs from 'node:fs';
import path from 'node:path';
import * as prettier from 'prettier';
import { CodeBlock } from '@/components/common/CodeBlock';

type StylesheetViewerProps = {
  file: 'color-scheme.css' | 'font-face.css' | 'normalize.css' | 'variables.css';
};

// TODO: it would be better to resolve the path from npm package entrypoint
const filePath = path.resolve(process.cwd(), '../components-react/dist/react-wrapper/stylesheets');

export const StylesheetViewer = async ({ file }: StylesheetViewerProps) => {
  const rawCss = fs.readFileSync(path.resolve(`${filePath}/${file}`), 'utf8');
  const formattedCss = await prettier.format(rawCss, { parser: 'css' });
  const content = `/* @porsche-design-system/components-{js|angular|react|vue}/${file} */\n\n${formattedCss}`;

  return (
    <CodeBlock className="markup select-none my-fluid-md" language="css" label={file}>
      {content}
    </CodeBlock>
  );
};
