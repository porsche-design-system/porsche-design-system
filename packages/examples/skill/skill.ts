import fs from 'node:fs';
import path from 'node:path';
import { componentMeta } from '@porsche-design-system/component-meta';
import type { PackageSkill, PackageSkillReference } from '@porsche-design-system/shared';
import { examples } from '../generated/examples.ts';
import type { Example } from '../lib/meta.ts';
import { type ProjectCategory, scriptEntryName, styleEntryName } from '../lib/projects.ts';
import { srcDir } from '../lib/shared.ts';

/**
 * Markdown serializer of the patterns and templates for the knowledge skill.
 *
 * It imports the source of the package export, `generated/examples.ts` – the very files StackBlitz opens and the
 * storefront shows – so `scripts/build.ts` has to run first; the root build runs it before `build:skills`. Of every
 * project it keeps what an agent needs to rebuild the example: the markup without its `<head>`, and the script without
 * the stylesheet import.
 * `package.json` and `vite.config.ts` are left out, since the skill covers the setup of every framework on its own,
 * and the stylesheet, the same for every page, is shown once in the index.
 *
 * The content is framework-agnostic, like the examples: the note on converting them to a framework is part of the
 * section of SKILL.md the knowledge skill renders from `intro`, and is not repeated in the files read after it. Components link to their storefront route (`/components/button`), which the skill resolves to its
 * component reference.
 */

const skillName = 'examples';

const categoryLabels: Record<ProjectCategory, { heading: string; singular: string }> = {
  patterns: { heading: 'Patterns', singular: 'Pattern' },
  templates: { heading: 'Templates', singular: 'Template' },
};

const getCategory = (pagePath: string): ProjectCategory => pagePath.split('/')[0] as ProjectCategory;

const escapeCell = (text: string): string => text.replace(/\|/g, '\\|').replace(/\s*\n\s*/g, ' ');

/** The document without the note on porting it – the skill states that itself – and without its `<head>`. */
export const getMarkup = (html: string): string => {
  const start = html.indexOf('<html');
  if (start === -1) {
    throw new Error('[examples] a generated index.html needs an <html> element');
  }

  return html
    .slice(start)
    .replace(/[ \t]*<head>[\s\S]*?<\/head>\n?/, '')
    .trim();
};

const REGEX_STYLE_IMPORT = new RegExp(`^import '\\./${styleEntryName.replace('.', '\\.')}';\\n?`, 'm');

/** The behaviour of the page: `main.js` without the import of the stylesheet, empty for a page without a script. */
export const getScript = (mainJs: string): string => mainJs.replace(REGEX_STYLE_IMPORT, '').trim();

/**
 * The components a page is built from, each by the component documenting it – a sub-component such as
 * `p-drilldown-link` is documented by its parent, preferably one the page renders as well.
 */
export const getComponents = (markup: string): string[] => {
  const meta = componentMeta as Record<string, { requiredParent?: string | string[] }>;
  const tags = new Set(Array.from(markup.matchAll(/<(p-[a-z0-9-]+)/g), ([, tag]) => tag));

  const getDocumentedTag = (tag: string, visited: ReadonlySet<string> = new Set()): string | undefined => {
    if (!meta[tag] || visited.has(tag)) {
      return undefined;
    }
    const parents = [meta[tag].requiredParent ?? []].flat();
    if (parents.length === 0) {
      return tag;
    }
    const parent = parents.find((candidate) => tags.has(candidate)) ?? parents[0];
    return getDocumentedTag(parent, new Set([...visited, tag]));
  };

  return [...new Set([...tags].flatMap((tag) => getDocumentedTag(tag) ?? []))].sort();
};

const renderComponentLinks = (components: string[]): string =>
  components.map((tag) => `[\`${tag}\`](/components/${tag.replace(/^p-/, '')})`).join(', ');

/** Link from a reference back to the index, which lies as many folders up as the reference name has segments. */
const getIndexLink = (pagePath: string): string => `${'../'.repeat(pagePath.split('/').length)}${skillName}.md`;

const getFile = ({ path: pagePath, files }: Example, file: string): string => {
  const content = files[file];
  if (content === undefined) {
    throw new Error(`[examples] the project of "${pagePath}" has no ${file}`);
  }
  return content;
};

/**
 * One example: what is specific to it and nothing else. What every example shares – the conventions of the markup and
 * the script, the stylesheet – is in the index, and what they are and how to convert them is in SKILL.md, which is in
 * context whenever a reference is read.
 */
