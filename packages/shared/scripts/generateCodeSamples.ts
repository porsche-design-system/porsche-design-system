import * as fs from 'fs';
import * as path from 'path';
import { pascalCase } from 'change-case';
import { TagName } from '../src';

type CodeSample = {
  component: TagName;
  samples: string[][]; // 2 dimensional to have multiple samples per component
};

type Framework = 'shared' | 'angular' | 'react' | 'vanilla-js';

const generateCodeSamples = (): void => {
  const codeSamples: CodeSample[] = [
    {
      component: 'p-table',
      samples: [
        [
          '../components-js/src/examples/table-example.html',
          '../components-angular/src/app/examples/table-example.component.ts',
          '../components-react/src/examples/TableExample.tsx',
          'src/table-data.ts', // order is important since part of filename is extracted for param types of function name
        ],
      ],
    },
  ];

  const packagesFolder = path.resolve(__dirname, '../../');

  const types = `type Framework = 'shared' | 'angular' | 'react' | 'vanilla-js';`;

  const functions = codeSamples
    .map((sample) => {
      console.log(`Generating samples for ${sample.component}`);

      const sampleNamesAndContents: { sampleName: string; samples: { [key in Framework]?: string }[] }[] =
        sample.samples.map((sample, idx) => {
          // generate sampleName from first file of array
          const firstFileName = path.basename(sample[0]);
          const [, sampleName] = firstFileName.match(/-([a-z-\d]+)/) || [];
          console.log(`– Sample #${idx + 1}: ${sampleName}`);

          const sampleContents: { [key in Framework]?: string }[] = sample.map((fileName) => {
            const filePath = path.resolve(fileName);
            const filePathFromPackagesFolder = filePath.replace(packagesFolder, '');
            const [, extractedFramework = 'shared'] = filePathFromPackagesFolder.match(/\/components-([a-z]+)\//) || [];
            const framework: Framework = extractedFramework === 'js' ? 'vanilla-js' : (extractedFramework as Framework);

            console.log(`  – Reading content of ${filePathFromPackagesFolder}`);
            const fileContent = fs.readFileSync(fileName, 'utf8').replace(/\s$/, '');
            return { [framework]: fileContent };
          });

          return { sampleName, samples: sampleContents };
        });

      const componentName = pascalCase(sample.component.replace('p-', ''));
      const functionName = `get${componentName}CodeSample`;
      const sampleParams = sampleNamesAndContents.map(({ sampleName }) => sampleName);

      const arrayToObjectJSON = (arr: any[]): string => JSON.stringify(Object.assign({}, ...arr));

      if (sampleParams.length === 1) {
        return `export const ${functionName} = (framework: Framework): string => {
  const samples: { [key in Framework]?: string } = ${arrayToObjectJSON(sampleNamesAndContents[0].samples)};
  return samples[framework];
}`;
      } else {
        // multiple samples per component needs a 2nd parameter to select the sample
        const sampleData = sampleNamesAndContents.reduce(
          (result, curr) => ({
            ...result,
            [curr.sampleName]: JSON.parse(arrayToObjectJSON(curr.samples)),
          }),
          {}
        );

        const typeName = `${componentName}SampleName`;
        return `type ${typeName} = ${sampleParams.map((x) => `'${x}'`).join(' | ')};
export const ${functionName} = (framework: Framework, sampleName: ${typeName}): string => {
  const samples: { [key in ${typeName}]: { [key in Framework]?: string } } = ${JSON.stringify(sampleData)};
  return samples[sampleName][framework];
}`;
      }
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
