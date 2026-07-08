import type { ComponentMeta } from '@porsche-design-system/component-meta';
import { describe, expect, it } from 'vitest';
import {
  deriveIconNames,
  parseRequiredParents,
  renderComponentApi,
  renderIconsReference,
  renderSubComponents,
} from '@/lib/skill/componentApi';
import { componentApiFixtures } from '../data/skill/componentApiFixtures';

const { 'p-accordion': accordion, 'p-heading': heading } = componentApiFixtures;

describe('renderComponentApi', () => {
  it('renders the full API section for a component with props, events, slots and CSS variables', () => {
    expect(renderComponentApi(accordion, 'js')).toMatchSnapshot();
  });

  it('renders the API section for a component whose props carry deprecated values', () => {
    expect(renderComponentApi(heading, 'js')).toMatchSnapshot();
  });

  it('only emits tables that have entries', () => {
    const markdown = renderComponentApi(heading, 'js');
    expect(markdown).toContain('### Properties');
    expect(markdown).not.toContain('### Events');
    expect(markdown).toContain('### Slots');
    expect(markdown).not.toContain('### CSS Variables');
  });

  describe('union-type props', () => {
    // `value` on p-select: allowedValues is the decomposition of the union type, not enum literals.
    const selectLike = {
      isChunked: true,
      propsMeta: {
        value: {
          description: 'The selected value.',
          type: 'string | number | null',
          defaultValue: null,
          allowedValues: ['string', 'number', 'null'],
        },
        state: {
          description: 'The validation state.',
          type: 'SelectState',
          defaultValue: 'none',
          allowedValues: ['none', 'error', 'success'],
        },
      },
    } as unknown as ComponentMeta;

    it('renders a primitive union type as the type, not as quoted string literals', () => {
      const markdown = renderComponentApi(selectLike, 'js');
      expect(markdown).toContain('`string | number | null`');
      expect(markdown).not.toContain("`'string'`");
      expect(markdown).not.toContain("`'null'`");
      // a real string-literal enum is still rendered as quoted values
      expect(markdown).toContain("`'none'`");
      expect(markdown).toContain("`'error'`");
    });
  });

  describe('icon-union props', () => {
    const iconNames = ['arrow-right', 'car', 'zoom-in'];
    // p-button's `icon`: the full icon-name set plus a non-icon extra (`none`).
    const buttonLike = {
      isChunked: true,
      propsMeta: {
        icon: {
          description: 'The icon to display.',
          type: 'ButtonIcon',
          defaultValue: 'none',
          allowedValues: [...iconNames, 'none'],
        },
      },
    } as unknown as ComponentMeta;

    it('collapses the icon-name union to a shared-list link, keeping non-icon extras inline', () => {
      const markdown = renderComponentApi(buttonLike, 'js', new Set(iconNames));
      expect(markdown).toContain('see [icon names](references/icons.md)');
      expect(markdown).toContain(`one of ${iconNames.length} icon names`);
      expect(markdown).toContain("`'none'`"); // the non-icon extra is preserved
      expect(markdown).not.toContain("`'arrow-right'`"); // individual icon names are not inlined
      expect(markdown).not.toContain("`'zoom-in'`");
    });

    it('inlines the values when no icon-name set is supplied (default)', () => {
      const markdown = renderComponentApi(buttonLike, 'js');
      expect(markdown).toContain("`'arrow-right'`");
      expect(markdown).not.toContain('references/icons.md');
    });
  });

  describe('raw-meta link', () => {
    it('links the local `../meta` sibling for the js skill', () => {
      expect(renderComponentApi(accordion, 'js')).toContain('`../meta`');
    });

    it('links the js peer `/meta` subpath for framework skills', () => {
      for (const framework of ['angular', 'react', 'vue'] as const) {
        const markdown = renderComponentApi(accordion, framework);
        expect(markdown).toContain('`@porsche-design-system/components-js/meta`');
        expect(markdown).not.toContain('`../meta`');
      }
    });
  });

  describe('deprecation handling', () => {
    it('flags fully deprecated props, slots and uses no deprecated recommended values', () => {
      const markdown = renderComponentApi(accordion, 'js');
      // deprecated prop / slot rows are kept but marked
      expect(markdown).toMatch(/`size`.*_\(deprecated\)_/);
      expect(markdown).toMatch(/`heading`.*_\(deprecated\)_/);
      // experimental and required-style flags surface too
      expect(markdown).toMatch(/`sticky`.*_\(experimental\)_/);
    });

    it('never lists a deprecated value as a recommended value', () => {
      const markdown = renderComponentApi(heading, 'js');
      // every prop row keeps its recommended values before the `deprecated:` divider
      for (const line of markdown.split('\n').filter((l: string) => l.includes('_deprecated:_'))) {
        const [recommended, deprecated] = line.split('_deprecated:_');
        for (const value of ['small', 'medium', 'large', 'x-large', 'xx-large', 'regular', 'semi-bold']) {
          expect(recommended, `recommended values must not contain deprecated '${value}'`).not.toContain(`'${value}'`);
        }
        // the deprecated values are still documented, just on the deprecated side
        expect(deprecated).toBeTruthy();
      }
      // a known recommended (non-deprecated) value is still present
      expect(markdown).toContain("`'2xs'`");
      expect(markdown).toContain("`'semibold'`");
    });
  });
});

