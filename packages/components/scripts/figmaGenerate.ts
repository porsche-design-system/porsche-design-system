import { existsSync, mkdirSync, readdirSync, readFileSync, rmdirSync, unlinkSync, writeFileSync } from 'node:fs';
import { dirname, relative } from 'node:path';
import { type ComponentMeta, getComponentMeta } from '@porsche-design-system/component-meta';
import { INTERNAL_TAG_NAMES, TAG_NAMES, type TagName } from '@porsche-design-system/shared';
import { camelCase, kebabCase, pascalCase } from 'change-case';
import { sync as globbySync } from 'fast-glob';
import { applyBaseline, componentSetGap, expectedProperty, missingComponentSets } from '../figma/coverage';
import { derive } from '../figma/derive';
import { exceptions, type PropertyMapping } from '../figma/exceptions';
import { componentGapLine, coverageGapLine, printed, unplaceableLine } from '../figma/messages';
import { pdsSlotName } from '../figma/naming';
import { type Component, type Definition, definitions, readSnapshot } from '../figma/snapshot';

// Generates the Code Connect templates (one per label) into src/components/<component>/figma/ for every component set in
// figma/components.json that has a PDS component, and deletes the templates of a component set that left the snapshot.
// Mappings are derived by rule in figma/derive.ts, which walks component-meta and looks each prop and slot up in the
// snapshot; figma/exceptions.ts holds only the exceptions. `--check` fails instead of writing when a generated file
// differs from the one on disk or a generated file has no component set any more. The output is written in the shape
// `biome format` produces, so `npm run format` never touches a generated file.
type Label = {
  suffix: string;
  label: string;
  tagName: (tag: string) => string;
  attr: (name: string, value: string | true) => string;
  /** An attribute whose value is a number, in the label's expression syntax: `activePage={2}`, `[activePage]="2"`. */
  expr: (name: string, value: string) => string;
  imports: (tag: string, docs: string) => string[];
  /** A comment inside the element's children, in the label's syntax; used to name the slot a child belongs to. */
  comment: (text: string) => string;
};