const renderPage = (example: Example): string => {
  const { path: pagePath, title, description } = example;
  const markup = getMarkup(getFile(example, 'index.html'));
  const script = getScript(getFile(example, scriptEntryName));

  return [
    `# ${title}`,
    '',
    description,
    '',
    `- **Type:** ${categoryLabels[getCategory(pagePath)].singular}`,
    `- **Components:** ${renderComponentLinks(getComponents(markup))}`,
    `- **Conventions and stylesheet:** shared by all examples, see [${skillName}.md](${getIndexLink(pagePath)})`,
    '',
    '## Markup',
    '',
    '```html',
    markup,
    '```',
    '',
    '## Script',
    '',
    ...(script ? ['```js', script, '```'] : ['None – the components cover all of the behaviour.']),
    '',
  ].join('\n');
};

const getExamples = (): Example[] => Object.values(examples);

const renderCatalog = (examples: Example[]): string[] =>
  (Object.keys(categoryLabels) as ProjectCategory[]).flatMap((category) => {
    const entries = examples.filter(({ path: pagePath }) => getCategory(pagePath) === category);
    const { heading, singular } = categoryLabels[category];

    return entries.length === 0
      ? []
      : [
          `## ${heading}`,
          '',
          `| ${singular} | Description | Reference |`,
          '| --- | --- | --- |',
          ...entries.map(
            ({ path: pagePath, title, description }) =>
              `| ${escapeCell(title)} | ${escapeCell(description)} | [${pagePath.split('/').pop()}.md](./${skillName}/${pagePath}.md) |`
          ),
          '',
        ];
  });

const title = 'Patterns and templates';

const intro =
  'Patterns and templates are curated use cases composed of PDS components, each with a defined layout, styling and ' +
  'behaviour – the way the Porsche Design System puts its components together for a recurring task. Patterns ' +
  'cover a single section of a page – a header, a footer, a popover flow, a feedback form – shown in the place it ' +
  'occupies on a real page; templates cover a whole page. They are written in vanilla HTML and JavaScript with the ' +
  'PDS web components and the PDS Tailwind CSS theme. Whatever the framework of a project, they are the reference ' +
  'for how such a pattern is meant to be built – the components, their props, the layout, the styling and the ' +
  'behaviour they show – and only their syntax has to be converted to the framework.';

/** The catalog, and what every example shares. What they are is the intro, rendered into SKILL.md rather than here. */
const renderIndex = (): string => {
  const stylesheet = fs.readFileSync(path.join(srcDir, styleEntryName), 'utf8').trim();

  return [
    `# ${title}`,
    '',
    'Every pattern and template with its reference, and what all of them share: the conventions of their references ' +
      'and their stylesheet. Start from the example closest to the task; keep its landmarks, labels and focus ' +
      'handling, and replace its placeholder content, links and media and the demo logic of its script.',
    '',
    ...renderCatalog(getExamples()),
    '## Conventions',
    '',
    '- **Markup:** the document without its `<head>`. Links point to `#`, texts and media are placeholders.',
    '- **Attributes:** the components are written as HTML takes them – object and breakpoint values of props are ' +
      'strings, e.g. `hide-label="{ base: true, s: false }"`.',
    '- **Script:** the behaviour of the page, as a JavaScript module. It is demo code: it wires up the components by ' +
      'their ids and fakes everything a real application would load or send.',
    '',
    '## Stylesheet',
    '',
    'Every example imports the same stylesheet: the [global styles](/stylesheets/introduction) the components ' +
      'depend on, Tailwind CSS and the [PDS Tailwind CSS theme](/tailwindcss/introduction) whose utilities the ' +
      'markup uses, and a rule hiding the components until they are defined. Its comment describes how that rule ' +
      'differs for server-side rendering and Angular.',
    '',
    '```css',
    stylesheet,
    '```',
    '',
  ].join('\n');
};

export const examplesSkill: PackageSkill = {
  name: skillName,
  title,
  description:
    'Curated use cases composed of PDS components with a defined layout and styling – page sections (patterns) ' +
    'and whole pages (templates) to start from when building a header, footer, popover flow, feedback form, ' +
    'landing page or admin panel.',
  intro,
  getContent: renderIndex,
  getReferences: (): PackageSkillReference[] =>
    getExamples().map((example) => ({
      name: example.path,
      title: example.title,
      description: example.description,
      getContent: () => renderPage(example),
    })),
};
