import { splitVanillaJsCode } from '../../../src/utils/splitVanillaJsCode';

describe('splitVanillaJsCode()', () => {
  it('should return empty script attributes for a script tag without attributes', () => {
    const code = `<p-button>Some label</p-button>
<script>
  const button = document.querySelector('p-button');
</script>`;

    expect(splitVanillaJsCode(code)).toStrictEqual({
      markup: '<p-button>Some label</p-button>',
      script: "  const button = document.querySelector('p-button');",
      scriptAttributes: '',
    });
  });

  it('should capture the attributes of a module script tag', () => {
    const code = `<script type="module">
  import { pdsTheme } from '@porsche-design-system/components-js/ag-grid';
</script>

<div id="my-grid"></div>`;

    expect(splitVanillaJsCode(code)).toStrictEqual({
      markup: '<div id="my-grid"></div>',
      script: "  import { pdsTheme } from '@porsche-design-system/components-js/ag-grid';",
      scriptAttributes: 'type="module"',
    });
  });

  it('should keep a multi-line script intact including blank lines', () => {
    const code = `<script type="module">
  import * as agGrid from 'ag-grid-community';

  agGrid.ModuleRegistry.registerModules([agGrid.AllCommunityModule]);

  const grid = document.querySelector('#my-grid');
</script>`;

    expect(splitVanillaJsCode(code).script).toBe(`  import * as agGrid from 'ag-grid-community';

  agGrid.ModuleRegistry.registerModules([agGrid.AllCommunityModule]);

  const grid = document.querySelector('#my-grid');`);
  });
});
