import path from 'node:path';
import type { PackageSkill } from '@porsche-design-system/shared';
import { stylesheetsSkill } from '../../../../components/projects/stylesheets/skill/skill';
import { emotionSkill } from '../../../../styles/projects/emotion/skill/skill';
import { scssSkill } from '../../../../styles/projects/scss/skill/skill';
import { tailwindcssSkill } from '../../../../styles/projects/tailwindcss/skill/skill';
import { vanillaExtractSkill } from '../../../../styles/projects/vanilla-extract/skill/skill';
import { type RouteReferences, rewriteDocLinks } from './links';
import { escapeCell, markdownTable } from './markdown';
import { rawScssReference, rawTailwindcssReference } from './rawStyleReferences';
import type { Framework, SkillTree } from './skillTree';

/**
 * Mounts the package-owned `PackageSkill` fragments (the four styling solutions + stylesheets) into
 * every wrapper tree and renders their SKILL.md sections (`## Stylesheets`, `## Styling`). Adding
 * another styling solution requires its PackageSkill export and one registration here; paths, route
 * links and SKILL.md rows are derived from that registration.
 */

type PackageSkillRegistration = {
  skill: PackageSkill;
  mount: '' | 'styles';
  rawReference?: (framework: Framework) => string;
};

const STYLING_SKILLS: readonly PackageSkillRegistration[] = [
  { skill: tailwindcssSkill, mount: 'styles', rawReference: rawTailwindcssReference },
  { skill: scssSkill, mount: 'styles', rawReference: rawScssReference },
  { skill: vanillaExtractSkill, mount: 'styles' },
  { skill: emotionSkill, mount: 'styles' },
];
const STYLESHEETS_SKILL: PackageSkillRegistration = { skill: stylesheetsSkill, mount: '' };
const PACKAGE_SKILLS = [...STYLING_SKILLS, STYLESHEETS_SKILL];

const referencePath = ({ skill, mount }: PackageSkillRegistration): string =>
  path.posix.join(mount, `${skill.name}.md`);

/** Skill-root-relative path of a registration's mounted reference file. */
const resolvedPath = (registration: PackageSkillRegistration): string =>
  path.posix.join('references', referencePath(registration));

export const getPackageSkillRouteReferences = (): RouteReferences =>
  Object.fromEntries(PACKAGE_SKILLS.map((registration) => [registration.skill.name, resolvedPath(registration)]));

const fullStylesheetSection = (rawReference: string): string =>
  `## Full stylesheet\n\nThe tables above are the index, with each token's value. For the complete generated stylesheet — resets, deprecated aliases and everything not tabulated here — read \`${rawReference}\` in the installed package.\n`;

export const writePackageSkillReferences = (tree: SkillTree, routeReferences: RouteReferences): string[] =>
  PACKAGE_SKILLS.map((registration) => {
    const reference = referencePath(registration);
    const rawReference = registration.rawReference?.(tree.framework);
    const packageContent = registration.skill.getContent();
    const content = rawReference ? `${packageContent}\n${fullStylesheetSection(rawReference)}` : packageContent;
    return tree.writeReference(reference, rewriteDocLinks(content, resolvedPath(registration), routeReferences));
  });

/**
 * The initialization API each framework configures PDS through — the place a reader might wrongly
 * expect a `theme` option. React/Vue take the `PorscheDesignSystemProvider` component; js calls
 * `load()`; Angular calls `PorscheDesignSystemModule.load()`. Each accepts only `prefix` and `cdn`.
 */
const THEME_INIT_TARGET: Record<Framework, string> = {
  react: '`PorscheDesignSystemProvider` (it takes only `prefix` and `cdn`)',
  vue: '`PorscheDesignSystemProvider` (it takes only `prefix` and `cdn`)',
  js: 'the `load()` initializer (it takes only `prefix` and `cdn`)',
  angular: '`PorscheDesignSystemModule.load()` (it takes only `prefix` and `cdn`)',
};

