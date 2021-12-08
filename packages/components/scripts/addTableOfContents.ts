import * as fs from 'fs';
import * as path from 'path';
import * as globby from 'globby';
import { paramCase } from 'change-case';

const addToC = (str: string): string => {
  const titles: { id: string; title: string }[] = [];

  str = str.replace(/\n(## ([\w ]*))\n/g, (match, hashTitle: string, title: string): string => {
    const id = paramCase(title);
    titles.push({ id, title });
    match = match.replace(hashTitle, hashTitle + ` <span id="${id}"></span>`);
    return match;
  });
  console.log(titles);

  if (titles.length) {
    const toc = [
      '<p-headline variant="headline-5">Table of Contents</p-headline>',
      '<ul class="toc">',
      ...titles.map(({ id, title }) => `  <li><p-link-pure href='#${id}'>${title}</p-link-pure></li>`),
      '</ul>',
    ].join('\n');

    // insert toc before first h2
    str = str.replace(/\s(##\s.*\s)/, '\n' + toc + '\n\n$1');
  }
  return str;
};

const addTableOfContents = (): void => {
  const files = globby.sync('./src/components/**/*.examples.md');

  files
    .filter((x) => x.includes('accordion'))
    .forEach((file) => {
      const sourceFile = path.normalize(file);
      const sourceFileContent = fs.readFileSync(sourceFile, 'utf8');

      const content = addToC(sourceFileContent);

      // Use this for easy debugging
      // fs.writeFileSync(sourceFile.replace(/(\.md)/, '.tmp$1'), content);

      fs.writeFileSync(sourceFile, content);
    });
};

addTableOfContents();
