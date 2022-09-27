import * as fs from 'fs';
import * as path from 'path';
import { pascalCase } from 'change-case';
import { TagName } from '../src/lib/tagNames';

type CodeSample = {
  component: TagName;
  samples: string[][]; // 2 dimensional to have multiple samples per component
};

type Framework = 'shared' | 'angular' | 'react' | 'vanilla-js';

const componentsJsPath = '../components-js/src/examples';
const componentsAngularPath = '../components-angular/src/app/examples';
const componentsReactPath = '../components-react/src/examples';

const generateCodeSamples = (): void => {
  const codeSamples: CodeSample[] = [
    {
      component: 'p-accordion',
      samples: [
        [
          componentsJsPath + '/accordion-example.html',
          componentsAngularPath + '/accordion-example.component.ts',
          componentsReactPath + '/AccordionExample.tsx',
        ],
      ],
    },
    {
      component: 'p-carousel',
      samples: [
        [
          componentsJsPath + '/carousel-example-events.html',
          componentsAngularPath + '/carousel-example-events.component.ts',
          componentsReactPath + '/CarouselExampleEvents.tsx',
        ],
        [
          componentsJsPath + '/carousel-example-dynamic-slides.html',
          componentsAngularPath + '/carousel-example-dynamic-slides.component.ts',
          componentsReactPath + '/CarouselExampleDynamicSlides.tsx',
        ],
      ],
    },
    {
      component: 'p-inline-notification',
      samples: [
        [
          componentsJsPath + '/inline-notification-example-events.html',
          componentsAngularPath + '/inline-notification-example-events.component.ts',
          componentsReactPath + '/InlineNotificationExampleEvents.tsx',
        ],
        [
          componentsJsPath + '/inline-notification-example-action-button.html',
          componentsAngularPath + '/inline-notification-example-action-button.component.ts',
          componentsReactPath + '/InlineNotificationExampleActionButton.tsx',
        ],
      ],
    },
    {
      component: 'p-modal',
      samples: [
        [
          componentsJsPath + '/modal-example-accessibility.html',
          componentsAngularPath + '/modal-example-accessibility.component.ts',
          componentsReactPath + '/ModalExampleAccessibility.tsx',
        ],
      ],
    },
    {
      component: 'p-scroller',
      samples: [
        [
          componentsJsPath + '/scroller-example.html',
          componentsAngularPath + '/scroller-example.component.ts',
          componentsReactPath + '/ScrollerExample.tsx',
        ],
      ],
    },
    {
      component: 'p-segmented-control',
      samples: [
        [
          componentsJsPath + '/segmented-control-example.html',
          componentsAngularPath + '/segmented-control-example.component.ts',
          componentsReactPath + '/SegmentedControlExample.tsx',
        ],
      ],
    },
    {
      component: 'p-stepper-horizontal',
      samples: [
        [
          componentsJsPath + '/stepper-horizontal-example.html',
          componentsAngularPath + '/stepper-horizontal-example.component.ts',
          componentsReactPath + '/StepperHorizontalExample.tsx',
        ],
      ],
    },
    {
      component: 'p-table',
      samples: [
        [
          componentsJsPath + '/table-example-basic.html',
          componentsAngularPath + '/table-example-basic.component.ts',
          componentsReactPath + '/TableExampleBasic.tsx',
          'src/data/table-data-basic.ts', // order is important since part of filename is extracted for param types of function name
        ],
        [
          componentsJsPath + '/table-example-sorting.html',
          componentsAngularPath + '/table-example-sorting.component.ts',
          componentsReactPath + '/TableExampleSorting.tsx',
          'src/data/table-data-sorting.ts', // order is important since part of filename is extracted for param types of function name
        ],
        [
          componentsJsPath + '/table-example-advanced.html',
          componentsAngularPath + '/table-example-advanced.component.ts',
          componentsReactPath + '/TableExampleAdvanced.tsx',
          'src/data/table-data-advanced.ts', // order is important since part of filename is extracted for param types of function name
        ],
      ],
    },
    {
      component: 'p-text-field-wrapper',
      samples: [
        [
          componentsJsPath + '/text-field-wrapper-example-imask.html',
          componentsAngularPath + '/text-field-wrapper-example-imask.component.ts',
          componentsReactPath + '/TextFieldWrapperExampleIMask.tsx',
        ],
        [
          componentsJsPath + '/text-field-wrapper-example-search.html',
          componentsAngularPath + '/text-field-wrapper-example-search.component.ts',
          componentsReactPath + '/TextFieldWrapperExampleSearch.tsx',
        ],
      ],
    },
    {
      component: 'p-toast',
      samples: [
        [
          componentsJsPath + '/toast-example.html',
          componentsAngularPath + '/toast-example.component.ts',
          componentsReactPath + '/ToastExample.tsx',
        ],
      ],
    },
    {
      component: 'p-tabs-bar',
      samples: [
        [
          componentsJsPath + '/tabs-bar-example-basic.html',
          componentsAngularPath + '/tabs-bar-example-basic.component.ts',
          componentsReactPath + '/TabsBarExampleBasic.tsx',
        ],
        [
          componentsJsPath + '/tabs-bar-example-accessibility.html',
          componentsAngularPath + '/tabs-bar-example-accessibility.component.ts',
          componentsReactPath + '/TabsBarExampleAccessibility.tsx',
        ],
      ],
    },
  ];

  const packagesFolder = path.resolve(__dirname, '../../');

  const types = [
    `type Framework = 'shared' | 'angular' | 'react' | 'vanilla-js';`,
    `type FrameworkMarkup = { [key in Framework]?: string };`,
  ].join('\n');

  const functions = codeSamples
    .map((sample) => {
      console.log(`Generating samples for ${sample.component}`);

      const sampleNamesAndContents: { sampleName: string; samples: { [key in Framework]?: string }[] }[] =
        sample.samples.map((sample, idx) => {
          // generate sampleName from first file of array
          const firstFileName = path.basename(sample[0]);
          const [, sampleName] = firstFileName.match(/-(example-[a-z-\d]+)/) || [];
          console.log(`– Sample #${idx + 1}: ${sampleName}`);

          const sampleContents: { [key in Framework]?: string }[] = sample.map((fileName) => {
            const filePath = path.resolve(fileName);
            const filePathFromPackagesFolder = filePath.replace(packagesFolder, '');
            const [, extractedFramework = 'shared'] = filePathFromPackagesFolder.match(/\/components-([a-z]+)\//) || [];
            const framework: Framework = extractedFramework === 'js' ? 'vanilla-js' : (extractedFramework as Framework);

            console.log(`  – Reading content of ${filePathFromPackagesFolder}`);
            let fileContent = fs.readFileSync(fileName, 'utf8').replace(/\s$/, '');

            if (framework === 'vanilla-js') {
              // remove getHeadAndData() helper function
              fileContent = fileContent.replace(/\s\sconst getHeadAndData = (\s|\S)*?return(.*\s){3}/, '');
            }

            return { [framework]: fileContent };
          });

          return { sampleName, samples: sampleContents };
        });

      const componentName = pascalCase(sample.component.replace('p-', ''));
      const functionName = `get${componentName}CodeSamples`;
      const sampleParams = sampleNamesAndContents.map(({ sampleName }) => sampleName);

      const arrayToObjectJSON = (arr: any[]): string => JSON.stringify(Object.assign({}, ...arr));

      if (sampleParams.length === 1) {
        return `export const ${functionName} = (): FrameworkMarkup => {
  const samples: { [key in Framework]?: string } = ${arrayToObjectJSON(sampleNamesAndContents[0].samples)};
  return samples;
};`;
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
export const ${functionName} = (sampleName: ${typeName}): FrameworkMarkup => {
  const samples: { [key in ${typeName}]: { [key in Framework]?: string } } = ${JSON.stringify(sampleData)};
  return samples[sampleName];
};`;
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
