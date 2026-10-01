import { relative } from 'node:path';
import type { ComponentMeta, PropMeta } from '@porsche-design-system/component-meta';
import type { TagName } from '@porsche-design-system/shared';
import { camelCase, kebabCase, pascalCase } from 'change-case';
import { baselineCleanupLine, change, changeLine, libraryChangeLine } from './messages';
import { type Component, type Definition, definitions, type Snapshot } from './snapshot';

// Renders every generated file from one pull and the baseline, and reports where Figma differs from code.
// Rationale: docs/runbooks/figma-code-connect.md.

type Label = {
  suffix: string;
  label: string;
  tagName: (tag: string) => string;
  attr: (name: string, value: string | true) => string;
  /** A number or boolean attribute in the label's expression syntax: `activePage={…}`, `[dismissButton]="false"`. */
  expr: (name: string, value: string) => string;
  imports: (tag: string, docs: string) => string[];
  /** A comment between children, naming the slot a child belongs to. */
  comment: (text: string) => string;
};

const quoted = (value: string): string => `"${value}"`;
/** One config per Dev Mode label. `imports` reaches agents via `get_design_context`, so the docs URL rides there. */
export const labels: Label[] = [
  {
    suffix: '',
    label: 'Web Components',
    tagName: (t) => t,
    attr: (n, v) => `${kebabCase(n)}=${quoted(v === true ? 'true' : v)}`,
    expr: (n, v) => `${kebabCase(n)}=${quoted(v)}`,
    imports: (_, docs) => [`<!-- Docs: ${docs} -->`],
    comment: (text) => `<!-- ${text} -->`,
  },
  {
    suffix: '.react',
    label: 'React',
    tagName: (t) => pascalCase(t),
    attr: (n, v) => (v === true ? `${camelCase(n)}={true}` : `${camelCase(n)}=${quoted(v)}`),
    expr: (n, v) => `${camelCase(n)}={${v}}`,
    imports: (t, docs) => [
      `// Docs: ${docs}`,
      `import { ${pascalCase(t)} } from '@porsche-design-system/components-react';`,
    ],
    comment: (text) => `{/* ${text} */}`,
  },
  {
    suffix: '.angular',
    label: 'Angular',
    tagName: (t) => t,
    attr: (n, v) => `[${camelCase(n)}]=${quoted(v === true ? 'true' : `'${v}'`)}`,
    expr: (n, v) => `[${camelCase(n)}]=${quoted(v)}`,
    imports: (_, docs) => [
      `// Docs: ${docs}`,
      `import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';`,
    ],
    comment: (text) => `<!-- ${text} -->`,
  },
  {
    suffix: '.vue',
    label: 'Vue',
    tagName: (t) => pascalCase(t),
    attr: (n, v) => `:${camelCase(n)}=${quoted(v === true ? 'true' : `'${v}'`)}`,
    expr: (n, v) => `:${camelCase(n)}=${quoted(v)}`,
    imports: (t, docs) => [
      `// Docs: ${docs}`,
      `import { ${pascalCase(t)} } from '@porsche-design-system/components-vue';`,
    ],
    comment: (text) => `<!-- ${text} -->`,
  },
];

export const baselinePath = 'figma/coverage-baseline.json';

export type Dependencies = {
  /** `undefined` for a tag PDS does not have */
  getComponentMeta: (tag: TagName) => ComponentMeta | undefined;
  /** the PDS tags expected to have a Figma component set */
  tags: readonly string[];
  /** where `templates/<name>/` and `icons/` go, relative to the package root: `generated` */
  outputRoot: string;
  /** the library URL (figma/library.ts) the `// url=` lines and the icon manifest point at */
  fileUrl: string;
};

export type Generated = {
  /** every generated file, keyed by path relative to the package root */
  files: Record<string, string>;
  /** repository mistakes: two properties feeding one template variable */
  errors: string[];
  /** changes only design can make in Figma, as design lines (figma/messages.ts); never a failure */
  designLines: string[];
  /** component sets without a PDS component, `name (id)` */
  skipped: string[];
  componentCount: number;
  /** baseline entries that are no longer gaps, for a developer to remove */
  baselineCleanup: string[];
};

