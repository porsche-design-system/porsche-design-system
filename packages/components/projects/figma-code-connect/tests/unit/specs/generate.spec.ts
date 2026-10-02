import { getComponentMeta } from '@porsche-design-system/component-meta';
import { INTERNAL_TAG_NAMES, TAG_NAMES } from '@porsche-design-system/shared';
import { describe, expect, it } from 'vitest';
import { generate } from '../../../figma/generate';
import type { Component, Definition } from '../../../figma/snapshot';

// Real component-meta, hand-written Figma component sets: no pull involved.
const set = (name: string, definitions: Record<string, Definition> = {}, id = '1:1'): Component => ({
  id,
  name,
  componentPropertyDefinitions: definitions,
});
const run = (
  components: Component[],
  options: {
    baseline?: Record<string, string[]>;
    icons?: Record<string, string>;
    tags?: string[];
    version?: string;
  } = {}
) =>
  generate({ components, icons: options.icons ?? {} }, options.baseline ?? {}, {
    getComponentMeta,
    tags: options.tags ?? [],
    outputRoot: 'generated',
    fileUrl: 'https://www.figma.com/design/KEY/Library',
    version: options.version ?? '0.0.0',
  });
const template = (result: ReturnType<typeof run>, name: string, suffix = ''): string =>
  result.files[`generated/templates/${name}/${name}${suffix}.figma.ts`];
const booleanVariant: Definition = { type: 'VARIANT', defaultValue: 'false', variantOptions: ['false', 'true'] };

describe('generate: templates', () => {
  it('reads every PDS prop and slot by its own name, whatever the Figma component has', () => {
    const button = template(run([set('button')]), 'button');
    expect(button).toContain("const disabled = read.flag('disabled');");
    expect(button).toContain("const variant = read.oneOf('variant', ['primary', 'secondary', 'destructive']);");
    expect(button).toContain('const hideLabel = read.hideLabel();');
    expect(button).toContain("const iconSource = read.text('iconSource');");
    expect(button).toContain("read.isSlot('slot-default')");
  });

  it("links a template's source and docs import to the docs of the version it was generated from", () => {
    const result = run([set('tag'), set('multi-select-option')], { version: '4.8.0' });
    expect(template(result, 'tag')).toContain('// source=https://designsystem.porsche.com/v4.8.0/components/tag/api/');
    expect(template(result, 'tag')).toContain(
      "'<!-- Docs: https://designsystem.porsche.com/v4.8.0/components/tag/api/ -->'"
    );
    // a child component is documented on its root parent's page
    expect(template(result, 'multi-select-option')).toContain(
      '// source=https://designsystem.porsche.com/v4.8.0/components/multi-select/api/'
    );
  });

  it('renders the same templates whatever properties the Figma component has', () => {
    const bare = run([set('switch')]);
    const drawn = run([
      set('switch', {
        'showLabel#1:2': { type: 'BOOLEAN', defaultValue: true },
        checked: booleanVariant,
        'slot-default#1:3': { type: 'TEXT', defaultValue: 'Some label' },
      }),
    ]);
    for (const suffix of ['', '.react', '.angular', '.vue']) {
      expect(template(drawn, 'switch', suffix)).toBe(template(bare, 'switch', suffix));
    }
  });

  it('writes a boolean prop out only when Figma sets it away from its PDS default', () => {
    // showLastPage is on by default, so only off is written; disabled is off by default, so only on is
    const result = run([set('pagination'), set('button')]);
    expect(template(result, 'pagination')).toContain("const showLastPage = !read.off('showLastPage');");
    expect(template(result, 'pagination')).toContain(`\${showLastPage ? '' : ' show-last-page="false"'}`);
    expect(template(result, 'pagination', '.react')).toContain(`\${showLastPage ? '' : ' showLastPage={false}'}`);
    expect(template(result, 'pagination', '.angular')).toContain(`\${showLastPage ? '' : ' [showLastPage]="false"'}`);
    expect(template(result, 'pagination', '.vue')).toContain(`\${showLastPage ? '' : ' :showLastPage="false"'}`);
    expect(template(result, 'button')).toContain(`\${disabled ? ' disabled="true"' : ''}`);
  });

  it('falls back to the icon an icon swap starts with, behind its fig<Prop> gate', () => {
    const icons = { '5:6': 'globe' };
    const tag = template(
      run([set('tag', { 'icon#1:4': { type: 'INSTANCE_SWAP', defaultValue: '5:6' } })], { icons }),
      'tag'
    );
    expect(tag).toContain(
      "const icon = read.has('icon') && (!read.has('figIcon') || read.flag('figIcon')) ? iconOf(instance.getInstanceSwap('icon'), 'globe') : undefined;"
    );
  });

  it('renders every PDS component without a generator error, and reads an icon swap only for a prop allowing every icon', () => {
    const tags = TAG_NAMES.filter((tag) => !(INTERNAL_TAG_NAMES as readonly string[]).includes(tag));
    const result = run(tags.map((tag) => set(tag.replace(/^p-/, ''))));
    expect(result.errors).toEqual([]);
    const withIconSwap = Object.entries(result.files)
      .filter(([path, content]) => /\/([\w-]+)\/\1\.figma\.ts$/.test(path) && content.includes('iconOf('))
      .map(([path]) => path.split('/')[2])
      .sort();
    expect(withIconSwap).toEqual([
      'button',
      'button-pure',
      'button-tile',
      'icon',
      'inline-notification',
      'link',
      'link-pure',
      'segmented-control-item',
      'tag',
    ]);
    expect(template(result, 'checkbox')).toContain("read.oneOf('state', ['none', 'error', 'success'])");
  });
});

