import type { ComponentMeta } from '@porsche-design-system/component-meta';
import {
  buildSubComponentMap,
  parseRequiredParents,
  renderComponentApi,
  renderSubComponents,
} from '@skills/knowledge/components/api';
import { describe, expect, it } from 'vitest';
import { componentApiFixtures } from '../../../data/knowledge/componentApiFixtures';

const { 'p-accordion': accordion, 'p-heading': heading } = componentApiFixtures;

describe('renderComponentApi', () => {
  it('renders the full API section for a component with props, events, slots and CSS variables', () => {
    expect(renderComponentApi(accordion)).toMatchSnapshot();
  });

  it('renders the API section for a component whose props carry deprecated values', () => {
    expect(renderComponentApi(heading)).toMatchSnapshot();
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

describe('buildSubComponentMap', () => {
  // A parent, a direct sub-component, a nested sub-component (parent is itself a sub), and a
  // sub-component shared by two top-level parents.
  const meta = {
    'p-table': { isChunked: true } as unknown as ComponentMeta,
    'p-table-body': { requiredParent: 'p-table' } as unknown as ComponentMeta,
    'p-table-row': { requiredParent: ['p-table-body', 'p-table-head'] } as unknown as ComponentMeta,
    'p-table-head': { requiredParent: 'p-table' } as unknown as ComponentMeta,
    'p-select': { isChunked: true } as unknown as ComponentMeta,
    'p-multi-select': { isChunked: true } as unknown as ComponentMeta,
    'p-optgroup': { requiredParent: ['p-select', 'p-multi-select'] } as unknown as ComponentMeta,
  };

  it('maps each top-level component to its (transitive) sub-components, sorted', () => {
    const map = buildSubComponentMap(meta);
    expect(map['p-table'].map((s) => s.tag)).toEqual(['p-table-body', 'p-table-head', 'p-table-row']);
  });

  it('attaches a shared sub-component to every top-level parent it resolves to', () => {
    const map = buildSubComponentMap(meta);
    expect(map['p-select'].map((s) => s.tag)).toContain('p-optgroup');
    expect(map['p-multi-select'].map((s) => s.tag)).toContain('p-optgroup');
  });

  it('never lists a top-level component as its own sub-component', () => {
    const map = buildSubComponentMap(meta);
    expect(map['p-table']?.map((s) => s.tag)).not.toContain('p-table');
  });
});
