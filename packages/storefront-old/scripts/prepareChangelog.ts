import * as fs from 'fs';
import * as path from 'path';

const prepareChangelog = (): void => {
  const packageEntry = require.resolve('@porsche-design-system/components');
  const srcFilPath = path.resolve(packageEntry, '../../CHANGELOG.md');
  const srcContent = fs.readFileSync(srcFilPath, 'utf8');

  const content = srcContent.replace(/\n### /, '\n<TableOfContents tag="h3" isChangelog="true"></TableOfContents>\n$&');

  const targetFileName = 'changelog.md';
  const targetFolder = '../src/pages';
  const targetFilePath = path.resolve(__dirname, targetFolder, targetFileName);
  fs.writeFileSync(targetFilePath, content);

  console.log(`Generated: ${targetFolder}/${targetFileName}`);
};

prepareChangelog();
