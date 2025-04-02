import fs from 'node:fs';
import path from 'node:path';
import { globby } from 'globby';

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

const processFile = (filePath: string): void => {
  const content = fs.readFileSync(filePath, 'utf-8');

  if (tableOfContentsRegex.test(content)) {
    const headings = extractHeadings(content);
    if (headings.length > 1) {
      const updatedContent = content.replace(
        tableOfContentsRegex,
        `<TableOfContents headings={${JSON.stringify(headings)}} />`
      );
      fs.writeFileSync(filePath, updatedContent, 'utf-8');
      console.log(`Updated TableOfContents in: ${filePath}`);
    }
  }
};

const processAppDirectory = async (appDirectory: string): Promise<void> => {
  try {
    const files = await getMdxFiles(appDirectory);
    for (const file of files) {
      processFile(file);
    }
  } catch (error) {
    console.error('Error processing files:', error);
  }
};

const appDirectory = path.resolve(__dirname, '../src/app');
processAppDirectory(appDirectory).then(() => console.log('Finished generating table of contents'));
