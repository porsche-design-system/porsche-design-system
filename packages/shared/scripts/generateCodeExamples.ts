import { camelCase } from 'change-case';
import fs from 'fs';
import path from 'path';
import type { Framework, FrameworkMarkup, TagName } from '../src';

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
  paths: { [key in Framework]?: string };
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
    component: 'p-button-tile',
    examples: [
      {
        name: 'ButtonTileExampleHyphens',
        paths: {
          'vanilla-js': '/button-tile-example-hyphens.html',
          angular: '/button-tile-example-hyphens.component.ts',
          react: '/ButtonTileExampleHyphens.tsx',
          vue: '/ButtonTileExampleHyphens.vue',
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
        name: 'CheckboxExampleForm',
        paths: {
          'vanilla-js': '/checkbox-example-form.html',
          angular: '/checkbox-example-form.component.ts',
          react: '/CheckboxExampleForm.tsx',
          vue: '/CheckboxExampleForm.vue',
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
    component: 'p-input-password',
    examples: [
      {
        name: 'InputPasswordExampleForm',
        paths: {
          'vanilla-js': '/input-password-example-form.html',
          angular: '/input-password-example-form.component.ts',
          react: '/InputPasswordExampleForm.tsx',
          vue: '/InputPasswordExampleForm.vue',
        },
      },
    ],
  },
  {
    component: 'p-input-number',
    examples: [
      {
        name: 'InputNumberExampleForm',
        paths: {
          'vanilla-js': '/input-number-example-form.html',
          angular: '/input-number-example-form.component.ts',
          react: '/InputNumberExampleForm.tsx',
          vue: '/InputNumberExampleForm.vue',
        },
      },
    ],
  },
  {
    component: 'p-input-date',
    examples: [
      {
        name: 'InputDateExampleForm',
        paths: {
          'vanilla-js': '/input-date-example-form.html',
          angular: '/input-date-example-form.component.ts',
          react: '/InputDateExampleForm.tsx',
          vue: '/InputDateExampleForm.vue',
        },
      },
    ],
  },
  {
    component: 'p-input-month',
    examples: [
      {
        name: 'InputMonthExampleForm',
        paths: {
          'vanilla-js': '/input-month-example-form.html',
          angular: '/input-month-example-form.component.ts',
          react: '/InputMonthExampleForm.tsx',
          vue: '/InputMonthExampleForm.vue',
        },
      },
    ],
  },
  {
    component: 'p-input-week',
    examples: [
      {
        name: 'InputWeekExampleForm',
        paths: {
          'vanilla-js': '/input-week-example-form.html',
          angular: '/input-week-example-form.component.ts',
          react: '/InputWeekExampleForm.tsx',
          vue: '/InputWeekExampleForm.vue',
        },
      },
    ],
  },
  {
    component: 'p-input-time',
    examples: [
      {
        name: 'InputTimeExampleForm',
        paths: {
          'vanilla-js': '/input-time-example-form.html',
          angular: '/input-time-example-form.component.ts',
          react: '/InputTimeExampleForm.tsx',
          vue: '/InputTimeExampleForm.vue',
        },
      },
    ],
  },
  {
    component: 'p-input-text',
    examples: [
      {
        name: 'InputTextExampleForm',
        paths: {
          'vanilla-js': '/input-text-example-form.html',
          angular: '/input-text-example-form.component.ts',
          react: '/InputTextExampleForm.tsx',
          vue: '/InputTextExampleForm.vue',
        },
      },
    ],
  },
  {
    component: 'p-input-email',
    examples: [
      {
        name: 'InputEmailExampleForm',
        paths: {
          'vanilla-js': '/input-email-example-form.html',
          angular: '/input-email-example-form.component.ts',
          react: '/InputEmailExampleForm.tsx',
          vue: '/InputEmailExampleForm.vue',
        },
      },
    ],
  },
  {
    component: 'p-input-tel',
    examples: [
      {
        name: 'InputTelExampleForm',
        paths: {
          'vanilla-js': '/input-tel-example-form.html',
          angular: '/input-tel-example-form.component.ts',
          react: '/InputTelExampleForm.tsx',
          vue: '/InputTelExampleForm.vue',
        },
      },
    ],
  },
  {
    component: 'p-input-url',
    examples: [
      {
        name: 'InputUrlExampleForm',
        paths: {
          'vanilla-js': '/input-url-example-form.html',
          angular: '/input-url-example-form.component.ts',
          react: '/InputUrlExampleForm.tsx',
          vue: '/InputUrlExampleForm.vue',
        },
      },
    ],
  },
  {
    component: 'p-input-search',
    examples: [
      {
        name: 'InputSearchExampleForm',
        paths: {
          'vanilla-js': '/input-search-example-form.html',
          angular: '/input-search-example-form.component.ts',
          react: '/InputSearchExampleForm.tsx',
          vue: '/InputSearchExampleForm.vue',
        },
      },
    ],
  },
  {
    component: 'p-link-tile',
    examples: [
      {
        name: 'LinkTileExampleHyphens',
        paths: {
          'vanilla-js': '/link-tile-example-hyphens.html',
          angular: '/link-tile-example-hyphens.component.ts',
          react: '/LinkTileExampleHyphens.tsx',
          vue: '/LinkTileExampleHyphens.vue',
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
        name: 'MultiSelectExampleForm',
        paths: {
          'vanilla-js': '/multi-select-example-form.html',
          angular: '/multi-select-example-form.component.ts',
          react: '/MultiSelectExampleForm.tsx',
          vue: '/MultiSelectExampleForm.vue',
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
      {
        name: 'MultiSelectExampleAsync',
        paths: {
          'vanilla-js': '/multi-select-example-async-filter.html',
          angular: '/multi-select-example-async-filter.component.ts',
          react: '/MultiSelectExampleAsyncFilter.tsx',
          vue: '/MultiSelectExampleAsyncFilter.vue',
        },
      },
      {
        name: 'MultiSelectExampleSelectedSlot',
        paths: {
          'vanilla-js': '/multi-select-example-selected-slot.html',
          angular: '/multi-select-example-selected-slot.component.ts',
          react: '/MultiSelectExampleSelectedSlot.tsx',
          vue: '/MultiSelectExampleSelectedSlot.vue',
        },
      },
    ],
  },
  {
    component: 'p-pin-code',
    examples: [
      {
        name: 'PinCodeExampleForm',
        paths: {
          'vanilla-js': '/pin-code-example-form.html',
          angular: '/pin-code-example-form.component.ts',
          react: '/PinCodeExampleForm.tsx',
          vue: '/PinCodeExampleForm.vue',
        },
      },
    ],
  },
  {
    component: 'p-radio-group',
    examples: [
      {
        name: 'RadioGroupExampleForm',
        paths: {
          'vanilla-js': '/radio-group-example-form.html',
          angular: '/radio-group-example-form.component.ts',
          react: '/RadioGroupExampleForm.tsx',
          vue: '/RadioGroupExampleForm.vue',
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
        name: 'SegmentedControlExampleForm',
        paths: {
          'vanilla-js': '/segmented-control-example-form.html',
          angular: '/segmented-control-example-form.component.ts',
          react: '/SegmentedControlExampleForm.tsx',
          vue: '/SegmentedControlExampleForm.vue',
        },
      },
    ],
  },
  {
    component: 'p-select',
    examples: [
      {
        name: 'SelectExampleForm',
        paths: {
          'vanilla-js': '/select-example-form.html',
          angular: '/select-example-form.component.ts',
          react: '/SelectExampleForm.tsx',
          vue: '/SelectExampleForm.vue',
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
      {
        name: 'SelectExampleAsync',
        paths: {
          'vanilla-js': '/select-example-async-filter.html',
          angular: '/select-example-async-filter.component.ts',
          react: '/SelectExampleAsyncFilter.tsx',
          vue: '/SelectExampleAsyncFilter.vue',
        },
      },
      {
        name: 'SelectExampleSelectedSlot',
        paths: {
          'vanilla-js': '/select-example-selected-slot.html',
          angular: '/select-example-selected-slot.component.ts',
          react: '/SelectExampleSelectedSlot.tsx',
          vue: '/SelectExampleSelectedSlot.vue',
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
  {
    component: 'p-table',
    examples: [
      {
        name: 'table-example-basic',
        paths: {
          'vanilla-js': '/table-example-basic.html',
          angular: '/table-example-basic.component.ts',
          react: '/TableExampleBasic.tsx',
          vue: '/TableExampleBasic.vue',
        },
      },
      {
        name: 'table-example-sorting',
        paths: {
          'vanilla-js': '/table-example-sorting.html',
          angular: '/table-example-sorting.component.ts',
          react: '/TableExampleSorting.tsx',
          vue: '/TableExampleSorting.vue',
        },
      },
      {
        name: 'table-example-advanced',
        paths: {
          'vanilla-js': '/table-example-advanced.html',
          angular: '/table-example-advanced.component.ts',
          react: '/TableExampleAdvanced.tsx',
          vue: '/TableExampleAdvanced.vue',
        },
      },
    ],
  },
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
        name: 'TextareaExampleForm',
        paths: {
          'vanilla-js': '/textarea-example-form.html',
          angular: '/textarea-example-form.component.ts',
          react: '/TextareaExampleForm.tsx',
          vue: '/TextareaExampleForm.vue',
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
          let fileContent = fs.readFileSync(exampleFilePath, 'utf8').trim();
          // Replace locally served assets with public assets folder of storefront
          fileContent = fileContent.replace(/http:\/\/localhost:3002/g, 'assets');
          return [framework, fileContent];
        })
      );

      // TODO: Can we change the examples so this wouldn't be necessary?
      const transformedFrameworkMarkup = {
        ...frameworkMarkup,
        // Stackblitz needs explicit React import & adjust component name to match what's used in stackblitz example
        react: `import React from 'react';\n${frameworkMarkup.react.replace(/export const (\w+)\s*=/, 'export const Example =')}`,
        // Adjust selector & component name to match what's used in stackblitz example
        angular: frameworkMarkup.angular
          .replace(/export class (\w+)Component\s*\{/, 'export class ExampleComponent {')
          .replace(/selector: '[^']*'/g, "selector: 'porsche-design-system-app'"),
      };

      // Adjust the import and to use ssr package
      const nextJsMarkup = `'use client';\nimport type { CodeSample } from "../models";\n${frameworkMarkup.react
        .replace("@porsche-design-system/components-react'", "@porsche-design-system/components-react/ssr'")
        .replace(/export const (\w+)\s*=/, 'const Example =')}`;

      const fileName = path.basename(example.paths.react);
      const componentName = fileName.replace('.tsx', '');

      // Add export of codeSamples
      const fileContent = `${nextJsMarkup}\n\nexport const ${camelCase(componentName)}: CodeSample = {
  component: Example,
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
