import * as fs from 'fs';
import * as path from 'path';
import { pascalCase } from 'change-case';
import { TagName } from '../src';

type CodeSample = {
  component: TagName;
  fileNames: string[];
};

type Framework = 'shared' | 'angular' | 'react';

const generateCodeSamples = (): void => {
  const codeSamples: CodeSample[] = [
    {
      component: 'p-table',
      fileNames: [
        'src/table-data.ts',
        '../components-angular/src/app/pages/table.component.ts',
        '../components-react/src/pages/Table.tsx',
      ],
    },
  ];

  const packagesFolder = path.resolve(__dirname, '../../');

  const types = `type Framework = 'shared' | 'angular' | 'react';`;

  const functions = codeSamples
    .map((sample) => {
      console.log(`Generating sample for ${sample.component}`);

      const fileContents: { [key in Framework]?: string }[] = sample.fileNames.map((fileName) => {
        const filePath = path.resolve(fileName);
        const filePathFromPackagesFolder = filePath.replace(packagesFolder, '');
        const [, framework = 'shared'] = filePathFromPackagesFolder.match(/\/components-([a-z]+)\//) || [];

        console.log(`– Reading content of ${filePathFromPackagesFolder}`);
        const fileContent = fs.readFileSync(fileName, 'utf8');
        return { [framework]: fileContent.replace(/\s$/, '') };
      });

      const functionName = `get${pascalCase(sample.component.replace('p-', ''))}CodeSample`;

      return `export const ${functionName} = (framework: Framework): string => {
  const samples: { [key in Framework]?: string } = ${JSON.stringify(Object.assign({}, ...fileContents))};
  return samples[framework];
}`;
    })
    .join('\n\n');

  const content = [types, functions].join('\n\n');

  const targetDirectory = path.normalize('./src/lib');
  fs.mkdirSync(path.resolve(targetDirectory), { recursive: true });

  const targetFileName = 'codeSamples.ts';
  const targetFile = path.resolve(targetDirectory, targetFileName);
  fs.writeFileSync(targetFile, content);

  console.log(`Generated ${targetFileName} for ${codeSamples.length} samples`);
};

generateCodeSamples();
