import fs from 'fs';
import path from 'path';
import { camelCase } from 'change-case';
import type { TagName } from '../src';
import type { Framework, FrameworkMarkup } from '../src/models';

type SampleName =
  | TagName
  | 'componentsReady'
  | 'ag-grid'
  | 'styles-border'
  | 'styles-drop-shadow'
  | 'styles-focus'
  | 'styles-frosted-glass'
  | 'styles-gradient'
  | 'styles-grid'
  | 'styles-hover'
  | 'styles-media-query'
  | 'styles-motion'
  | 'styles-skeleton'
  | 'styles-spacing'
  | 'styles-theme'
  | 'styles-typography';

type CodeSample = {
  component: SampleName; // PDS tag or relevant component
  examples: CodeExample[];
};

type CodeExample = {
  name: string; // Name of the example
  paths: { [key in Framework]: string };
};

const codeExamples: CodeSample[] = [
  // TODO: Don't use shared import in AG Grid Example
  // {
  //   component: 'ag-grid',
  //   examples: [
  //     {
  //       name: 'AG Grid Example',
  //       paths: {
  //         'vanilla-js': '/ag-grid-example-storefront.html',
  //         angular: '/ag-grid-example-storefront.component.ts',
  //         react: '/AGGridExampleStorefront.tsx',
  //         vue: '/AGGridExampleStorefront.vue',
  //       },
  //     },
  //   ],
  // },
  // {
  //   component: 'p-accordion',
  //   examples: [
  //     {
  //       name: 'AccordionExample',
  //       paths: {
  //         'vanilla-js': '/accordion-example.html',
  //         angular: '/accordion-example.component.ts',
  //         react: '/AccordionExample.tsx',
  //         vue: '/AccordionExample.vue',
  //       },
  //     },
  //   ],
  // },
  {
    component: 'p-sheet',
    examples: [
      {
        name: 'SheetExample',
        paths: {
          'vanilla-js': '/sheet-example.html',
          angular: '/sheet-example.component.ts',
          react: '/SheetExample.tsx',
          vue: '/SheetExample.vue',
        },
      },
    ],
  },
  {
    component: 'p-button',
    examples: [
      {
        name: 'ButtonExampleForm',
        paths: {
          'vanilla-js': '/button-example-form.html',
          angular: '/button-example-form.component.ts',
          react: '/ButtonExampleForm.tsx',
          vue: '/ButtonExampleForm.vue',
        },
      },
      {
        name: 'ButtonExampleFormAttribute',
        paths: {
          'vanilla-js': '/button-example-form-attribute.html',
          angular: '/button-example-form-attribute.component.ts',
          react: '/ButtonExampleFormAttribute.tsx',
          vue: '/ButtonExampleFormAttribute.vue',
        },
      },
    ],
  },
  {
    component: 'p-button-pure',
    examples: [
      {
        name: 'ButtonPureExampleForm',
        paths: {
          'vanilla-js': '/button-pure-example-form.html',
          angular: '/button-pure-example-form.component.ts',
          react: '/ButtonPureExampleForm.tsx',
          vue: '/ButtonPureExampleForm.vue',
        },
      },
      {
        name: 'ButtonPureExampleFormAttribute',
        paths: {
          'vanilla-js': '/button-pure-example-form-attribute.html',
          angular: '/button-pure-example-form-attribute.component.ts',
          react: '/ButtonPureExampleFormAttribute.tsx',
          vue: '/ButtonPureExampleFormAttribute.vue',
        },
      },
    ],
  },
  {
    component: 'p-canvas',
    examples: [
      {
        name: 'CanvasExample',
        paths: {
          'vanilla-js': '/canvas-example.html',
          angular: '/canvas-example.component.ts',
          react: '/CanvasExample.tsx',
          vue: '/CanvasExample.vue',
        },
      },
    ],
  },
  {
    component: 'p-carousel',
    examples: [
      {
        name: 'CarouselExampleEvents',
        paths: {
          'vanilla-js': '/carousel-example-events.html',
          angular: '/carousel-example-events.component.ts',
          react: '/CarouselExampleEvents.tsx',
          vue: '/CarouselExampleEvents.vue',
        },
      },
      {
        name: 'CarouselExampleDynamicSlides',
        paths: {
          'vanilla-js': '/carousel-example-dynamic-slides.html',
          angular: '/carousel-example-dynamic-slides.component.ts',
          react: '/CarouselExampleDynamicSlides.tsx',
          vue: '/CarouselExampleDynamicSlides.vue',
        },
      },
      {
        name: 'CarouselExampleFocusOnCenterSlide',
        paths: {
          'vanilla-js': '/carousel-example-focus-on-center-slide.html',
          angular: '/carousel-example-focus-on-center-slide.component.ts',
          react: '/CarouselExampleFocusOnCenterSlide.tsx',
          vue: '/CarouselExampleFocusOnCenterSlide.vue',
        },
      },
      {
        name: 'CarouselExampleJumpToSlide',
        paths: {
          'vanilla-js': '/carousel-example-jump-to-slide.html',
          angular: '/carousel-example-jump-to-slide.component.ts',
          react: '/CarouselExampleJumpToSlide.tsx',
          vue: '/CarouselExampleJumpToSlide.vue',
        },
      },
    ],
  },
  {
    component: 'p-checkbox',
    examples: [
      {
        name: 'CheckboxExample',
        paths: {
          'vanilla-js': '/checkbox-example.html',
          angular: '/checkbox-example.component.ts',
          react: '/CheckboxExample.tsx',
          vue: '/CheckboxExample.vue',
        },
      },
      {
        name: 'CheckboxExampleControlled',
        paths: {
          'vanilla-js': '/checkbox-example-controlled.html',
          angular: '/checkbox-example-controlled.component.ts',
          react: '/CheckboxExampleControlled.tsx',
          vue: '/CheckboxExampleControlled.vue',
        },
      },
    ],
  },
  {
    component: 'p-flyout',
    examples: [
      {
        name: 'FlyoutExample',
        paths: {
          'vanilla-js': '/flyout-example.html',
          angular: '/flyout-example.component.ts',
          react: '/FlyoutExample.tsx',
          vue: '/FlyoutExample.vue',
        },
      },
      {
        name: 'FlyoutExampleForm',
        paths: {
          'vanilla-js': '/flyout-example-form.html',
          angular: '/flyout-example-form.component.ts',
          react: '/FlyoutExampleForm.tsx',
          vue: '/FlyoutExampleForm.vue',
        },
      },
    ],
  },
  {
    component: 'p-flyout-multilevel',
    examples: [
      {
        name: 'FlyoutMultilevelExample',
        paths: {
          'vanilla-js': '/flyout-multilevel-example.html',
          angular: '/flyout-multilevel-example.component.ts',
          react: '/FlyoutMultilevelExample.tsx',
          vue: '/FlyoutMultilevelExample.vue',
        },
      },
      {
        name: 'FlyoutMultilevelExampleActiveIdentifier',
        paths: {
          'vanilla-js': '/flyout-multilevel-example-active-identifier.html',
          angular: '/flyout-multilevel-example-active-identifier.component.ts',
          react: '/FlyoutMultilevelExampleActiveIdentifier.tsx',
          vue: '/FlyoutMultilevelExampleActiveIdentifier.vue',
        },
      },
      {
        name: 'FlyoutMultilevelExampleCustomContent',
        paths: {
          'vanilla-js': '/flyout-multilevel-example-custom-content.html',
          angular: '/flyout-multilevel-example-custom-content.component.ts',
          react: '/FlyoutMultilevelExampleCustomContent.tsx',
          vue: '/FlyoutMultilevelExampleCustomContent.vue',
        },
      },
    ],
  },
  {
    component: 'p-inline-notification',
    examples: [
      {
        name: 'InlineNotificationExampleEvents',
        paths: {
          'vanilla-js': '/inline-notification-example-events.html',
          angular: '/inline-notification-example-events.component.ts',
          react: '/InlineNotificationExampleEvents.tsx',
          vue: '/InlineNotificationExampleEvents.vue',
        },
      },
      {
        name: 'InlineNotificationExampleActionButton',
        paths: {
          'vanilla-js': '/inline-notification-example-action-button.html',
          angular: '/inline-notification-example-action-button.component.ts',
          react: '/InlineNotificationExampleActionButton.tsx',
          vue: '/InlineNotificationExampleActionButton.vue',
        },
      },
    ],
  },
  {
    component: 'p-link-tile-product',
    examples: [
      {
        name: 'LinkTileProductExample',
        paths: {
          'vanilla-js': '/link-tile-product-example.html',
          angular: '/link-tile-product-example.component.ts',
          react: '/LinkTileProductExample.tsx',
          vue: '/LinkTileProductExample.vue',
        },
      },
    ],
  },
  {
    component: 'p-multi-select',
    examples: [
      {
        name: 'MultiSelectExample',
        paths: {
          'vanilla-js': '/multi-select-example.html',
          angular: '/multi-select-example.component.ts',
          react: '/MultiSelectExample.tsx',
          vue: '/MultiSelectExample.vue',
        },
      },
      {
        name: 'MultiSelectExampleControlled',
        paths: {
          'vanilla-js': '/multi-select-example-controlled.html',
          angular: '/multi-select-example-controlled.component.ts',
          react: '/MultiSelectExampleControlled.tsx',
          vue: '/MultiSelectExampleControlled.vue',
        },
      },
      {
        name: 'MultiSelectExampleDynamic',
        paths: {
          'vanilla-js': '/multi-select-example-dynamic.html',
          angular: '/multi-select-example-dynamic.component.ts',
          react: '/MultiSelectExampleDynamic.tsx',
          vue: '/MultiSelectExampleDynamic.vue',
        },
      },
    ],
  },
  {
    component: 'p-pin-code',
    examples: [
      {
        name: 'PinCodeExample',
        paths: {
          'vanilla-js': '/pin-code-example.html',
          angular: '/pin-code-example.component.ts',
          react: '/PinCodeExample.tsx',
          vue: '/PinCodeExample.vue',
        },
      },
      {
        name: 'PinCodeExampleControlled',
        paths: {
          'vanilla-js': '/pin-code-example-controlled.html',
          angular: '/pin-code-example-controlled.component.ts',
          react: '/PinCodeExampleControlled.tsx',
          vue: '/PinCodeExampleControlled.vue',
        },
      },
    ],
  },
  {
    component: 'p-scroller',
    examples: [
      {
        name: 'ScrollerExample',
        paths: {
          'vanilla-js': '/scroller-example.html',
          angular: '/scroller-example.component.ts',
          react: '/ScrollerExample.tsx',
          vue: '/ScrollerExample.vue',
        },
      },
    ],
  },
  {
    component: 'p-segmented-control',
    examples: [
      {
        name: 'SegmentedControlExample',
        paths: {
          'vanilla-js': '/segmented-control-example.html',
          angular: '/segmented-control-example.component.ts',
          react: '/SegmentedControlExample.tsx',
          vue: '/SegmentedControlExample.vue',
        },
      },
      {
        name: 'SegmentedControlExampleControlled',
        paths: {
          'vanilla-js': '/segmented-control-example-controlled.html',
          angular: '/segmented-control-example-controlled.component.ts',
          react: '/SegmentedControlExampleControlled.tsx',
          vue: '/SegmentedControlExampleControlled.vue',
        },
      },
    ],
  },
  {
    component: 'p-select',
    examples: [
      {
        name: 'SelectExample',
        paths: {
          'vanilla-js': '/select-example.html',
          angular: '/select-example.component.ts',
          react: '/SelectExample.tsx',
          vue: '/SelectExample.vue',
        },
      },
      {
        name: 'SelectExampleControlled',
        paths: {
          'vanilla-js': '/select-example-controlled.html',
          angular: '/select-example-controlled.component.ts',
          react: '/SelectExampleControlled.tsx',
          vue: '/SelectExampleControlled.vue',
        },
      },
      {
        name: 'SelectExampleDynamic',
        paths: {
          'vanilla-js': '/select-example-dynamic.html',
          angular: '/select-example-dynamic.component.ts',
          react: '/SelectExampleDynamic.tsx',
          vue: '/SelectExampleDynamic.vue',
        },
      },
      {
        name: 'SelectExampleRequired',
        paths: {
          'vanilla-js': '/select-example-required.html',
          angular: '/select-example-required.component.ts',
          react: '/SelectExampleRequired.tsx',
          vue: '/SelectExampleRequired.vue',
        },
      },
    ],
  },
  {
    component: 'p-stepper-horizontal',
    examples: [
      {
        name: 'StepperHorizontalExample',
        paths: {
          'vanilla-js': '/stepper-horizontal-example.html',
          angular: '/stepper-horizontal-example.component.ts',
          react: '/StepperHorizontalExample.tsx',
          vue: '/StepperHorizontalExample.vue',
        },
      },
    ],
  },
  // TODO: Change Table Example to not include shared data
  // {
  //   component: 'p-table',
  //   examples: [
  //     [
  //       componentsJsPath + '/table-example-basic.html',
  //       componentsAngularPath + '/table-example-basic.component.ts',
  //       componentsReactPath + '/TableExampleBasic.tsx',
  //       componentsVuePath + '/TableExampleBasic.vue',
  //       'src/data/table-data-basic.ts', // order is important since part of filename is extracted for param types of function name
  //     ],
  //     [
  //       componentsJsPath + '/table-example-sorting.html',
  //       componentsAngularPath + '/table-example-sorting.component.ts',
  //       componentsReactPath + '/TableExampleSorting.tsx',
  //       componentsVuePath + '/TableExampleSorting.vue',
  //       'src/data/table-data-sorting.ts', // order is important since part of filename is extracted for param types of function name
  //     ],
  //     [
  //       componentsJsPath + '/table-example-advanced.html',
  //       componentsAngularPath + '/table-example-advanced.component.ts',
  //       componentsReactPath + '/TableExampleAdvanced.tsx',
  //       componentsVuePath + '/TableExampleAdvanced.vue',
  //       'src/data/table-data-advanced.ts', // order is important since part of filename is extracted for param types of function name
  //     ],
  //   ],
  // },
  {
    component: 'p-tabs-bar',
    examples: [
      {
        name: 'TabsBarExample',
        paths: {
          'vanilla-js': '/tabs-bar-example-basic.html',
          angular: '/tabs-bar-example-basic.component.ts',
          react: '/TabsBarExampleBasic.tsx',
          vue: '/TabsBarExampleBasic.vue',
        },
      },
      {
        name: 'TabsBarExampleAccessibility',
        paths: {
          'vanilla-js': '/tabs-bar-example-accessibility.html',
          angular: '/tabs-bar-example-accessibility.component.ts',
          react: '/TabsBarExampleAccessibility.tsx',
          vue: '/TabsBarExampleAccessibility.vue',
        },
      },
    ],
  },
  {
    component: 'p-textarea',
    examples: [
      {
        name: 'TextareaExample',
        paths: {
          'vanilla-js': '/textarea-example.html',
          angular: '/textarea-example.component.ts',
          react: '/TextareaExample.tsx',
          vue: '/TextareaExample.vue',
        },
      },
      {
        name: 'TextareaExampleControlled',
        paths: {
          'vanilla-js': '/textarea-example-controlled.html',
          angular: '/textarea-example-controlled.component.ts',
          react: '/TextareaExampleControlled.tsx',
          vue: '/TextareaExampleControlled.vue',
        },
      },
    ],
  },
  {
    component: 'p-text-field-wrapper',
    examples: [
      // {
      //   name: 'TextFieldWrapperExampleIMask',
      //   paths: {
      //     'vanilla-js': '/text-field-wrapper-example-imask.html',
      //     angular: '/text-field-wrapper-example-imask.component.ts',
      //     react: '/TextFieldWrapperExampleIMask.tsx',
      //     vue: '/TextFieldWrapperExampleIMask.vue',
      //   },
      // },
      {
        name: 'TextFieldWrapperExampleSearch',
        paths: {
          'vanilla-js': '/text-field-wrapper-example-search.html',
          angular: '/text-field-wrapper-example-search.component.ts',
          react: '/TextFieldWrapperExampleSearch.tsx',
          vue: '/TextFieldWrapperExampleSearch.vue',
        },
      },
    ],
  },
  {
    component: 'p-toast',
    examples: [
      {
        name: 'ToastExample',
        paths: {
          'vanilla-js': '/toast-example.html',
          angular: '/toast-example.component.ts',
          react: '/ToastExample.tsx',
          vue: '/ToastExample.vue',
        },
      },
    ],
  },
  // {
  //   component: 'styles-border',
  //   examples: [
  //     [
  //       componentsAngularPath + '/../styles/styles-border-example.component.ts',
  //       componentsReactPath + '/../styles/StylesBorderExample.tsx',
  //     ],
  //   ],
  // },
  // {
  //   component: 'styles-drop-shadow',
  //   examples: [
  //     [
  //       componentsAngularPath + '/../styles/styles-drop-shadow-example.component.ts',
  //       componentsReactPath + '/../styles/StylesDropShadowExample.tsx',
  //     ],
  //   ],
  // },
  // {
  //   component: 'styles-focus',
  //   examples: [
  //     [
  //       componentsAngularPath + '/../styles/styles-focus-example.component.ts',
  //       componentsReactPath + '/../styles/StylesFocusExample.tsx',
  //     ],
  //   ],
  // },
  // {
  //   component: 'styles-frosted-glass',
  //   examples: [
  //     [
  //       componentsAngularPath + '/../styles/styles-frosted-glass-example.component.ts',
  //       componentsReactPath + '/../styles/StylesFrostedGlassExample.tsx',
  //     ],
  //   ],
  // },
  // {
  //   component: 'styles-gradient',
  //   examples: [
  //     [
  //       componentsAngularPath + '/../styles/styles-gradient-example.component.ts',
  //       componentsReactPath + '/../styles/StylesGradientExample.tsx',
  //     ],
  //   ],
  // },
  // {
  //   component: 'styles-grid',
  //   examples: [
  //     [
  //       // special path to get the Grid-Layout component itself with fully rendered HTML and CSS
  //       componentsAngularPath + '/../components/grid-layout.component.ts',
  //       componentsReactPath + '/../components/GridLayout.tsx',
  //     ],
  //   ],
  // },
  // {
  //   component: 'styles-hover',
  //   examples: [
  //     [
  //       componentsAngularPath + '/../styles/styles-hover-example.component.ts',
  //       componentsReactPath + '/../styles/StylesHoverExample.tsx',
  //     ],
  //   ],
  // },
  // {
  //   component: 'styles-media-query',
  //   examples: [
  //     [
  //       componentsAngularPath + '/../styles/styles-media-query-example.component.ts',
  //       componentsReactPath + '/../styles/StylesMediaQueryExample.tsx',
  //     ],
  //   ],
  // },
  // {
  //   component: 'styles-motion',
  //   examples: [
  //     [
  //       componentsAngularPath + '/../styles/styles-motion-example.component.ts',
  //       componentsReactPath + '/../styles/StylesMotionExample.tsx',
  //     ],
  //   ],
  // },
  // {
  //   component: 'styles-skeleton',
  //   examples: [
  //     [
  //       componentsAngularPath + '/../styles/styles-skeleton-example.component.ts',
  //       componentsReactPath + '/../styles/StylesSkeletonExample.tsx',
  //     ],
  //   ],
  // },
  // {
  //   component: 'styles-spacing',
  //   examples: [
  //     [
  //       componentsAngularPath + '/../styles/styles-spacing-example.component.ts',
  //       componentsReactPath + '/../styles/StylesSpacingExample.tsx',
  //     ],
  //   ],
  // },
  // {
  //   component: 'styles-theme',
  //   examples: [
  //     [
  //       componentsAngularPath + '/../styles/styles-theme-example.component.ts',
  //       componentsReactPath + '/../styles/StylesThemeExample.tsx',
  //     ],
  //   ],
  // },
  // {
  //   component: 'styles-typography',
  //   examples: [
  //     [
  //       componentsAngularPath + '/../styles/styles-typography-example.component.ts',
  //       componentsReactPath + '/../styles/StylesTypographyExample.tsx',
  //     ],
  //   ],
  // },
];