const quoted = (value: string): string => `"${value}"`;
// `imports` is the only part of a record besides the snippet that `get_design_context` hands to an agent, so the docs
// API URL rides along as a comment in each label's syntax.
const labels: Label[] = [
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

const snapshot = readSnapshot();
const check = process.argv.includes('--check');
// Problems only design can fix (a Figma property the rules cannot place, a PDS prop, slot or allowed value the library
// lacks) are printed as design lines (figma/messages.ts) and never fail: the Figma Code Connect workflow reads them from
// the log, publish leaves each record to Figma's own validation, and a pull request never waits for Figma.
const baselinePath = 'figma/coverage-baseline.json';
const baseline: Record<string, string[]> = JSON.parse(readFileSync(baselinePath, 'utf8'));
// Where the records go. Defaults to the library the snapshot was pulled from. FIGMA_PUBLISH_FILE_URL points the `// url=`
// lines and the icon manifest at another key with the same node ids, e.g. a branch of the library used for testing
// (a branch shares node ids; its records are reachable by the MCP server but not by Dev Mode, see the runbook).
const publishFileUrl: string = (process.env.FIGMA_PUBLISH_FILE_URL ?? snapshot.fileUrl)
  .replace(/[?#].*$/, '')
  .replace(/\/$/, '');
const nodeUrl = (id: string): string => `${publishFileUrl}?node-id=${id.replace(':', '-')}`;
const errors: string[] = [];
const designErrors: string[] = [];
const skipped: string[] = [];
const emitted = new Set<string>();
let written = 0;
let deleted = 0;

/** Exceptions are the only hand-written entries, so only they can name a prop or value component-meta rejects. */
const validateException = (tag: TagName, meta: ComponentMeta, mapping: PropertyMapping): void => {
  if (mapping.kind === 'text' || mapping.kind === 'slot') return;
  const prop = meta.propsMeta?.[mapping.prop];
  if (!prop) {
    errors.push(`${tag} has no prop "${mapping.prop}" (Figma "${mapping.figma}")`);
    return;
  }
  if (mapping.kind === 'enum' && Array.isArray(prop.allowedValues)) {
    for (const value of Object.values(mapping.values)) {
      if (!(prop.allowedValues as string[]).includes(value))
        errors.push(`${tag} ${mapping.prop}="${value}" is not an allowed value`);
    }
  }
};

const key = (name: string): string => (/^[A-Za-z_$][\w$]*$/.test(name) ? name : `'${name}'`);
const booleanReader = (figma: string, d: Definition): string =>
  d.type === 'BOOLEAN'
    ? `instance.getBoolean('${figma}')`
    : `instance.getEnum('${figma}', { false: false, true: true })`;

/** What a property contributes to a template: the code that reads it and the attribute fragment in the label's syntax. */
const fragment = (
  property: PropertyMapping,
  variable: string,
  defs: Record<string, Definition>,
  label: Label
): { read: string; attr: string } => {
  const name = `'${property.figma}'`;
  const ifSet = (prop: string): string => `\${${variable} ? \` ${label.attr(prop, `\${${variable}}`)}\` : ''}`;
  const ifTrue = (prop: string): string => `\${${variable} ? ' ${label.attr(prop, true)}' : ''}`;
  switch (property.kind) {
    case 'enum': {
      const entries = Object.entries(property.values).map(([k, v]) => `  ${key(k)}: '${v}',`);
      return {
        read: `const ${variable} = instance.getEnum(${name}, {\n${entries.join('\n')}\n});`,
        attr: ` ${label.attr(property.prop, `\${${variable}}`)}`,
      };
    }
    case 'flag': {
      // every Figma option is listed; an option added in Figma later renders as an empty value with no error (measured
      // 2026-09-18 on the real renderer), so figma:pull --check and the patched publish validation catch it — preview
      // reports success
      const entries = (defs[property.figma]?.variantOptions ?? []).map((o) => `${key(o)}: ${o === property.when}`);
      return {
        read: `const ${variable} = instance.getEnum(${name}, { ${entries.join(', ')} });`,
        attr: ifTrue(property.prop),
      };
    }
    case 'boolean':
      return {
        read: property.inverted
          ? `const ${variable} = instance.getBoolean(${name}, { true: false, false: true });`
          : `const ${variable} = instance.getBoolean(${name});`,
        attr: ifTrue(property.prop),
      };
    case 'string': // TEXT properties are often blank in the library; an empty attribute is noise
      return { read: `const ${variable} = instance.getString(${name});`, attr: ifSet(property.prop) };
    case 'number':
      // a TEXT property holds any text; only a number is emitted, as an expression in the label's syntax
      return {
        read: `const ${variable} = instance.getString(${name});`,
        attr: `\${/^-?\\d+(\\.\\d+)?$/.test(${variable}) ? \` ${label.expr(property.prop, `\${${variable}}`)}\` : ''}`,
      };
    case 'text':
      return { read: `const ${variable} = instance.getString(${name});`, attr: '' };
    case 'slot':
      return { read: `const ${variable} = instance.getSlot(${name});`, attr: '' };
    case 'instance-swap': {
      // figma/helpers/iconOf.ts reads the swapped icon's own record; the default icon's name is its fallback
      const fallback = snapshot.icons[String(defs[property.figma]?.defaultValue)];
      const icon = `iconOf(instance.getInstanceSwap(${name}), ${fallback ? `'${fallback}'` : 'undefined'})`;
      const gate = property.gate && camelCase(property.gate);
      return {
        read: gate
          ? `const ${gate} = ${booleanReader(property.gate, defs[property.gate])};\nconst ${variable} = ${gate} ? ${icon} : undefined;`
          : `const ${variable} = ${icon};`,
        attr: ifSet(property.prop),
      };
    }
  }
};

// `source` is what Dev Mode and the MCP server hand out as the component's origin; a repo path means nothing in a consumer
// project, the docs API page does. Child components (`-item`, `-option`, `-cell`) are documented on their root parent's page.
const docsApiUrl = (tag: TagName): string => {
  let root = tag;
  for (let parent = getComponentMeta(root).requiredParent; parent; parent = getComponentMeta(root).requiredParent) {
    root = Array.isArray(parent) ? parent[0] : parent;
  }
  return `https://designsystem.porsche.com/v4/components/${root.replace(/^p-/, '')}/api`;
};

// The templates are excluded from tsconfig.json so Stencil ignores them, which also leaves an editor without a project
// for them; the reference makes each file carry its own types for `import figma from 'figma'`.
const typesReference = '/// <reference types="@figma/code-connect/figma-types-no-require" />';
// A string literal as biome writes it: single quotes unless the text contains one.
const literal = (text: string): string => (text.includes("'") ? JSON.stringify(text) : `'${text}'`);
/** A record's `imports` entry as biome writes it: on one line when it fits in 120 columns. */
const importsEntry = (label: Label, tag: TagName, docs: string): string[] => {
  const imports = label.imports(tag, docs).map(literal);
  const line = `  imports: [${imports.join(', ')}],`;
  return line.length <= 120 ? [line] : ['  imports: [', ...imports.map((i) => `    ${i},`), '  ],'];
};

const render = (
  component: Component,
  tag: TagName,
  properties: PropertyMapping[],
  label: Label,
  helpers: string
): string => {
  const source = docsApiUrl(tag);
  const defs = definitions(component);
  // variables are named after the PDS prop they feed (the Figma name can be inverted or a different word)
  const variables = properties.map((p) => [p, camelCase('prop' in p ? p.prop : p.figma)] as const);
  const names = variables.map(([, v]) => v);
  for (const name of new Set(names.filter((n, i) => names.indexOf(n) !== i)))
    errors.push(`${tag}: two Figma properties map to "${name}" — add an exception to figma/exceptions.ts`);
  const fragments = variables.map(([p, v]) => fragment(p, v, defs, label));
  const attributes = fragments.map((f) => f.attr).join('');
  // Interpolating the slot itself renders, through the MCP, a `<SlotDefault />` JSX reference whose content is React and
  // Tailwind in every label, and a hidden slot as `{/* Missing snippet for undefined */}` (measured 2026-09-23), so each
  // slot goes through figma/helpers/slotted.ts instead. Named slots first, default content last, a named slot's children preceded
  // by a comment naming the slot.
  const children = variables
    .filter(([p]) => p.kind === 'text' || p.kind === 'slot')
    .sort(([a], [b]) => Number(pdsSlotName(a.figma) === '') - Number(pdsSlotName(b.figma) === ''))
    .map(([p, v]) => {
      if (p.kind !== 'slot') return `\${${v}}`;
      const slot = pdsSlotName(p.figma);
      const marker = slot === '' ? '' : `, '${label.comment(`slot="${slot}"`)}'`;
      return `\${slotted(${v}, '${p.figma}'${marker})}`;
    })
    .join('');
  const tagName = label.tagName(tag);
  return [
    typesReference,
    `// url=${nodeUrl(component.id)}`,
    `// source=${source}`,
    `// component=${tagName}`,
    `// Auto generated - do not edit by hand.`,
    `import figma from 'figma';`,
    // figma/helpers/ modules; the CLI bundles relative imports into the record at publish time
    ...(properties.some((p) => p.kind === 'instance-swap') ? [`import { iconOf } from '${helpers}/iconOf';`] : []),
    ...(properties.some((p) => p.kind === 'slot') ? [`import { slotted } from '${helpers}/slotted';`] : []),
    '',
    ...(properties.length ? [`const instance = figma.selectedInstance;`, '', ...fragments.map((f) => f.read), ''] : []),
    'export default {',
    `  example: figma.code\`<${tagName}${attributes}>${children}</${tagName}>\`,`,
    ...importsEntry(label, tag, source),
    `  id: '${tag}',`,
    '  metadata: { nestable: true },',
    '};',
    '',
  ].join('\n');
};

/** The manifest entries every label's icon batch lists, one per PDS icon name. */
const iconEntries = () => {
  // one record per name; the published component comes first in the snapshot, an unpublished swap default of the same
  // name (p-tag's globe) is left to the parent's fallback
  const seen = new Set<string>();
  const source = docsApiUrl('p-icon');
  return Object.entries(snapshot.icons)
    .filter(([, name]) => !seen.has(name) && seen.add(name))
    .sort(([, a], [, b]) => a.localeCompare(b))
    .map(([id, name]) => ({
      url: nodeUrl(id),
      component: `p-icon (${name})`,
      source,
      name,
      id: `p-icon-${name}`,
    }));
};

// One Code Connect record per PDS icon component and label, published from one batch template per label (the CLI turns
// each manifest entry into a record and exposes the entry as `figma.batch`). Parent templates read the swapped icon's name
// from it; an icon placed in a slot, or selected on its own, renders the record's own `p-icon` markup.
const iconBatch = (label: Label, components: ReturnType<typeof iconEntries>): Record<string, string> => {
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
    `  example: figma.code\`<${tag} ${label.attr('name', '${figma.batch.name}')}></${tag}>\`,`,
    ...importsEntry(label, 'p-icon', docsApiUrl('p-icon')),
    '  id: figma.batch.id,',
    '  metadata: { nestable: true, props: { name: figma.batch.name } },',
    '};',
    '',
  ].join('\n');
  const manifest = { templateFile: `./${base}.ts`, components };
  return {
    [`figma/icons/${base}.ts`]: template,
    [`figma/icons/${base}.json`]: `${JSON.stringify(manifest, null, 2)}\n`,
  };
};

/** The baseline as biome writes it: tags and names sorted, each list on one line when it fits in 120 columns. */
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

const emit = (file: string, content: string): void => {
  emitted.add(file);
  if (check) {
    if (!existsSync(file) || readFileSync(file, 'utf8') !== content)
      errors.push(`${file} is stale — run "npm run figma:generate"`);
    return;
  }
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
  written++;
};

/** A generated file whose component set left the snapshot: flagged by --check, deleted otherwise. */
const removeStale = (): void => {
  const stale = globbySync(['src/components/**/figma/*.figma.ts', 'figma/icons/*']).filter((f) => !emitted.has(f));
  for (const file of stale) {
    if (check) {
      errors.push(`${file} has no component set in the snapshot — run "npm run figma:generate"`);
      continue;
    }
    unlinkSync(file);
    deleted++;
    if (readdirSync(dirname(file)).length === 0) rmdirSync(dirname(file));
  }
};

const generate = (): void => {
  const icons = iconEntries();
  const iconNames = new Set(icons.map((icon) => icon.name));
  for (const label of labels)
    for (const [file, content] of Object.entries(iconBatch(label, icons))) emit(file, content);

  let components = 0;
  const accepted: Record<string, string[]> = {};
  const withSet = new Set<string>();
  for (const component of snapshot.components) {
    const name = component.name.replace(/^fig-/, '').toLowerCase();
    const tag = `p-${name}` as TagName;
    if (!getComponentMeta(tag)) {
      skipped.push(`${component.name} (${component.id})`);
      continue;
    }
    withSet.add(tag);
    const [sourceFile] = globbySync(`src/components/**/${name}.tsx`);
    if (!sourceFile) {
      errors.push(`${tag}: no src/components/**/${name}.tsx`);
      continue;
    }
    const meta = getComponentMeta(tag);
    // every exception of the tag, whether or not the snapshot still has its Figma property: a typo is a repository mistake
    for (const exception of Object.values(exceptions[tag] ?? {})) validateException(tag, meta, exception);
    const { mappings, unplaceable, gaps } = derive(component, tag, meta);
    const coverage = applyBaseline(gaps, baseline[tag] ?? []);
    for (const name of coverage.fresh) {
      // what design has to add: nothing more for an option, a SLOT for a slot, the type the rules place for a prop
      const property = name.includes('=')
        ? undefined
        : name.startsWith('slot-')
          ? { type: 'SLOT' }
          : expectedProperty(meta.propsMeta[name], iconNames);
      designErrors.push(coverageGapLine(component.name, component.id, tag, name, property));
    }
    for (const [figma, reason] of unplaceable)
      designErrors.push(unplaceableLine(component.name, component.id, tag, figma, reason));
    if (coverage.accepted.length) accepted[tag] = coverage.accepted;
    components++;
    for (const label of labels) {
      emit(
        `${dirname(sourceFile)}/figma/${name}${label.suffix}.figma.ts`,
        render(component, tag, mappings, label, relative(`${dirname(sourceFile)}/figma`, 'figma/helpers'))
      );
    }
  }

  // component level: a PDS component with no Figma component set at all is a design line, unless the baseline accepts
  // it with the `component-set` entry (drawn inside a parent set, or not drawable); deprecated components are not expected
  const pdsTags = (TAG_NAMES as readonly string[]).filter(
    (t) => !(INTERNAL_TAG_NAMES as readonly string[]).includes(t)
  );
  const isDeprecated = (t: string): boolean => !!getComponentMeta(t as TagName)?.isDeprecated;
  for (const tag of missingComponentSets(pdsTags, withSet, isDeprecated)) {
    if ((baseline[tag] ?? []).includes(componentSetGap)) accepted[tag] = [componentSetGap];
    else designErrors.push(componentGapLine(tag));
  }

  emit(baselinePath, baselineJson(accepted));
  removeStale();

  if (skipped.length)
    console.log(`skipped ${skipped.length} component sets without a PDS component: ${skipped.join(', ')}`);
  if (designErrors.length) {
    console.error(designErrors.map(printed).join('\n'));
    console.error(`${designErrors.length} problem(s) only design can fix`);
  }
  if (errors.length) {
    console.error(errors.map(printed).join('\n'));
    process.exit(1);
  }
  console.log(
    check
      ? `generated files for ${components} components are up to date`
      : `generated ${written} files for ${components} components${deleted ? `, deleted ${deleted} stale` : ''}`
  );
};

generate();