// --- Rules: what a template reads, from component-meta alone, and where the Figma component differs ---

/** `slot-default` for the default slot, `slot-<name>` otherwise. */
const figmaSlotName = (slot: string): string => (slot === '' ? 'slot-default' : `slot-${slot}`);
/** The PDS slot of a `slot-*` property; `''` is the default slot. */
const pdsSlotName = (figma: string): string => figma.replace(/^slot-/, '').replace(/^default$/, '');
/** Figma draws `hideLabel` as `showLabel`. */
const showLabelStandsForHideLabel = (
  defs: Record<string, Definition>,
  props: NonNullable<ComponentMeta['propsMeta']>
): boolean => !!defs.showLabel && !defs.hideLabel && !!props.hideLabel;

/** How a template reads one PDS prop or slot when the snippet renders (figma/helpers/read.ts). */
type PropertyMapping =
  | { kind: 'enum'; prop: string; values: string[] } // a VARIANT option PDS allows → variant="primary"
  | { kind: 'boolean'; prop: string; defaultOn: boolean } // BOOLEAN or false/true VARIANT → disabled; hideLabel also as showLabel, inverted
  | { kind: 'string'; prop: string } // TEXT → label="Some label"
  | { kind: 'number'; prop: string } // TEXT → activePage={…}, only when the text is a number
  | { kind: 'icon'; prop: string } // INSTANCE_SWAP → icon="arrow-right", behind its fig<Prop> gate
  | { kind: 'slot'; figma: string }; // SLOT (or TEXT for the default slot) → the children of the PDS slot

/** A Figma property no rule places: unknown name, deprecated, a type not read, or options PDS lacks or deprecates. */
type Unplaceable =
  | { figma: string; type: string; kind: 'noProp' | 'slotMissing' | 'deprecated' | 'wrongType' }
  | { figma: string; type: string; kind: 'unknownOptions' | 'deprecatedOptions'; values: string[] };

type Coverage = {
  /** Figma properties no rule places */
  unplaceable: Unplaceable[];
  /** the Figma property a PDS prop or slot lacks, or `prop=value` for an allowed value */
  gaps: string[];
};

// Form props have nothing to draw: optional in Figma, no gap when absent.
const formProps = ['form', 'name', 'value'];

const isBooleanVariant = (d: Definition): boolean =>
  d.type === 'VARIANT' && (d.variantOptions ?? []).every((o) => o === 'true' || o === 'false');

