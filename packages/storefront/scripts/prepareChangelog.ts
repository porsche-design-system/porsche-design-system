import * as fs from 'node:fs';
import * as path from 'node:path';

const extractVersions = (content: string): string[] => {
  const headings: string[] = [];
  const headingRegex = /^### (\[.*] - \d{4}-\d{2}-\d{2})/gm;
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(content)) !== null) {
    const heading = match[1].trim();
    // Only show stable releases
    if (!heading.match(/-(?:rc|alpha|beta)/)) {
      headings.push(heading);
    }
  }

  // Take the first 5 versions
  return headings.slice(0, 5);
};

const prepareChangelog = (): void => {
  const srcFilPath = path.resolve(__dirname, '../../components/CHANGELOG.md');
  const srcContent = fs.readFileSync(srcFilPath, 'utf8');

  const replacedContent = srcContent
    // Add TableOfContents with extracted versions
    .replace(
      /\n### /,
      `\n<TableOfContents headings={${JSON.stringify(extractVersions(srcContent))}}></TableOfContents>\n$&`
    )
    // Replace Version headings with h2 since only h2 will be used as anchor links
    .replace(/^### (\[.*] - \d{4}-\d{2}-\d{2})/gm, '## $1');

  const content = `import { TableOfContents } from "@/components/common/TableOfContents";
export const metadata = {
  title: 'Changelog - Porsche Design System',
  description: 'Stay up to date with the latest changes to the Porsche Design System.',
}\n\n${replacedContent}`;

  const targetFileName = 'page.mdx';
  const targetFolder = '../src/app/news/changelog';
  const targetFilePath = path.resolve(__dirname, targetFolder, targetFileName);
  fs.writeFileSync(targetFilePath, content);

  console.log(`Generated: ${targetFolder}/${targetFileName}`);
};

prepareChangelog();