/**
 * The theming inoculation, rendered into the `## Stylesheets` section (theming is a stylesheet
 * concern). Light/dark is CSS `color-scheme` and nothing else; the removed-in-earlier-majors `theme`
 * prop is the common hallucination this pre-empts. Skill-only anti-hallucination content — it stays
 * aggregator-owned, never in the package fragment.
 */
const renderThemingNote = (framework: Framework): string =>
  '**Theming is one mechanism — CSS `color-scheme`, nothing else.** Light/dark is controlled solely by ' +
  'the `.scheme-light` / `.scheme-dark` / `.scheme-light-dark` classes on `<html>` (or any ancestor); ' +
  'the scheme cascades to **both** PDS components and custom markup, which all resolve colors via ' +
  `\`light-dark()\`. \`.scheme-light-dark\` follows the OS. There is **no** \`theme\` prop — not on ${THEME_INIT_TARGET[framework]} and not on components. A ` +
  '`theme="light|dark|auto"` prop existed in earlier majors and was removed; if you recall one, it is a ' +
  'stale prior — do not add it, verify against the installed types.';

/** The `## Stylesheets` section body: the fragment's "use when" prose, a pointer to the reference, and
 * the theming note. */
export const renderStylesheetsSection = (framework: Framework): string => {
  const { skill } = STYLESHEETS_SKILL;
  const reference = resolvedPath(STYLESHEETS_SKILL);
  const fileName = reference.split('/').pop();
  return [
    `${skill.intro ?? skill.description} See [${fileName}](${reference}) for the exact files, ` +
      'their import order and the full `.scheme-*` list.',
    '',
    renderThemingNote(framework),
  ].join('\n');
};

/**
 * The `## Styling` section body (last section): the styling-solutions overview so the agent always
 * knows PDS offers these integrations and what they are for. They are independent of the components
 * but build on the same tokens and the same `color-scheme` theming, so custom UI shares the exact
 * palette, spacing and typography as PDS components — the full mechanics live in the Stylesheets
 * section / reference. Each row links the solution's reference for setup and the full catalog.
 */
export const renderStylingSection = (): string => {
  const tailwindPath = resolvedPath(
    STYLING_SKILLS.find(({ skill }) => skill === tailwindcssSkill) ?? STYLING_SKILLS[0]
  );
  const numberWords = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
  const solutionCount = numberWords[STYLING_SKILLS.length] ?? String(STYLING_SKILLS.length);
  const rows = STYLING_SKILLS.map((registration) => [
    registration.skill.title,
    escapeCell(registration.skill.description),
    `[${resolvedPath(registration).split('/').pop()}](${resolvedPath(registration)})`,
  ]);
  return [
    `The Porsche Design System offers a ready-made integration for ${solutionCount} styling solutions. They are ` +
      'independent of the components — you do not need them to use components, and they do not depend on ' +
      'components — but they build on the same design system: the same design tokens and the same ' +
      '`color-scheme` (light/dark) theming, so one `.scheme-*` class drives both PDS components and your ' +
      'custom UI. Custom UI you build with them therefore shares the exact palette, spacing and ' +
      'typography as PDS components. There is no separate component theming API and no `theme` prop; the ' +
      'full theming mechanics live in the **Stylesheets** section above.',
    '',
    'Use them to build layout and custom components or patterns not yet available in the component ' +
      'library — typography, surfaces, boxes, the layout grid, spacing and responsive breakpoints. Pick ' +
      'one solution per project and open its reference for setup and the full catalog.',
    '',
    'Note: the code examples in the component references use PDS Tailwind utility classes (e.g. `flex`, ' +
      '`flex-col`, `gap-fluid-sm`) for layout. These only take effect with the Tailwind CSS solution ' +
      `installed (\`${tailwindPath}\`) — without it they are inert, so replace them with ` +
      'your own layout CSS.',
    '',
    markdownTable(['Styling solution', 'Use this when', 'Reference'], rows),
  ].join('\n');
};