/** A value list naming types (`string | number`, `array(AllowedTypes.string)`) is free text, not options. */
const isFreeText = (values: unknown[]): boolean =>
  values.some((value) => value === 'string' || /^array\(/.test(String(value)));
/** The values PDS allows, without empty and deprecated ones. */
const allowedOf = (prop: Pick<PropMeta, 'allowedValues' | 'deprecatedValues'>): string[] =>
  (prop.allowedValues as unknown[])
    .filter((value) => value != null && value !== '' && !prop.deprecatedValues?.includes(value as string))
    .map(String);
/** An icon prop allows every PDS icon name; `state` (`none`, `error`, `success`) shares some names and is none. */
const isIconProp = (values: readonly string[], iconNames: readonly string[]): boolean =>
  iconNames.length > 0 && iconNames.every((name) => values.includes(name));

/** How the template reads a PDS prop; `undefined` for one no attribute carries (an `intl` object). */
const mappingOf = (prop: string, p: PropMeta, iconNames: readonly string[]): PropertyMapping | undefined => {
  if (p.type === 'boolean') return { kind: 'boolean', prop, defaultOn: p.defaultValue === true };
  if (p.allowedValues === 'number') return { kind: 'number', prop };
  if (Array.isArray(p.allowedValues) && !isFreeText(p.allowedValues)) {
    const values = allowedOf(p);
    return isIconProp(values, iconNames) ? { kind: 'icon', prop } : { kind: 'enum', prop, values };
  }
  if (/string|number|Tag$/.test(p.type)) return { kind: 'string', prop };
  return undefined;
};

/**
 * What a template reads, from component-meta alone: every prop but `isAria`, every slot, none deprecated.
 * `slot-default` in any case: default content renders whether or not component-meta lists a default slot.
 */
const templateMappings = (
  meta: Pick<ComponentMeta, 'propsMeta' | 'slotsMeta'>,
  iconNames: readonly string[]
): PropertyMapping[] => {
  const mappings: PropertyMapping[] = [];
  for (const [prop, p] of Object.entries(meta.propsMeta ?? {})) {
    if (p.isAria || p.isDeprecated) continue;
    const mapping = mappingOf(prop, p, iconNames);
    if (mapping) mappings.push(mapping);
  }
  const slots = Object.entries(meta.slotsMeta ?? {})
    .filter(([, s]) => !s.isDeprecated)
    .map(([slot]) => figmaSlotName(slot));
  for (const figma of new Set([...slots, 'slot-default'])) mappings.push({ kind: 'slot', figma });
  return mappings;
};

/** Whether the template's read of a mapping renders a Figma property of this type. */
const renders = (mapping: PropertyMapping | undefined, p: PropMeta, d: Definition): boolean => {
  switch (mapping?.kind) {
    case 'boolean':
      return d.type === 'BOOLEAN' || isBooleanVariant(d);
    case 'icon':
      return d.type === 'INSTANCE_SWAP';
    case 'number':
    case 'string':
      return d.type === 'TEXT';
    case 'enum':
      return d.type === 'VARIANT' || (d.type === 'TEXT' && /string|number|Tag$/.test(p.type));
    default:
      return false;
  }
};

/** Where Figma differs from component-meta: each PDS prop or slot it lacks, and each property not rendered. */
const coverage = (
  component: Component,
  meta: Pick<ComponentMeta, 'propsMeta' | 'slotsMeta'>,
  iconNames: readonly string[]
): Coverage => {
  const defs = definitions(component);
  const props = meta.propsMeta ?? {};
  const consumed = new Set<string>();
  const out: Coverage = { unplaceable: [], gaps: [] };
  const fail = (unplaceable: Unplaceable): void => {
    consumed.add(unplaceable.figma);
    out.unplaceable.push(unplaceable);
  };

  for (const [prop, p] of Object.entries(props)) {
    if (p.isAria) continue;
    const figma = prop === 'hideLabel' && showLabelStandsForHideLabel(defs, props) ? 'showLabel' : prop;
    const d = defs[figma];
    // a deprecated prop is never a gap; if Figma still has it, design removes it
    if (p.isDeprecated) {
      if (d) fail({ figma, type: d.type, kind: 'deprecated' });
      continue;
    }
    if (!d) {
      if (!formProps.includes(prop)) out.gaps.push(prop);
      continue;
    }
    const mapping = mappingOf(prop, p, iconNames);
    if (!renders(mapping, p, d)) {
      fail({ figma, type: d.type, kind: 'wrongType' });
      continue;
    }
    consumed.add(figma);
    // a boolean VARIANT needs both options, or design cannot set one of the two states
    if (mapping?.kind === 'boolean' && d.type === 'VARIANT')
      for (const value of ['false', 'true'])
        if (!(d.variantOptions ?? []).includes(value)) out.gaps.push(`${figma}=${value}`);
    if (mapping?.kind !== 'enum' || d.type !== 'VARIANT') continue;
    // each allowed value needs a variant option of the same name, compared as strings
    for (const value of p.allowedValues as unknown[]) {
      if (p.deprecatedValues?.includes(value as string)) continue;
      if (!(d.variantOptions ?? []).includes(String(value))) out.gaps.push(`${prop}=${value}`);
    }
    // an option PDS does not allow or deprecates renders no attribute and is reported
    const allowed = (p.allowedValues as unknown[]).map(String);
    const deprecatedValues = ((p.deprecatedValues ?? []) as unknown[]).map(String);
    const options = d.variantOptions ?? [];
    const unknown = options.filter((o) => !allowed.includes(o));
    const deprecated = options.filter((o) => allowed.includes(o) && deprecatedValues.includes(o));
    if (unknown.length) out.unplaceable.push({ figma, type: d.type, kind: 'unknownOptions', values: unknown });
    if (deprecated.length) out.unplaceable.push({ figma, type: d.type, kind: 'deprecatedOptions', values: deprecated });
  }

  for (const [slot, s] of Object.entries(meta.slotsMeta ?? {})) {
    if (s.isDeprecated) continue;
    const figma = figmaSlotName(slot);
    if (defs[figma]) {
      // a named slot renders only as a SLOT, read with getSlot(); the default slot also as TEXT
      if (slot === '' || defs[figma].type === 'SLOT') consumed.add(figma);
      else fail({ figma, type: defs[figma].type, kind: 'wrongType' });
      continue;
    }
    // a Figma property with the slot's name covers the slot (most text slots are TEXT properties)
    if (slot !== '' && defs[slot]) continue;
    out.gaps.push(figma);
  }

  for (const [figma, d] of Object.entries(defs)) {
    if (consumed.has(figma)) continue;
    if (/^fig/.test(figma)) continue;
    // default content always renders, also when component-meta lists no default slot
    if (figma === 'slot-default') continue;
    if (/^slot-/.test(figma)) {
      fail({ figma, type: d.type, kind: 'slotMissing' });
      continue;
    }
    fail({ figma, type: d.type, kind: 'noProp' });
  }
  return out;
};

// --- Coverage: gaps per component, what design must add, and the baseline ---

/** Baseline entry for a PDS component with no Figma component set (drawn inside a parent set, or not drawable). */
const componentSetGap = 'component-set';

/** PDS tags with no Figma component set; deprecated tags do not count. */
const missingComponentSets = (
  tags: readonly string[],
  present: ReadonlySet<string>,
  isDeprecated: (tag: string) => boolean
): string[] => tags.filter((tag) => !present.has(tag) && !isDeprecated(tag));

type ExpectedProperty = { type: 'BOOLEAN' | 'TEXT' | 'VARIANT' | 'INSTANCE_SWAP'; options?: string[] };

/** The Figma property design must add for a PDS prop: what `mappingOf` reads it as. */
const expectedProperty = (
  prop: Pick<PropMeta, 'allowedValues' | 'deprecatedValues'>,
  iconNames: readonly string[]
): ExpectedProperty => {
  if (prop.allowedValues === 'boolean') return { type: 'BOOLEAN' };
  if (!Array.isArray(prop.allowedValues)) return { type: 'TEXT' };
  if (isFreeText(prop.allowedValues)) return { type: 'TEXT' };
  const options = allowedOf(prop);
  if (isIconProp(options, iconNames)) return { type: 'INSTANCE_SWAP' };
  return { type: 'VARIANT', options };
};

/** `fresh`: gaps the baseline does not list. `accepted`: entries still gaps, so the baseline only shrinks. */
const applyBaseline = (gaps: string[], accepted: string[]): { fresh: string[]; accepted: string[] } => ({
  fresh: gaps.filter((gap) => !accepted.includes(gap)),
  accepted: accepted.filter((gap) => gaps.includes(gap)),
});

/** The changes that make the Figma component match PDS: renames, deletes, adds. `gaps` are the fresh gaps. */
const changesOf = (
  meta: Pick<ComponentMeta, 'propsMeta' | 'slotsMeta'>,
  defs: Record<string, Definition>,
  unplaceable: Unplaceable[],
  gaps: string[],
  iconNames: readonly string[]
): string[] => {
  const props = meta.propsMeta ?? {};
  const slots = meta.slotsMeta ?? {};
  const open = new Set(gaps);
  const renames: string[] = [];
  const deletes: string[] = [];
  const adds: string[] = [];
  // the names renames give to Figma properties
  const claimed = new Set<string>();
  const rename = (from: string, to: string): void => {
    open.delete(to);
    claimed.add(to);
    renames.push(change.rename(from, to));
  };
  const add = (name: string): void => {
    const expected = expectedProperty(props[name] ?? {}, iconNames);
    adds.push(change.addProperty(expected.type, name, expected.options));
  };
  // a missing slot that shares its name with a missing PDS prop is asked for once, as the prop
  const askedAsProp = (gap: string): boolean => gap.startsWith('slot-') && open.has(gap.slice('slot-'.length));

  const rest: Unplaceable[] = [];
  for (const u of unplaceable) {
    const prefix = u.kind === 'noProp' && u.type === 'TEXT' ? u.figma.match(/^(.+)Value$/)?.[1] : undefined;
    if (u.kind === 'noProp' && u.figma in slots) rename(u.figma, `slot-${u.figma}`);
    else if (prefix && props[prefix]) rename(u.figma, prefix);
    else if (prefix && props.value) rename(u.figma, 'value');
    else rest.push(u);
  }
  const looseSlots = rest.filter((u) => u.kind === 'noProp' && u.type === 'SLOT');
  const missingSlots = [...open].filter((gap) => gap.startsWith('slot-') && !askedAsProp(gap));
  if (looseSlots.length === 1 && missingSlots.length === 1) {
    rename(looseSlots[0].figma, missingSlots[0]);
    rest.splice(rest.indexOf(looseSlots[0]), 1);
  }

  for (const u of rest) {
    if (u.kind === 'unknownOptions' || u.kind === 'deprecatedOptions') {
      const missing = [...open].filter((gap) => gap.startsWith(`${u.figma}=`));
      if (u.kind === 'unknownOptions' && u.values.length === 1 && missing.length === 1) {
        open.delete(missing[0]);
        renames.push(change.renameOption(u.figma, u.values[0], missing[0].slice(u.figma.length + 1)));
      } else deletes.push(...u.values.map((value) => change.deleteOption(u.figma, value)));
    } else if (u.kind === 'deprecated') deletes.push(change.delete(u.figma));
    else if (u.kind === 'wrongType' && !claimed.has(u.figma)) {
      // drawn again with the type the template reads
      deletes.push(change.delete(u.figma));
      if (u.figma.startsWith('slot-')) adds.push(change.addProperty('SLOT', u.figma));
      else add(u.figma);
    } else if (u.figma === 'showLabel' && defs.hideLabel && props.hideLabel) deletes.push(change.delete(u.figma));
    // design-only: no PDS name stands for it, or a rename takes its name
    else renames.push(change.rename(u.figma, `fig${pascalCase(u.figma)}`));
  }

  for (const gap of open) {
    const [property, value] = gap.split('=');
    if (value !== undefined) adds.push(change.addOption(property, value));
    else if (gap.startsWith('slot-')) {
      if (!askedAsProp(gap)) adds.push(change.addProperty('SLOT', gap));
    } else add(gap);
  }
  return [...renames, ...deletes, ...adds];
};

// --- Render ---

// The templates are outside tsconfig.json, so each carries its own types for `import figma from 'figma'`.
const typesReference = '/// <reference types="@figma/code-connect/figma-types-no-require" />';
/** A string literal as biome writes it. */
const literal = (text: string): string => (text.includes("'") ? JSON.stringify(text) : `'${text}'`);
/** A record's `imports` entry as biome writes it: one line when it fits biome's line width. */
const importsEntry = (label: Label, tag: TagName, docs: string): string[] => {
  const imports = label.imports(tag, docs).map(literal);
  const line = `  imports: [${imports.join(', ')}],`;
  return line.length <= 120 ? [line] : ['  imports: [', ...imports.map((i) => `    ${i},`), '  ],'];
};

/** The code that reads one PDS prop, and its attribute; `swapDefault` names the icon an icon swap starts with. */
const fragment = (
  mapping: Exclude<PropertyMapping, { kind: 'slot' }>,
  variable: string,
  label: Label,
  swapDefault: string | undefined
): { read: string; attr: string } => {
  const value = `\${${variable}}`;
  const ifSet = (attr: string): string => `\${${variable} ? \` ${attr}\` : ''}`;
  switch (mapping.kind) {
    case 'boolean':
      // written only away from its PDS default: a prop on by default (`dismissButton`) only when Figma turns it off
      if (mapping.defaultOn)
        return {
          read: `const ${variable} = !read.off('${mapping.prop}');`,
          attr: `\${${variable} ? '' : ' ${label.expr(mapping.prop, 'false')}'}`,
        };
      return {
        read: `const ${variable} = ${mapping.prop === 'hideLabel' ? 'read.hideLabel()' : `read.flag('${mapping.prop}')`};`,
        attr: `\${${variable} ? ' ${label.attr(mapping.prop, true)}' : ''}`,
      };
    case 'enum':
      return {
        read: `const ${variable} = read.oneOf('${mapping.prop}', [${mapping.values.map(literal).join(', ')}]);`,
        attr: ifSet(label.attr(mapping.prop, value)),
      };
    case 'string':
      return {
        read: `const ${variable} = read.text('${mapping.prop}');`,
        attr: ifSet(label.attr(mapping.prop, value)),
      };
    case 'number':
      return {
        read: `const ${variable} = read.number('${mapping.prop}');`,
        attr: ifSet(label.expr(mapping.prop, value)),
      };
    case 'icon': {
      const gate = `fig${pascalCase(mapping.prop)}`;
      const fallback = swapDefault ? literal(swapDefault) : 'undefined';
      return {
        read: `const ${variable} = read.has('${mapping.prop}') && (!read.has('${gate}') || read.flag('${gate}')) ? iconOf(instance.getInstanceSwap('${mapping.prop}'), ${fallback}) : undefined;`,
        attr: ifSet(label.attr(mapping.prop, value)),
      };
    }
  }
};

/**
 * A slot's content through figma/helpers/slotted.ts: a slot interpolated directly renders a React `<SlotDefault />`.
 * The default slot falls back to text, because most simple components draw it as a TEXT property.
 */
const slotContent = (figma: string, label: Label): string => {
  const slot = pdsSlotName(figma);
  return slot === ''
    ? `\${read.isSlot('${figma}') ? slotted(instance.getSlot('${figma}'), '${figma}') : (read.text('${figma}') ?? '')}`
    : `\${read.has('${figma}') ? slotted(instance.getSlot('${figma}'), '${figma}', '${label.comment(`slot="${slot}"`)}') : ''}`;
};

/** What every render of one pull shares. */
type Context = {
  icons: Snapshot['icons'];
  nodeUrl: (id: string) => string;
  docsApiUrl: (tag: TagName) => string;
  errors: string[];
};

const render = (
  component: Component,
  tag: TagName,
  mappings: PropertyMapping[],
  label: Label,
  helpers: string,
  context: Context
): string => {
  const source = context.docsApiUrl(tag);
  const defs = definitions(component);
  // variables are named after the PDS prop or slot they read
  const variables = mappings.map((m) => [m, camelCase(m.kind === 'slot' ? m.figma : m.prop)] as const);
  const names = variables.map(([, v]) => v);
  for (const name of new Set(names.filter((n, i) => names.indexOf(n) !== i)))
    context.errors.push(
      `${tag}: two properties map to the same variable "${name}" — rename one of the PDS props or slots behind it`
    );
  const fragments = variables.flatMap(([m, v]) => {
    if (m.kind === 'slot') return [];
    const swap = defs[m.prop];
    const swapDefault = swap?.type === 'INSTANCE_SWAP' ? context.icons[String(swap.defaultValue)] : undefined;
    return [fragment(m, v, label, swapDefault)];
  });
  const attributes = fragments.map((f) => f.attr).join('');
  // named slots first, default content last
  const children = mappings
    .flatMap((m) => (m.kind === 'slot' ? [m.figma] : []))
    .sort((a, b) => Number(pdsSlotName(a) === '') - Number(pdsSlotName(b) === ''))
    .map((figma) => slotContent(figma, label))
    .join('');
  const tagName = label.tagName(tag);
  return [
    typesReference,
    `// url=${context.nodeUrl(component.id)}`,
    `// source=${source}`,
    `// component=${tagName}`,
    `// Auto generated - do not edit by hand.`,
    `import figma from 'figma';`,
    // the CLI bundles relative imports into the record at publish time
    ...(mappings.some((m) => m.kind === 'icon') ? [`import { iconOf } from '${helpers}/iconOf';`] : []),
    `import { read } from '${helpers}/read';`,
    `import { slotted } from '${helpers}/slotted';`,
    '',
    `const instance = figma.selectedInstance;`,
    '',
    ...(fragments.length ? [...fragments.map((f) => f.read), ''] : []),
    'export default {',
    `  example: figma.code\`<${tagName}${attributes}>${children}</${tagName}>\`,`,
    ...importsEntry(label, tag, source),
    `  id: '${tag}',`,
    '  metadata: { nestable: true },',
    '};',
    '',
  ].join('\n');
};

/** One manifest entry per PDS icon name; the published component comes first in the pull and wins. */
const iconEntries = (context: Context) => {
  const seen = new Set<string>();
  const source = context.docsApiUrl('p-icon');
  return Object.entries(context.icons)
    .filter(([, name]) => !seen.has(name) && seen.add(name))
    .sort(([, a], [, b]) => a.localeCompare(b))
    .map(([id, name]) => ({
      url: context.nodeUrl(id),
      component: `p-icon (${name})`,
      source,
      name,
      id: `p-icon-${name}`,
    }));
};

// A batch template per label makes a record per icon; parent templates read the swapped icon's name from it.
const iconBatch = (
  label: Label,
  components: ReturnType<typeof iconEntries>,
  context: Context,
  folder: string
): Record<string, string> => {
  const base = `p-icon${label.suffix}.figma.batch`;
  const tag = label.tagName('p-icon');
  const template = [
    typesReference,
    '// Auto generated - do not edit by hand.',
    `// One record per icon, listed in ${base}.json; a parent template reads the swapped icon as`,
    "// instance.getInstanceSwap('icon').executeTemplate().metadata.props.name",
    "import figma from 'figma';",
    '',
    'export default {',
    // biome-ignore lint/suspicious/noTemplateCurlyInString: the placeholder is the generated template's, read by Figma
    `  example: figma.code\`<${tag} ${label.attr('name', '${figma.batch.name}')}></${tag}>\`,`,
    ...importsEntry(label, 'p-icon', context.docsApiUrl('p-icon')),
    '  id: figma.batch.id,',
    '  metadata: { nestable: true, props: { name: figma.batch.name } },',
    '};',
    '',
  ].join('\n');
  const manifest = { templateFile: `./${base}.ts`, components };
  return {
    [`${folder}/${base}.ts`]: template,
    [`${folder}/${base}.json`]: `${JSON.stringify(manifest, null, 2)}\n`,
  };
};

/** The baseline as biome writes it, since it is committed: sorted, a list on one line when it fits. */
const baselineJson = (accepted: Record<string, string[]>): string => {
  const tags = Object.keys(accepted).sort();
  const entries = tags.map((tag, i) => {
    const names = [...accepted[tag]].sort().map((name) => JSON.stringify(name));
    const comma = i < tags.length - 1 ? ',' : '';
    const line = `  ${JSON.stringify(tag)}: [${names.join(', ')}]${comma}`;
    if (line.length <= 120) return line;
    const items = names.map((name, j) => `    ${name}${j < names.length - 1 ? ',' : ''}`);
    return [`  ${JSON.stringify(tag)}: [`, ...items, `  ]${comma}`].join('\n');
  });
  return entries.length ? `{\n${entries.join('\n')}\n}\n` : '{}\n';
};

/** Renders one pull with one baseline into every generated file. Pure: same inputs, same files. */
export const generate = (
  snapshot: Snapshot,
  baseline: Record<string, string[]>,
  dependencies: Dependencies
): Generated => {
  const publishFileUrl = dependencies.fileUrl.replace(/[?#].*$/, '').replace(/\/$/, '');
  // `source` is the component's origin in Dev Mode: the docs API page, child components on their root parent's page
  const docsApiUrl = (tag: TagName): string => {
    let root = tag;
    for (
      let parent = dependencies.getComponentMeta(root)?.requiredParent;
      parent;
      parent = dependencies.getComponentMeta(root)?.requiredParent
    ) {
      root = Array.isArray(parent) ? parent[0] : parent;
    }
    return `https://designsystem.porsche.com/v4/components/${root.replace(/^p-/, '')}/api`;
  };
  const context: Context = {
    icons: snapshot.icons,
    nodeUrl: (id) => `${publishFileUrl}?node-id=${id.replace(':', '-')}`,
    docsApiUrl,
    errors: [],
  };
  const files: Generated['files'] = {};
  const designLines: string[] = [];
  const skipped: string[] = [];
  let componentCount = 0;

  const icons = iconEntries(context);
  const iconNames = new Set(icons.map((icon) => icon.name));
  for (const label of labels) {
    Object.assign(files, iconBatch(label, icons, context, `${dependencies.outputRoot}/icons`));
  }

  const accepted: Record<string, string[]> = {};
  // every PDS icon name needs a Figma icon component, unless the baseline accepts `name=<icon>`
  const nameMeta = dependencies.getComponentMeta('p-icon')?.propsMeta?.name;
  const codeIcons = Array.isArray(nameMeta?.allowedValues) ? nameMeta.allowedValues.map(String) : [];
  const iconCoverage = applyBaseline(
    codeIcons.filter((name) => !iconNames.has(name)).map((name) => `name=${name}`),
    baseline['p-icon'] ?? []
  );
  if (iconCoverage.accepted.length) accepted['p-icon'] = iconCoverage.accepted;
  designLines.push(
    ...iconCoverage.fresh.map((gap) => libraryChangeLine('p-icon', change.addIcon(gap.replace(/^name=/, ''))))
  );

  const withSet = new Set<string>();
  for (const component of snapshot.components) {
    const name = component.name.replace(/^fig-/, '').toLowerCase();
    const tag = `p-${name}` as TagName;
    const meta = dependencies.getComponentMeta(tag);
    if (!meta) {
      skipped.push(`${component.name} (${component.id})`);
      continue;
    }
    withSet.add(tag);
    const { unplaceable, gaps } = coverage(component, meta, codeIcons);
    const entries = baseline[tag] ?? [];
    const gapCoverage = applyBaseline(gaps, entries);
    // a Figma option PDS does not allow is accepted by a `prop=value` entry too; it renders no attribute either way
    const extras: string[] = [];
    const open = unplaceable.flatMap((u) => {
      if (u.kind !== 'unknownOptions') return [u];
      const values = u.values.filter((value) => {
        const entry = `${u.figma}=${value}`;
        if (!entries.includes(entry)) return true;
        extras.push(entry);
        return false;
      });
      return values.length ? [{ ...u, values }] : [];
    });
    designLines.push(
      ...changesOf(meta, definitions(component), open, gapCoverage.fresh, codeIcons).map((text) =>
        changeLine(component.name, component.id, tag, text)
      )
    );
    if (gapCoverage.accepted.length || extras.length) accepted[tag] = [...gapCoverage.accepted, ...extras];
    componentCount++;
    const folder = `${dependencies.outputRoot}/templates/${name}`;
    const mappings = templateMappings(meta, codeIcons);
    for (const label of labels) {
      files[`${folder}/${name}${label.suffix}.figma.ts`] = render(
        component,
        tag,
        mappings,
        label,
        relative(folder, 'figma/helpers'),
        context
      );
    }
  }

  // a PDS component with no Figma component set is a design line unless the baseline accepts `component-set`
  const isDeprecated = (t: string): boolean => !!dependencies.getComponentMeta(t as TagName)?.isDeprecated;
  for (const tag of missingComponentSets(dependencies.tags, withSet, isDeprecated)) {
    if ((baseline[tag] ?? []).includes(componentSetGap)) accepted[tag] = [...(accepted[tag] ?? []), componentSetGap];
    else designLines.push(libraryChangeLine(tag, change.addComponentSet(tag.replace(/^p-/, ''))));
  }

  files[baselinePath] = baselineJson(accepted);
  // an entry design made obsolete is a cleanup for a developer, never a failure
  const baselineCleanup = Object.keys(baseline)
    .sort()
    .flatMap((tag) =>
      [...baseline[tag]]
        .sort()
        .filter((entry) => !(accepted[tag] ?? []).includes(entry))
        .map((entry) => baselineCleanupLine(tag, entry))
    );
  return { files, errors: context.errors, designLines, skipped, componentCount, baselineCleanup };
};
