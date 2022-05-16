import * as fs from 'fs';
import * as path from 'path';

const generateOverviewPage = (): void => {
  const sourceBasePath = path.resolve(require.resolve('@porsche-design-system/components-react'), '../../../src');
  const overviewFilePath = path.resolve(sourceBasePath, 'pages/Overview.tsx');
  const overviewFileContent = fs.readFileSync(overviewFilePath, 'utf8');

  const pollComponentsReadyFilePath = path.resolve(sourceBasePath, 'pollComponentsReady.ts');
  const pollComponentsReadyFileContent = fs.readFileSync(pollComponentsReadyFilePath, 'utf8');

  const newFileContent =
    overviewFileContent
      .replace("import { pollComponentsReady } from '../pollComponentsReady';", "import type { NextPage } from 'next';")
      .replace(/\nexport (const OverviewPage)/, pollComponentsReadyFileContent + '\n$1: NextPage') +
    '\nexport default OverviewPage;\n';

  const targetFileName = '../pages/overview.tsx';
  const targetFilePath = path.resolve(__dirname, targetFileName);
  fs.writeFileSync(targetFilePath, newFileContent);

  console.log(`Generated file: ${targetFileName}`);
};

generateOverviewPage();
