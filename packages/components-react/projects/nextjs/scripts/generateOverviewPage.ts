import * as fs from 'fs';
import * as path from 'path';

const generateOverviewPage = (): void => {
  const sourceFilePath = path.resolve(
    require.resolve('@porsche-design-system/components-react'),
    '../../../src/pages/Overview.tsx'
  );
  const sourceFileContent = fs.readFileSync(sourceFilePath, 'utf8');

  const newFileContent =
    sourceFileContent
      .replace("import { pollComponentsReady } from '../pollComponentsReady';", "import type { NextPage } from 'next';")
      .replace(/export (const OverviewPage)/, '$1: NextPage')
      .replace(/( } from '@porsche-design-system\/components-react';)/, ', componentsReady$1')
      .replace(/pollC(omponentsReady)/, 'c$1') + '\nexport default OverviewPage;\n';

  const targetFileName = '../pages/overview.tsx';
  const targetFilePath = path.resolve(__dirname, targetFileName);
  fs.writeFileSync(targetFilePath, newFileContent);

  console.log(`Generated file: ${targetFileName}`);
};

generateOverviewPage();