describe('parseRequiredParents', () => {
  it('normalizes an array, a single tag, and a comma-list to a list of tags', () => {
    expect(parseRequiredParents(['p-select', 'p-optgroup'])).toEqual(['p-select', 'p-optgroup']);
    expect(parseRequiredParents('p-tabs')).toEqual(['p-tabs']);
    expect(parseRequiredParents('p-select, p-optgroup')).toEqual(['p-select', 'p-optgroup']);
  });

  it('returns an empty list for a top-level component (no requiredParent)', () => {
    expect(parseRequiredParents(undefined)).toEqual([]);
    expect(parseRequiredParents('')).toEqual([]);
  });
});

describe('renderSubComponents', () => {
  const tableRow: ComponentMeta = {
    isChunked: false,
    requiredParent: ['p-table-body', 'p-table-head'],
    slotsMeta: { '': { description: 'Cells of the row.' } },
  } as unknown as ComponentMeta;
  const tabsItem: ComponentMeta = {
    isChunked: false,
    requiredParent: 'p-tabs',
    propsMeta: {
      label: { description: 'The tab label.', type: 'string', defaultValue: null, allowedValues: 'string' },
    },
  } as unknown as ComponentMeta;

  it('renders a Sub-components section demoting each sub-component below the parent API', () => {
    const markdown = renderSubComponents([
      { tag: 'p-table-row', meta: tableRow },
      { tag: 'p-tabs-item', meta: tabsItem },
    ]);

    expect(markdown).toContain('## Sub-components');
    // sub-component tags at level 3, their tables at level 4
    expect(markdown).toContain('### `p-table-row`');
    expect(markdown).toContain('### `p-tabs-item`');
    expect(markdown).toContain('#### Slots');
    expect(markdown).toContain('#### Properties');
    // allowed parents surfaced, singular/plural aware
    expect(markdown).toContain('Allowed parents: `p-table-body`, `p-table-head`.');
    expect(markdown).toContain('Allowed parent: `p-tabs`.');
  });

  it('notes when a sub-component exposes no configurable API', () => {
    const empty = { isChunked: false, requiredParent: 'p-x' } as unknown as ComponentMeta;
    const markdown = renderSubComponents([{ tag: 'p-x-item', meta: empty }]);
    expect(markdown).toContain('_No configurable properties, slots, events or CSS variables._');
  });
});

describe('deriveIconNames', () => {
  it('reads the icon-name set from `p-icon`’s own `name` allowed values', () => {
    const meta = {
      'p-icon': { propsMeta: { name: { allowedValues: ['a', 'b', 'c'] } } },
    } as unknown as Record<string, ComponentMeta>;
    expect(deriveIconNames(meta)).toEqual(['a', 'b', 'c']);
  });

  it('returns an empty list when `p-icon` (or its `name` enum) is absent', () => {
    expect(deriveIconNames({} as Record<string, ComponentMeta>)).toEqual([]);
    const stringName = { 'p-icon': { propsMeta: { name: { allowedValues: 'string' } } } } as unknown as Record<
      string,
      ComponentMeta
    >;
    expect(deriveIconNames(stringName)).toEqual([]);
  });
});

describe('renderIconsReference', () => {
  it('renders every icon name as inline code under an `# Icon names` heading', () => {
    const markdown = renderIconsReference(['arrow-right', 'car']);
    expect(markdown).toMatch(/^# Icon names/);
    expect(markdown).toContain('`arrow-right` `car`');
  });
});
