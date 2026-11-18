import fs from 'node:fs';
import path from 'node:path';
import { glob as globby } from 'fast-glob';
import * as prettier from 'prettier';

const tableOfContentsRegex = /<TableOfContents[^>]*>/;

const getMdxFiles = async (dir: string): Promise<string[]> => {
  try {
    return await globby(`${dir}/**/page.mdx`);
  } catch (err) {
    throw new Error(`Error retrieving .mdx files: ${err}`);
  }
};

type Heading = { type: 'string'; value: string } | { type: 'expression'; value: string };

const extractHeadings = (content: string): Heading[] => {
  const headings: Heading[] = [];
  const headingRegex = /^## (.*)$/gm;
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(content)) !== null) {
    const raw = match[1].trim();
    // Detect MDX expression headings like `## {someMeta.examples.foo.name}`
    const expressionMatch = raw.match(/^\{(.+)\}$/);
    if (expressionMatch) {
      headings.push({ type: 'expression', value: expressionMatch[1].trim() });
    } else {
      headings.push({ type: 'string', value: raw });
    }
  }

  return headings;
};

const serializeHeadings = (headings: Heading[]): string => {
  const items = headings.map((heading) =>
    heading.type === 'expression' ? heading.value : `'${heading.value.replace(/'/g, "\\'")}'`
  );
  return `[${items.join(', ')}]`;
};

const processFile = async (filePath: string): Promise<void> => {
  const content = fs.readFileSync(filePath, 'utf-8');

  if (tableOfContentsRegex.test(content)) {
    const headings = extractHeadings(content);
    if (headings.length > 1) {
      const updatedContent = content.replace(
        tableOfContentsRegex,
        `<TableOfContents headings={${serializeHeadings(headings)}} />`
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
