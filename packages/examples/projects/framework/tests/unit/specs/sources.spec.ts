import { sourceFiles, toFrameworkMarkup, toPreview } from '../../../lib/sources';

describe('sourceFiles()', () => {
  it('names the file of every example app by its convention', () => {
    expect(sourceFiles('select-example-dynamic')).toEqual({
      'vanilla-js': 'select-example-dynamic.html',
      angular: 'select-example-dynamic.component.ts',
      react: 'SelectExampleDynamic.tsx',
      vue: 'SelectExampleDynamic.vue',
    });
  });

  it('takes the files a meta names', () => {
    const files = {
      'vanilla-js': 'ag-grid-example-community.html',
      angular: 'ag-grid-example-community.component.ts',
      react: 'AGGridExampleCommunity.tsx',
      vue: 'AGGridExampleCommunity.vue',
    };
    expect(sourceFiles(files)).toBe(files);
  });
});

describe('toFrameworkMarkup()', () => {
  const markup = toFrameworkMarkup({
    'vanilla-js': '\n<img src="http://localhost:3002/image.png" />\n',
    angular: `@Component({\n  selector: 'page-select-example',\n})\nexport class SelectExampleComponent {\n}`,
    react: `import { PSelect } from '@porsche-design-system/components-react';\nexport const SelectExample = () => null;`,
    vue: '<template><PSelect /></template>',
  });

  it('trims the sources and serves assets from the Storefront', () => {
    expect(markup['vanilla-js']).toBe('<img src="assets/image.png" />');
    expect(markup.vue).toBe('<template><PSelect /></template>');
  });

  it('names the React component Example and imports React', () => {
    expect(markup.react).toBe(
      `import React from 'react';\nimport { PSelect } from '@porsche-design-system/components-react';\nexport const Example = () => null;`
    );
  });

  it('names the Angular component ExampleComponent with the selector of the StackBlitz app', () => {
    expect(markup.angular).toBe(
      `@Component({\n  selector: 'porsche-design-system-app',\n})\nexport class ExampleComponent {\n}`
    );
  });
});

describe('toPreview()', () => {
  it('is a client module whose default export is the example, rendered with the server-renderable components', () => {
    expect(
      toPreview(
        `import { PSelect } from '@porsche-design-system/components-react';\n\nexport const SelectExample = () => <PSelect src="http://localhost:3002/a.png" />;\n`
      )
    ).toBe(
      `'use client';\nimport { PSelect } from '@porsche-design-system/components-react/ssr';\n\nconst Example = () => <PSelect src="assets/a.png" />;\n\nexport default Example;\n`
    );
  });
});
