import {
  type Page,
  pageToMarkdown,
  type Site,
  type Framework as StorefrontFramework,
  skillLinks,
  skillReference,
} from '@porsche-design-system/docs-components/markdown';
import { escapeCell, markdownTable } from '../shared/markdown';
import type { Framework, SkillTree } from '../shared/skillTree';
import { localPorscheDesignSystemVersion } from '../shared/version';

/**
 * Storefront pages rendered by `@porsche-design-system/docs-components`, the same Markdown the Storefront serves next
 * to its HTML. Each lands at its route below `references/`, so a link between two of them works in both. A skill
 * contains the pages of its own framework and those that apply to every framework.
 */

const STOREFRONT_FRAMEWORK: Record<Framework, StorefrontFramework> = {
  js: 'vanilla-js',
  angular: 'angular',
  react: 'react',
  vue: 'vue',
};

const STOREFRONT_SUFFIX = ' - Porsche Design System';

const titleOf = (page: Page): string => (page.metadata.title ?? page.route).replace(STOREFRONT_SUFFIX, '');

/** Writes the framework's pages to `references/<route>.md` and returns them, in route order. */
export const writePageReferences = (tree: SkillTree, pages: readonly Page[], site: Site): Page[] => {
  const framework = STOREFRONT_FRAMEWORK[tree.framework];
  const resolve = skillLinks({ framework, version: localPorscheDesignSystemVersion });
  const included = pages.filter((page) => page.frameworks.includes(framework));

  for (const page of included) {
    const variant = page.kind === 'independent' ? undefined : framework;
    tree.write(skillReference(page.route), pageToMarkdown(page, variant, site, resolve));
  }
  return included;
};

const GETTING_STARTED = /^developing\/[^/]+\/getting-started$/;

/** The `## Getting started` section: one row per setup guide of the framework. */
export const renderGettingStartedSection = (pages: readonly Page[]): string => {
  const guides = pages.filter(({ route }) => GETTING_STARTED.test(route));
  return [
    'Set up the Porsche Design System in a new or existing project, or check an existing setup, with the guide for ' +
      'its framework and build tool. Each guide lists the dependency versions it is based on.',
    '',
    markdownTable(
      ['Guide', 'Summary', 'Reference'],
      guides.map((page) => [
        escapeCell(titleOf(page)),
        escapeCell(page.metadata.description ?? ''),
        `[${page.route.split('/').slice(1).join('/')}.md](${skillReference(page.route)})`,
      ])
    ),
  ].join('\n');
};