// Paths to the examples folder for each framework in the monorepo
const frameworkPaths: Record<Framework, string> = {
  'vanilla-js': '../components-js/src/examples',
  angular: '../components-angular/src/app/examples',
  react: '../components-react/src/examples',
  vue: '../components-vue/src/examples',
};

const generateNextJsCodeExamples = (codeExamples: CodeSample[]) => {
  const targetDirectory = path.normalize('./src/examples');
  fs.mkdirSync(path.resolve(targetDirectory), { recursive: true });

  const generatedFiles: string[] = [];

  for (const sample of codeExamples) {
    for (const example of sample.examples) {
      // Resolve each filePath to the fileContent
      const frameworkMarkup: FrameworkMarkup = Object.fromEntries(
        Object.entries(example.paths).map(([framework, filePath]: [Framework, string]) => {
          const exampleFilePath = path.resolve(frameworkPaths[framework] + filePath);
          const fileContent = fs.readFileSync(exampleFilePath, 'utf8').trim();
          return [framework, fileContent];
        })
      );

      // TODO: Can we change the examples so this wouldn't be necessary?
      const transformedFrameworkMarkup = {
        ...frameworkMarkup,
        // Stackblitz needs explicit React import & adjust component name to match what's used in stackblitz example
        react: `import React from 'react';\n${frameworkMarkup.react.replace(/export const (\w+)Page\s*=/, 'export const Example =')}`,
        // Adjust selector & component name to match what's used in stackblitz example
        angular: frameworkMarkup.angular
          .replace(/export class (\w+)Component\s*\{/, 'export class ExampleComponent {')
          .replace(/selector: '[^']*'/g, "selector: 'porsche-design-system-app'"),
      };

      // Adjust the import and to use ssr package
      const nextJsMarkup = `'use client';\nimport type { CodeSample } from "../models";\n${frameworkMarkup.react.replace(
        '@porsche-design-system/components-react',
        '@porsche-design-system/components-react/ssr'
      )}`;

      const fileName = path.basename(example.paths.react);
      const componentName = fileName.replace('.tsx', '');

      // Add export of codeSamples
      const fileContent = `${nextJsMarkup}\n\nexport const ${camelCase(componentName)}: CodeSample = {
  component: ${componentName}Page,
  frameworkMarkup: ${JSON.stringify(transformedFrameworkMarkup)}
}`;

      const targetFile = path.resolve(targetDirectory, fileName);

      fs.writeFileSync(targetFile, fileContent);
      console.log(`Generated Next.js example: ${targetFile}`);
      generatedFiles.push(componentName);
    }
  }

  // Generate index.ts file
  const indexFileContent = generatedFiles.map((file) => `export * from './${file}';`).join('\n');

  fs.writeFileSync(path.resolve(targetDirectory, 'index.ts'), indexFileContent);
  console.log(`Generated index.ts for Next.js code examples in ${targetDirectory}`);

  console.log(`Next.js code examples generated in ${targetDirectory}`);
};

generateNextJsCodeExamples(codeExamples);
