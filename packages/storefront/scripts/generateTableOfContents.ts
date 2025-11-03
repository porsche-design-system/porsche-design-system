import fs from 'node:fs';
import path from 'node:path';
import { globby } from 'globby';
import * as prettier from 'prettier';

const tableOfContentsRegex = /<TableOfContents[^>]*>/;

const getMdxFiles = async (dir: string): Promise<string[]> => {
  try {
    return await globby(`${dir}/**/page.mdx`);
  } catch (err) {
    throw new Error(`Error retrieving .mdx files: ${err}`);
  }
};

const extractHeadings = (content: string): string[] => {
  const headings: string[] = [];
  const headingRegex = /^## (.*)$/gm;
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(content)) !== null) {
    headings.push(match[1].trim());
  }

  return headings;
};

const processFile = async (filePath: string): Promise<void> => {
  const content = fs.readFileSync(filePath, 'utf-8');

  if (tableOfContentsRegex.test(content)) {
    const headings = extractHeadings(content);
    if (headings.length > 1) {
      const updatedContent = content.replace(
        tableOfContentsRegex,
        `<TableOfContents headings={${JSON.stringify(headings).replace(/'/g, "\\'").replace(/"/g, "'")}} />`
      );
      const prettierConfig = await prettier.resolveConfig(process.cwd());
      const formattedContent = await prettier.format(updatedContent, {
        parser: 'mdx',
        ...prettierConfig,
      });
      fs.writeFileSync(filePath, formattedContent, 'utf-8');
      console.log(`Updated TableOfContents in: ${filePath}`);
    }
  }
};

const processAppDirectory = async (appDirectory: string): Promise<void> => {
  try {
    const files = await getMdxFiles(appDirectory);
    for (const file of files) {
      if (file.includes('news/changelog')) {
        console.log(`Skipping file: ${file}`);
        continue;
      }
      await processFile(file);
    }
  } catch (error) {
    console.error('Error processing files:', error);
  }
};

const appDirectory = path.resolve(__dirname, '../src/app');
processAppDirectory(appDirectory).then(() => console.log('Finished generating table of contents'));
