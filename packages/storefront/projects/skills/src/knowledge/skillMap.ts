import {
  defineOutputMap,
  htmlLink,
  type LinkResolver,
  mapLinks,
  relativeHref,
  type Framework as StorefrontFramework,
} from '@porsche-design-system/docs-components/markdown';
import { markdownMap } from '../../../../src/utils/markdownMap';
import { localPorscheDesignSystemVersion } from '../shared/version';

/**
 * The structure of a framework's knowledge skill, derived from the Storefront's sitemap: one reference per sitemap
 * page, its tabs as sections in sitemap order (`references/developing/react.md` holds getting started, …), and only the
 * pages that apply to the framework. Exceptions are overrides by route pattern; the index wording for agents is set
 * per category. `SKILL.md` indexes the references by these categories.
 */

/** Where a sitemap page is written in a skill: `references/developing/react.md`. */
export const referenceFile = (route: string): string => `references/${route}.md`;

export const skillMap = (framework: StorefrontFramework) =>
  defineOutputMap({
    locate: ({ place, frameworks }) =>
      frameworks.includes(framework)
        ? { file: referenceFile(place.reference.route), title: place.reference.title, section: place.tab }
        : undefined,
    categories: {
      developing: {
        title: 'Frameworks',
        description:
          'Set up the Porsche Design System in a new or existing project, or check an existing setup, with the ' +
          "reference for its framework and build tool. Each reference holds a framework's pages as sections, starting " +
          'with getting started.',
      },
    },
  });

const STOREFRONT_ORIGIN = `https://designsystem.porsche.com/v${localPorscheDesignSystemVersion}`;

/**
 * Links within a framework's skill, relative to the reference being written. A page outside the skill links to the
 * Storefront for the exact version the skill was generated for: its Markdown where it has some, its HTML otherwise.
 */
export const skillLinks = (framework: StorefrontFramework): LinkResolver =>
  mapLinks({
    map: skillMap(framework),
    framework,
    href: relativeHref,
    fallback: ({ route, hash, page }) => {
      const markdown = page && markdownMap.locate(page, framework);
      return `${markdown ? `${STOREFRONT_ORIGIN}/${markdown.file}` : htmlLink(STOREFRONT_ORIGIN, route)}${hash}`;
    },
  });
