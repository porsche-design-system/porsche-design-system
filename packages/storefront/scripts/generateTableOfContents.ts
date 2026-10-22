import fs from 'node:fs';
import path from 'node:path';
import { glob as globby } from 'fast-glob';
import type { Nodes } from 'mdast';
import * as prettier from 'prettier';
import { getExampleHeading, type MdxJsxAttribute, readExampleProps } from '../src/utils/exampleHeading';

const tableOfContentsRegex = /<TableOfContents[^>]*>/;

const getMdxFiles = async (dir: string): Promise<string[]> => {
  try {
    return await globby(`${dir}/**/page.mdx`);
  } catch (err) {
    throw new Error(`Error retrieving .mdx files: ${err}`);
  }
};

type Heading = { type: 'string'; value: string } | { type: 'expression'; value: string };

// @mdx-js/mdx is ESM only, and its dependencies can't be required from this CommonJS script.
const mdxProcessor = import('@mdx-js/mdx').then(({ createProcessor }) => createProcessor());

const visit = (node: Nodes, callback: (node: Nodes) => void): void => {
  callback(node);
  if ('children' in node) {
    for (const child of node.children) {
      visit(child, callback);
    }
  }
};

/** The `##` headings of a page in their order: its own, and those its `<Example>`s render (see `exampleHeading.ts`). */
const extractHeadings = async (content: string): Promise<Heading[]> => {
  const headings: Heading[] = [];

  visit((await mdxProcessor).parse(content) as Nodes, (node) => {
    if (node.type === 'heading' && node.depth === 2) {
      const raw = content
        .slice(node.position?.start.offset, node.position?.end.offset)
        .replace(/^##\s+/, '')
        .trim();
      // Detect MDX expression headings like `## {someMeta.examples.foo.name}`
      const expressionMatch = raw.match(/^\{(.+)\}$/);
      headings.push(
        expressionMatch ? { type: 'expression', value: expressionMatch[1].trim() } : { type: 'string', value: raw }
      );
    }
    if (node.type === 'mdxJsxFlowElement' && node.name === 'Example') {
      const { example, ...props } = readExampleProps(node.attributes as MdxJsxAttribute[]);
      const heading = getExampleHeading(props, undefined);
      if (heading?.level === 2) {
        headings.push(
          heading.text === undefined
            ? { type: 'expression', value: `${example}.title` }
            : { type: 'string', value: heading.text }
        );
      }
    }
  });

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
    const headings = await extractHeadings(content);
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
