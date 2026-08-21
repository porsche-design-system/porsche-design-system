import path from 'node:path';
import { emotionSkill } from '@porsche-design-system/emotion/skill';
import { scssSkill } from '@porsche-design-system/scss/skill';
import type { PackageSkill } from '@porsche-design-system/shared';
import { stylesheetsSkill } from '@porsche-design-system/stylesheets/skill';
import { tailwindcssSkill } from '@porsche-design-system/tailwindcss/skill';
import { tokensSkill } from '@porsche-design-system/tokens-meta/skill';
import { vanillaExtractSkill } from '@porsche-design-system/vanilla-extract/skill';
import { type RouteReferences, rewriteDocLinks } from '../shared/links';
import { escapeCell, markdownTable } from '../shared/markdown';
import type { Framework, SkillTree } from '../shared/skillTree';

/**
 * Mounts the package-owned `PackageSkill` fragments (the four styling solutions, stylesheets and
 * tokens) into every wrapper tree and renders their SKILL.md sections (`## Stylesheets`,
 * `## Tokens`, `## Styling`). Adding another package skill requires its PackageSkill export and one
 * registration here; paths, route links and SKILL.md rows are derived from that registration.
 */

/** Every wrapper ships a real copy of the generated Tailwind stylesheet. */
export const rawTailwindcssReference = (): string => '../../tailwindcss/index.css';

/** Only the js wrapper ships the real SCSS partials; framework wrappers expose re-export shims. */
export const rawScssReference = (framework: Framework): string =>
  framework === 'js' ? '../../scss' : '@porsche-design-system/components-js/scss';

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
const TOKENS_SKILL: PackageSkillRegistration = { skill: tokensSkill, mount: '' };
const PACKAGE_SKILLS = [...STYLING_SKILLS, STYLESHEETS_SKILL, TOKENS_SKILL];

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
 * concern). The removed-in-earlier-majors `theme` prop is the common hallucination this pre-empts.
 * Skill-only anti-hallucination content — it stays aggregator-owned, never in the package fragment;
 * the `.scheme-*` mechanics themselves live only in the fragment's `stylesheets.md`.
 */
const renderThemingNote = (framework: Framework): string =>
  '**Theming is one mechanism — CSS `color-scheme`, nothing else** (the `.scheme-*` mechanics live in ' +
  `[stylesheets.md](${resolvedPath(STYLESHEETS_SKILL)})). There is **no** \`theme\` prop — not on ${THEME_INIT_TARGET[framework]} and not on components. A ` +
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
    `The Porsche Design System offers a ready-made integration for ${solutionCount} styling solutions. Use them ` +
      'to build layout and custom components or patterns not yet available in the component library — ' +
      'typography, surfaces, boxes, the layout grid, spacing and responsive breakpoints. They are ' +
      'independent of the components, but build on the same design tokens and the same `color-scheme` ' +
      '(light/dark) theming (see the **Stylesheets** section above), so custom UI shares the exact ' +
      'palette, spacing and typography as PDS components. Pick one solution per project and open its ' +
      'reference for setup and the full catalog.',
    '',
    'Note: the code examples in the component references use PDS Tailwind utility classes (e.g. `flex`, ' +
      '`flex-col`, `gap-fluid-sm`) for layout. These only take effect with the Tailwind CSS solution ' +
      `installed (\`${tailwindPath}\`) — without it they are inert, so replace them with ` +
      'your own layout CSS.',
    '',
    markdownTable(['Styling solution', 'Use this when', 'Reference'], rows),
  ].join('\n');
};

/** The `## Tokens` SKILL.md section body: the fragment's intro plus the pointer at the mounted reference. */
export const renderTokensSection = (): string =>
  `${tokensSkill.intro} Open [tokens.md](${resolvedPath(TOKENS_SKILL)}) when using tokens directly in custom UI.`;
