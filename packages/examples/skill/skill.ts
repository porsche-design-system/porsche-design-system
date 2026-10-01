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
 * The content is framework-agnostic, like the examples: the knowledge skill adds the note on converting them to its
 * framework. Components link to their storefront route (`/components/button`), which the skill resolves to its
 * component reference.
 */

const skillName = 'examples';

const categoryLabels: Record<ProjectCategory, { heading: string; singular: string; summary: string }> = {
  patterns: { heading: 'Patterns', singular: 'Pattern', summary: 'a single section of a page' },
  templates: { heading: 'Templates', singular: 'Template', summary: 'a whole page, chrome included' },
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

const renderPage = (example: Example): string => {
  const { path: pagePath, title, description } = example;
  const category = categoryLabels[getCategory(pagePath)];
  const markup = getMarkup(getFile(example, 'index.html'));
  const script = getScript(getFile(example, scriptEntryName));

  return [
    `# ${title}`,
    '',
    description,
    '',
    `- **Type:** ${category.singular} – ${category.summary}.`,
    `- **Components:** ${renderComponentLinks(getComponents(markup))}`,
    `- **Stylesheet:** the one all examples share, see [${skillName}.md](${getIndexLink(pagePath)}#stylesheet).`,
    '',
    '## Markup',
    '',
    'The document without its `<head>`. Links point to `#`, texts and media are placeholders. The components are ' +
      'written as HTML takes them: object and breakpoint values of props are strings, e.g. ' +
      '`hide-label="{ base: true, s: false }"`.',
    '',
    '```html',
    markup,
    '```',
    '',
    '## Script',
    '',
    ...(script
      ? [
          'The behaviour of the page, as a JavaScript module. It is demo code: it wires up the components by their ' +
            'ids and fakes everything a real application would load or send.',
          '',
          '```js',
          script,
          '```',
        ]
      : ['The page has no behaviour of its own: the components cover all of it.']),
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
  'Patterns are single sections of a page – a header, a footer, a popover flow, a feedback form – shown in the ' +
  'place they occupy on a real page; templates are whole pages. Both are written with web platform technologies: ' +
  'HTML with the PDS web components, the PDS Tailwind CSS theme, and a plain JavaScript module for the behaviour.';

const renderIndex = (): string => {
  const stylesheet = fs.readFileSync(path.join(srcDir, styleEntryName), 'utf8').trim();

  return [
    `# ${title}`,
    '',
    `${intro} Each reference holds the complete markup and script of one example.`,
    '',
    'Start from the example closest to the task instead of composing the UI from scratch, and keep what makes it ' +
      'work: the components and their props, the Tailwind CSS utilities of the PDS theme, the landmarks, labels and ' +
      'focus handling. Replace the placeholder content, links and media, and the demo logic of the script.',
    '',
    ...renderCatalog(getExamples()),
    '## Stylesheet',
    '',
    'Every example imports the same stylesheet: the global styles of the components, Tailwind CSS and the PDS ' +
      'Tailwind CSS theme, and a rule hiding the components until they are defined. Its comment describes how that ' +
      'rule differs for server-side rendering and Angular.',
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
    'Ready-made page sections (patterns) and whole pages (templates), composed of PDS components and the PDS ' +
    'Tailwind CSS theme – start from them when building a header, footer, popover flow, feedback form, landing ' +
    'page or admin panel.',
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