describe('generate: design lines', () => {
  // the changes one component's design lines ask for, without the line's prefix
  const changes = (result: ReturnType<typeof run>, component: string): string[] =>
    result.designLines
      .filter((line) => line.startsWith(`design: ${component} (`))
      .map((line) => line.replace(/^design: .+? → p-[\w-]+: /, ''));

  it('asks design to add the property a PDS prop lacks, with the type the template reads', () => {
    const { designLines } = run([set('checkbox', {}, '1:2'), set('tag', {}, '1:3')]);
    expect(designLines).toContain(
      'design: checkbox (1:2) → p-checkbox: add a VARIANT property named "state" with the options none, error, success'
    );
    expect(designLines).toContain('design: tag (1:3) → p-tag: add a INSTANCE_SWAP property named "icon"');
  });

  it('renames a property named like a PDS slot to its slot- name', () => {
    const result = run([set('accordion', { summary: { type: 'SLOT' }, 'summary-before': { type: 'SLOT' } })]);
    expect(changes(result, 'accordion')).toEqual(
      expect.arrayContaining(['"summary" → "slot-summary"', '"summary-before" → "slot-summary-before"'])
    );
    expect(changes(result, 'accordion').join('\n')).not.toContain('add a SLOT property named "slot-summary"');
  });

  it('renames <prop>Value to the PDS prop, or to value', () => {
    const result = run([
      set('link-tile-product', { headingValue: { type: 'TEXT' } }),
      set('textarea', { textareaValue: { type: 'TEXT' } }),
    ]);
    expect(changes(result, 'link-tile-product')).toContain('"headingValue" → "heading"');
    expect(changes(result, 'link-tile-product').join('\n')).not.toContain('named "heading"');
    expect(changes(result, 'textarea')).toContain('"textareaValue" → "value"');
  });

  it('renames the one loose SLOT to the one missing slot, and a slot- property PDS lacks to fig', () => {
    // select's other slots drawn, as in the library, so slot-default is the one missing
    const drawn = {
      'slot-label-after': { type: 'SLOT' },
      'slot-selected': { type: 'SLOT' },
      'slot-options-status': { type: 'SLOT' },
    };
    const result = run([set('select', { ...drawn, slot: { type: 'SLOT' }, 'slot-image': { type: 'SLOT' } })]);
    expect(changes(result, 'select')).toEqual(
      expect.arrayContaining(['"slot" → "slot-default"', '"slot-image" → "figSlotImage"'])
    );
    expect(changes(result, 'select').join('\n')).not.toContain('"slot-default" with');
  });

  it('renames the one option PDS does not allow to the one option Figma lacks', () => {
    const dropdownDirection: Definition = { type: 'VARIANT', variantOptions: ['down', 'up', 'none'] };
    const lines = changes(run([set('select', { dropdownDirection })]), 'select');
    expect(lines).toContain('"none" → "auto" in "dropdownDirection"');
    expect(lines.join('\n')).not.toMatch(/"auto" to|option "none"/);
  });

  it('renames a prop of the wrong type to fig when a rename takes its name, and redraws it otherwise', () => {
    const result = run([
      set('link-tile-product', { description: { type: 'BOOLEAN' }, descriptionValue: { type: 'TEXT' } }),
      set('tag', { icon: { type: 'VARIANT', variantOptions: ['arrow-right'] } }),
    ]);
    expect(changes(result, 'link-tile-product')).toEqual(
      expect.arrayContaining(['"descriptionValue" → "description"', '"description" → "figDescription"'])
    );
    expect(changes(result, 'tag')).toEqual(
      expect.arrayContaining(['delete "icon"', 'add a INSTANCE_SWAP property named "icon"'])
    );
  });

  it('redraws a named slot drawn with another type than SLOT', () => {
    // the template reads a named slot with getSlot(), so a TEXT slot-summary renders nothing
    const lines = changes(run([set('accordion', { 'slot-summary#1:2': { type: 'TEXT' } })]), 'accordion');
    expect(lines).toEqual(
      expect.arrayContaining(['delete "slot-summary"', 'add a SLOT property named "slot-summary"'])
    );
  });

  it('asks for the option a boolean drawn as a VARIANT lacks', () => {
    const lines = changes(run([set('switch', { checked: { type: 'VARIANT', variantOptions: ['true'] } })]), 'switch');
    expect(lines).toContain('add the option "false" to "checked"');
  });

  it('keeps a # inside a property name, so "label#2" is not the PDS prop label', () => {
    // the REST key ends in #<node id>, except a VARIANT's
    const options = { variantOptions: ['none', 'error', 'success'] };
    const checkbox = set('checkbox', { 'label#2#1:2': { type: 'TEXT' }, 'state#old': { type: 'VARIANT', ...options } });
    const lines = changes(run([checkbox]), 'checkbox');
    expect(lines).toEqual(
      expect.arrayContaining([
        'add a TEXT property named "label"',
        'add a VARIANT property named "state" with the options none, error, success',
      ])
    );
  });

  it('deletes showLabel next to a drawn hideLabel, a deprecated prop and deprecated options', () => {
    const result = run([
      set('input-email', { showLabel: { type: 'BOOLEAN' }, hideLabel: booleanVariant }),
      set('accordion', { size: { type: 'VARIANT', variantOptions: ['small', 'medium'] } }),
      set('heading', { weight: { type: 'VARIANT', variantOptions: ['normal', 'semibold', 'bold', 'regular'] } }),
    ]);
    expect(changes(result, 'input-email')).toContain('delete "showLabel"');
    expect(changes(result, 'accordion')).toContain('delete "size"');
    expect(changes(result, 'heading')).toContain('delete the option "regular" from "weight"');
  });

  it('marks a Figma property no PDS name stands for as design-only', () => {
    expect(changes(run([set('button', { dense: booleanVariant }, '1:4')]), 'button')).toContain('"dense" → "figDense"');
  });

  it('deletes an option PDS does not allow, unless the baseline accepts it', () => {
    const button = set(
      'button',
      { variant: { type: 'VARIANT', variantOptions: ['primary', 'secondary', 'destructive', 'ghost'] } },
      '1:4'
    );
    expect(changes(run([button]), 'button')).toContain('delete the option "ghost" from "variant"');
    expect(run([button], { baseline: { 'p-button': ['variant=ghost'] } }).designLines.join('\n')).not.toContain(
      'ghost'
    );
  });

  it('asks for a missing slot once, as the PDS prop of its name', () => {
    const lines = changes(run([set('radio-group')]), 'radio-group');
    expect(lines).toContain('add a TEXT property named "description"');
    expect(lines).not.toContain('add a SLOT property named "slot-description"');
  });

  it('lists a baseline entry Figma made obsolete as a cleanup', () => {
    const { baselineCleanup } = run([set('button', { compact: booleanVariant })], {
      baseline: { 'p-button': ['compact'] },
    });
    expect(baselineCleanup).toEqual([
      'baseline: p-button "compact" is no longer a gap — remove it from figma/coverage-baseline.json',
    ]);
  });

  it('asks for a PDS component with no component set, unless the baseline accepts it', () => {
    const line = 'design: p-sheet: add a component set named "sheet"';
    expect(run([], { tags: ['p-sheet'] }).designLines).toContain(line);
    expect(run([], { tags: ['p-sheet'], baseline: { 'p-sheet': ['component-set'] } }).designLines).not.toContain(line);
  });

  it('asks for a PDS icon with no Figma icon component', () => {
    expect(run([]).designLines).toContain('design: p-icon: add an icon component named "arrow-right"');
  });
});
