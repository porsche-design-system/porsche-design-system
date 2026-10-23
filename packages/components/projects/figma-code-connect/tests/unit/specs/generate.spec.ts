import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import { INTERNAL_TAG_NAMES, TAG_NAMES } from '@porsche-design-system/shared';
import { describe, expect, it } from 'vitest';
import { generate } from '../../../figma/generate';
import { componentsPackagePath, pdsVersion } from '../../../figma/library';
import type { Component, Definition, Snapshot } from '../../../figma/snapshot';

// Real component-meta, hand-written Figma component sets and history: no pull involved.
const set = (name: string, definitions: Record<string, Definition> = {}, id = '1:1'): Component => ({
  id,
  name,
  componentPropertyDefinitions: definitions,
});
const run = (
  components: Component[],
  options: {
    acceptedGaps?: Record<string, string[]>;
    icons?: Record<string, string>;
    history?: Snapshot['history'];
    tags?: string[];
    version?: string;
  } = {}
) =>
  generate({ components, icons: options.icons ?? {}, history: options.history }, options.acceptedGaps ?? {}, {
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
    expect(template(result, 'tag')).toContain("'// Docs: https://designsystem.porsche.com/v4.8.0/components/tag/api/'");
    // a child component is documented on its root parent's page
    expect(template(result, 'multi-select-option')).toContain(
      '// source=https://designsystem.porsche.com/v4.8.0/components/multi-select/api/'
    );
  });

  it.each([
    { suffix: '', setup: 'vanilla-js/getting-started/' },
    { suffix: '.react', setup: 'react/getting-started/' },
    { suffix: '.angular', setup: 'angular/getting-started/' },
    { suffix: '.vue', setup: 'vue/getting-started/' },
  ])("opens a template's imports with the setup guide of its framework and version: $suffix", ({ suffix, setup }) => {
    expect(template(run([set('tag')], { version: '4.8.0' }), 'tag', suffix)).toContain(
      `imports: [\n    '// Setup: https://designsystem.porsche.com/v4.8.0/developing/${setup}',\n`
    );
  });

  it('pdsVersion reads the version of packages/components', () => {
    const packageJson = resolve(__dirname, '../../../../../package.json');
    expect(pdsVersion(resolve(__dirname, '../../..', componentsPackagePath))).toBe(
      JSON.parse(readFileSync(packageJson, 'utf8')).version
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

  it('pairs a set named like a PDS component behind fig- with no component', () => {
    const result = run([set('fig-tabs-item')]);
    expect(result.skipped).toEqual(['fig-tabs-item (1:1)']);
    expect(template(result, 'tabs-item')).toBeUndefined();
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
      'design: checkbox (1:2) → p-checkbox: Add a variant property "state" with the options none, error and success'
    );
    expect(designLines).toContain('design: tag (1:3) → p-tag: Add an instance swap property "icon"');
  });

  it('renames a property named like a PDS slot to its slot- name', () => {
    const result = run([set('accordion', { summary: { type: 'SLOT' }, 'summary-before': { type: 'SLOT' } })]);
    expect(changes(result, 'accordion')).toEqual(
      expect.arrayContaining(['Rename "summary" to "slot-summary"', 'Rename "summary-before" to "slot-summary-before"'])
    );
    expect(changes(result, 'accordion').join('\n')).not.toContain('Add a slot property "slot-summary"');
  });

  it('renames <prop>Value to the PDS prop, or to value', () => {
    const result = run([
      set('link-tile-product', { headingValue: { type: 'TEXT' } }),
      set('textarea', { textareaValue: { type: 'TEXT' } }),
    ]);
    expect(changes(result, 'link-tile-product')).toContain('Rename "headingValue" to "heading"');
    expect(changes(result, 'link-tile-product').join('\n')).not.toContain('Add a text property "heading"');
    expect(changes(result, 'textarea')).toContain('Rename "textareaValue" to "value"');
  });

  it('renames the one loose SLOT to the one missing slot, and reports a slot- property PDS lacks', () => {
    // select's other slots drawn, as in the library, so slot-default is the one missing
    const drawn = {
      'slot-label-after': { type: 'SLOT' },
      'slot-selected': { type: 'SLOT' },
      'slot-options-status': { type: 'SLOT' },
    };
    const result = run([set('select', { ...drawn, slot: { type: 'SLOT' }, 'slot-image': { type: 'SLOT' } })]);
    expect(changes(result, 'select')).toEqual(
      expect.arrayContaining([
        'Rename "slot" to "slot-default"',
        '"slot-image" is not a PDS property: rename it to "figSlotImage" if it is only for Figma, or delete it',
      ])
    );
    expect(changes(result, 'select').join('\n')).not.toContain('Add a slot property "slot-default"');
  });

  it('renames the one option PDS does not allow to the one option Figma lacks', () => {
    const dropdownDirection: Definition = { type: 'VARIANT', variantOptions: ['down', 'up', 'none'] };
    const lines = changes(run([set('select', { dropdownDirection })]), 'select');
    expect(lines).toContain('Rename the option "none" to "auto" in "dropdownDirection"');
    expect(lines.join('\n')).not.toMatch(/Add the option "auto"|Delete the option "none"/);
  });

  it('tells a prop of the wrong type whose name a rename takes to go, and redraws it otherwise', () => {
    const result = run([
      set('link-tile-product', { description: { type: 'BOOLEAN' }, descriptionValue: { type: 'TEXT' } }),
      set('tag', { icon: { type: 'VARIANT', variantOptions: ['arrow-right'] } }),
    ]);
    expect(changes(result, 'link-tile-product')).toEqual(
      expect.arrayContaining([
        'Rename "descriptionValue" to "description"',
        'Rename "description" to "figDescription" or delete it: "descriptionValue" is the PDS "description"',
      ])
    );
    expect(changes(result, 'tag')).toContain('Redraw "icon" as an instance swap property, not a variant property');
    expect(changes(result, 'tag').join('\n')).not.toMatch(/Delete "icon"|Add an instance swap property "icon"/);
  });

  it('redraws a named slot drawn with another type than SLOT', () => {
    // the template reads a named slot with getSlot(), so a TEXT slot-summary renders nothing
    const lines = changes(run([set('accordion', { 'slot-summary#1:2': { type: 'TEXT' } })]), 'accordion');
    expect(lines).toContain('Redraw "slot-summary" as a slot property, not a text property');
  });

  it('redraws a showLabel standing for hideLabel as the boolean hideLabel is', () => {
    const lines = changes(run([set('input-email', { 'showLabel#1:2': { type: 'TEXT' } })]), 'input-email');
    expect(lines).toContain('Redraw "showLabel" as a boolean property, not a text property');
  });

  it('asks for the option a boolean drawn as a VARIANT lacks', () => {
    const lines = changes(run([set('switch', { checked: { type: 'VARIANT', variantOptions: ['true'] } })]), 'switch');
    expect(lines).toContain('Add the option "false" to "checked"');
  });

  it('keeps a # inside a property name, so "label#2" is not the PDS prop label', () => {
    // the REST key ends in #<node id>, except a VARIANT's
    const options = { variantOptions: ['none', 'error', 'success'] };
    const checkbox = set('checkbox', { 'label#2#1:2': { type: 'TEXT' }, 'state#old': { type: 'VARIANT', ...options } });
    const lines = changes(run([checkbox]), 'checkbox');
    expect(lines).toEqual(
      expect.arrayContaining([
        'Add a text property "label"',
        // the one variant prop Figma lacks, with its PDS options
        'Rename "state#old" to "state" if it is the same property; otherwise rename it to "figStateOld" or delete it, and add a variant property "state" with the options none, error and success',
      ])
    );
  });

  it('deletes showLabel next to a drawn hideLabel, a deprecated prop and deprecated options', () => {
    const result = run([
      set('input-email', { showLabel: { type: 'BOOLEAN' }, hideLabel: booleanVariant }),
      set('accordion', { size: { type: 'VARIANT', variantOptions: ['small', 'medium'] } }),
      set('heading', { weight: { type: 'VARIANT', variantOptions: ['normal', 'semibold', 'bold', 'regular'] } }),
    ]);
    expect(changes(result, 'input-email')).toContain('Delete "showLabel": "hideLabel" replaces it');
    expect(changes(result, 'accordion')).toContain('Delete "size": PDS deprecated it');
    expect(changes(result, 'heading')).toContain('Delete the option "regular" from "weight": PDS deprecated it');
  });

  it('reports a Figma property no PDS name stands for, with its design-only name', () => {
    expect(changes(run([set('button', { dense: booleanVariant }, '1:4')]), 'button')).toContain(
      '"dense" is not a PDS property: rename it to "figDense" if it is only for Figma, or delete it'
    );
  });

  it('deletes an option PDS does not allow, unless it is an accepted gap', () => {
    const button = set(
      'button',
      { variant: { type: 'VARIANT', variantOptions: ['primary', 'secondary', 'destructive', 'ghost'] } },
      '1:4'
    );
    expect(changes(run([button]), 'button')).toContain(
      'Delete the option "ghost" from "variant": PDS has no such value'
    );
    expect(run([button], { acceptedGaps: { 'p-button': ['variant=ghost'] } }).designLines.join('\n')).not.toContain(
      'ghost'
    );
  });

  it('asks for a missing slot once, as the PDS prop of its name', () => {
    const lines = changes(run([set('radio-group')]), 'radio-group');
    expect(lines).toContain('Add a text property "description"');
    expect(lines).not.toContain('Add a slot property "slot-description"');
  });

  it('lists an accepted gap Figma made obsolete as a cleanup', () => {
    const { acceptedGapCleanup } = run([set('button', { compact: booleanVariant })], {
      acceptedGaps: { 'p-button': ['compact'] },
    });
    expect(acceptedGapCleanup).toEqual([
      'accepted-gap: p-button "compact" is no longer a gap — remove it from figma/accepted-gaps.json',
    ]);
  });

  it('asks for a PDS component with no component set, unless it is an accepted gap', () => {
    const line = 'design: p-sheet: Add a component set "sheet"';
    expect(run([], { tags: ['p-sheet'] }).designLines).toContain(line);
    expect(run([], { tags: ['p-sheet'], acceptedGaps: { 'p-sheet': ['component-set'] } }).designLines).not.toContain(
      line
    );
  });

  it('asks for a PDS icon with no Figma icon component', () => {
    expect(run([]).designLines).toContain('design: p-icon: Add an icon component "arrow-right"');
  });

  // accordion drawn as in the library but for compact, which design renamed to compacta
  const drawn: Record<string, Definition> = {
    open: booleanVariant,
    indent: booleanVariant,
    sticky: booleanVariant,
    alignMarker: { type: 'VARIANT', variantOptions: ['end', 'start'] },
    background: { type: 'VARIANT', variantOptions: ['none', 'canvas'] },
    'slot-default#1:6': { type: 'SLOT' },
    compacta: booleanVariant,
  };
  const accordion = (definitions = drawn): Component => set('accordion', definitions, '1:5');

  it('renames back a property history says carried the PDS name Figma now lacks', () => {
    const lines = changes(
      run([accordion()], { history: { '1:5': { compacta: { kind: 'renamed', from: 'compact' } } } }),
      'accordion'
    );
    expect(lines).toContain('Rename "compacta" back to "compact"');
    expect(lines.join('\n')).not.toMatch(/Add a boolean property "compact"|figCompacta/);
  });

  it('reports a property history says never carried a PDS name, next to the add for the prop Figma lacks', () => {
    const lines = changes(run([accordion()], { history: { '1:5': { compacta: { kind: 'created' } } } }), 'accordion');
    expect(lines).toContain(
      '"compacta" is not a PDS property: rename it to "figCompacta" if it is only for Figma, or delete it'
    );
    expect(lines).toContain('Add a boolean property "compact"');
  });

  it('lists what replaced what, once, when history cannot pair the properties that moved in one step', () => {
    const moved = { appeared: ['dense', 'hide-label'], vanished: ['compact', 'hideLabel'] };
    const button = set('button', { dense: booleanVariant, 'hide-label': booleanVariant }, '1:4');
    const lines = changes(
      run([button], {
        history: { '1:4': { dense: { kind: 'ambiguous', ...moved }, 'hide-label': { kind: 'ambiguous', ...moved } } },
      }),
      'button'
    );
    expect(lines.filter((line) => line.includes('replaced'))).toEqual([
      '"dense" and "hide-label" replaced "compact" and "hideLabel": rename each back to the PDS name it stands for',
    ]);
    expect(lines.join('\n')).not.toMatch(/"compact"$|"hideLabel"$|figDense|figHideLabel/m);
  });

  it.each([
    {
      appeared: ['compacta', 'loud'],
      vanished: ['compact'],
      line: '"compacta" and "loud" replaced "compact": rename back whichever stands for "compact", and the other to its fig… name or delete it',
    },
    {
      appeared: ['compacta'],
      vanished: ['sticky', 'compact'],
      line: '"compacta" replaced "sticky" and "compact": rename it back to whichever it stands for, and add the other again',
    },
    {
      appeared: ['dense', 'loud', 'tight', 'wide'],
      vanished: ['sticky', 'compact'],
      line: '"dense", "loud", "tight" and "wide" replaced "sticky" and "compact": rename back the ones that stand for "sticky" and "compact", and the others to their fig… names or delete them',
    },
    {
      appeared: ['dense', 'loud'],
      vanished: ['open', 'indent', 'sticky', 'compact'],
      line: '"dense" and "loud" replaced "open", "indent", "sticky" and "compact": rename each back to whichever it stands for, and add the others again',
    },
  ])('says what to do with the rest when $appeared replaced $vanished', ({ appeared, vanished, line }) => {
    const definitions = Object.fromEntries([
      ...Object.entries(drawn).filter(([name]) => name !== 'compacta' && !vanished.includes(name)),
      ...appeared.map((name) => [name, booleanVariant]),
    ]);
    const moved = { kind: 'ambiguous' as const, appeared, vanished };
    const history = { '1:5': Object.fromEntries(appeared.map((name) => [name, moved])) };
    const lines = changes(run([accordion(definitions)], { history }), 'accordion');
    // the one line for the group, and none for what is left over
    const named = [...appeared, ...vanished].map((name) => `"${name}"`);
    expect(lines.filter((text) => named.some((name) => text.includes(name)))).toEqual([line]);
  });

  it("asks whether a property out of history's reach is the one PDS prop of its type Figma lacks", () => {
    const lines = changes(run([accordion()]), 'accordion');
    expect(lines).toContain(
      'Rename "compacta" to "compact" if it is the same property; otherwise rename it to "figCompacta" or delete it, and add a boolean property "compact"'
    );
    expect(lines).not.toContain('Add a boolean property "compact"');
    // two boolean props missing: nothing to suggest
    const withoutSticky = Object.fromEntries(Object.entries(drawn).filter(([name]) => name !== 'sticky'));
    expect(changes(run([accordion(withoutSticky)]), 'accordion')).toContain(
      '"compacta" is not a PDS property: rename it to "figCompacta" if it is only for Figma, or delete it'
    );
  });

  it("gives history its PDS name before asking about a property out of history's reach", () => {
    // dense, out of reach, is listed before compacta, which history says was compact
    const definitions = { 'dense#1:7': { type: 'BOOLEAN' }, ...drawn };
    const lines = changes(
      run([accordion(definitions)], { history: { '1:5': { compacta: { kind: 'renamed', from: 'compact' } } } }),
      'accordion'
    );
    expect(lines).toEqual(
      expect.arrayContaining([
        'Rename "compacta" back to "compact"',
        '"dense" is not a PDS property: rename it to "figDense" if it is only for Figma, or delete it',
      ])
    );
    expect(lines.join('\n')).not.toContain('Rename "dense" to "compact"');
  });

  it("asks nothing when two properties out of history's reach could be the one PDS prop of their type", () => {
    const dense = { 'dense#1:7': { type: 'BOOLEAN' } };
    for (const definitions of [
      { ...drawn, ...dense },
      { ...dense, ...drawn },
    ])
      expect(changes(run([accordion(definitions)]), 'accordion')).toEqual(
        expect.arrayContaining([
          '"compacta" is not a PDS property: rename it to "figCompacta" if it is only for Figma, or delete it',
          '"dense" is not a PDS property: rename it to "figDense" if it is only for Figma, or delete it',
          'Add a boolean property "compact"',
        ])
      );
  });

  it('hands the sets with a property no rule places to history, with the names it could have carried', () => {
    const component = accordion();
    const { unresolved } = run([component]);
    expect(unresolved).toEqual([
      {
        id: '1:5',
        definitions: component.componentPropertyDefinitions,
        unknown: ['compacta'],
        candidates: expect.arrayContaining(['compact', 'slot-summary']),
      },
    ]);
    // an option Figma lacks is no name a property could have carried
    expect(unresolved[0].candidates.some((name) => name.includes('='))).toBe(false);
    expect(
      run([component], { history: { '1:5': { compacta: { kind: 'renamed', from: 'compact' } } } }).unresolved
    ).toEqual([]);
  });
});
