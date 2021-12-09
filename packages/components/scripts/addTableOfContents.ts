import * as fs from 'fs';
import * as path from 'path';
import * as globby from 'globby';

const addTableOfContents = (): void => {
  const rootDirectory = path.resolve(__dirname, '..');
  const files = globby.sync(path.resolve(rootDirectory, 'src/components/**/*.md'));

  files.forEach((file) => {
    const sourceFile = path.normalize(file);
    const sourceFileContent = fs.readFileSync(sourceFile, 'utf8');

    if (!sourceFileContent.includes('<TableOfContents></TableOfContents>')) {
      const content = sourceFileContent.replace(/\s(##\s.*\s)/, '\n<TableOfContents></TableOfContents>\n\n$1');
      fs.writeFileSync(sourceFile, content);
    }
  });
};

addTableOfContents();
