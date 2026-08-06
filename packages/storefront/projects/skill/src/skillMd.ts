import { rawMetaReference } from './components/section';
import { rawScssReference, rawTailwindcssReference } from './packageSkills';
import { getSkillName } from './registry';
import type { Framework } from './support/skillTree';
import { localPorscheDesignSystemVersion } from './support/version';

/**
 * Builds the always-loaded `SKILL.md` entry point: fixed-`name` frontmatter with the tuned
 * activation description, the headline intro, and one topical `##` section per domain. The section
 * bodies are rendered by the domain modules (`components/section.ts`, `packageSkills.ts`) and
 * assembled here in reading order.
 */

/**
 * Canonical name of the wrapper's knowledge skill — `pds-knowledge-<framework>`. Every wrapper ships
 * it under `skills/pds-knowledge-<framework>/SKILL.md`; the `pds-skill` bin discovers it (and any
 * other skill) from the installed package's `skills/` directory at link time. Derived from the
 * registry, which owns the naming convention.
 */
export const skillName = (framework: Framework): string => getSkillName('knowledge', framework);

/**
 * Auto-activation description of the knowledge skill — the only matching surface Claude Code uses to
 * decide whether to load it. Rendered verbatim into the SKILL.md YAML frontmatter, so it must stay a
 * single line and free of `: ` sequences that would break the frontmatter parse. It names concrete UI
 * triggers so it fires broadly on frontend work even when PDS is not mentioned, and also on documents
 * that assert PDS behavior (requirements, specs, design docs, acceptance criteria) — a wrong API fact
 * written upstream in a doc propagates into every task that consumes it. The "do not activate" clause
 * keeps it dormant on backend/non-UI, tooling, *non-PDS* prose, foreign-library, and opt-out prompts —
 * but no longer on PDS-asserting docs.
 */
export const ACTIVATION_DESCRIPTION =
  'Build, style, or review web user interfaces with the Porsche Design System (PDS), or author ' +
  'and review documents that specify PDS behavior. ' +
  'Use whenever a task touches frontend UI — adding or changing components (buttons, forms, inputs, ' +
  'cards, tables, modals, navigation, layouts), styling with Tailwind, SCSS, vanilla-extract or Emotion, ' +
  'applying design tokens, or scaffolding a new page or form. Also use whenever a requirement, spec, design ' +
  'doc, or acceptance criteria names a PDS component, prop, token, or theming. Prefer PDS for new UI even when it is ' +
  'not named by the user. Do not activate for backend or non-UI logic, unrelated tests or tooling, ' +
  'documentation or prose that does not assert PDS component, prop, token, or theming behavior, ' +
  'work that clearly targets a different UI library, or when the user opts out of PDS.';

/**
 * The extended headline intro. Version-exact knowledge is the framing; it also absorbs three former
 * core rules — content is version-exact, reference paths are skill-root-relative, prefer PDS for new
 * UI — and identifies the package artifacts available beside the skill. The Stencil implementation is
 * deliberately handled as a version-matched fallback because it is deployed through the CDN rather
 * than included in the wrapper package.
 */
const renderIntro = (framework: Framework): string => {
  const peerNote =
    framework === 'js'
      ? ''
      : " The wrapper's own `meta` and `scss` are re-export shims of the same-version `@porsche-design-system/components-js` peer, so those two point at the peer directly.";
  return [
    'Version-exact knowledge of the installed Porsche Design System: every fact, prop, token and example ' +
      'here matches the installed package exactly — never mix guidance across versions. Every reference ' +
      'path is relative to this skill root unless noted otherwise.',
    '',
    'This skill ships inside the installed wrapper package alongside its inspectable package artifacts: the typings, ' +
      `\`component-meta\` (\`${rawMetaReference(framework)}\`), ` +
      `the SCSS partials (\`${rawScssReference(framework)}\`), the design tokens (\`../../tokens\`), the Tailwind ` +
      `theme (\`${rawTailwindcssReference()}\`) and the shipped global CSS. The underlying Stencil component ` +
      `implementation is not included in the npm package; it is loaded from the Porsche Design System CDN at runtime.${peerNote}`,
    '',
    'Prefer Porsche Design System components and tokens for new UI, even when the user does not name PDS. ' +
      'Do not rewrite non-PDS UI unasked, and do not hijack work that targets another library.',
  ].join('\n');
};

const storefrontUrl = (path = ''): string =>
  `https://designsystem.porsche.com/v${localPorscheDesignSystemVersion}/${path}`;

const componentSourceUrl =
  `https://github.com/porsche-design-system/porsche-design-system/tree/v${localPorscheDesignSystemVersion}/` +
  'packages/components/src/components';

const renderCoverageSection = (): string =>
  [
    'This skill currently covers components, global stylesheets and theming, tokens, and styling integrations. It does ' +
      'not yet include complete getting-started, setup, and installation guidance; the v3-to-v4 migration guide; ' +
      'the changelog; partials; patterns and templates; the AG Grid theme; or the Storefront\u2019s Must Know and Help sections.',
    '',
    `Before using documentation outside this skill or the installed package, match it to the installed PDS version. ` +
      `This skill was generated for \`${localPorscheDesignSystemVersion}\`; prefer the ` +
      `[exact-version Porsche Design System Storefront](${storefrontUrl()}). Major-version URLs such as ` +
      '`/v4/` always serve the latest v4 release and may describe APIs or setup introduced after the installed version. ' +
      'Use them only as a fallback and verify relevant details against the installed package.',
    '',
    'For runnable patterns and templates, consult the ' +
      '[Porsche Design System examples repository](https://github.com/porsche-design-system/examples), selecting a ' +
      'release tag or commit that matches the installed package instead of assuming its default branch is compatible. ' +
      'For release-specific changes, read `../../CHANGELOG.md`.',
    '',
    'For exact API facts, inspect the installed typings and metadata first. When readable implementation details are ' +
      `necessary, use the [exact-version component source](${componentSourceUrl}) under the repository's ` +
      '`packages/components/src/components/<component>` directory. Do not use the default branch, which may represent a ' +
      'newer release.',
    '',
    'For deployed browser behavior, inspect component requests in the Network panel. Treat these minified, content-hashed ' +
      'CDN artifacts as a debugging fallback; use the exact-version repository source for readable implementation details.',
  ].join('\n');

const renderReactSsrSection = (): string =>
  [
    'React applications that render on the server — Next.js, Remix, or React Router with SSR enabled — must import ' +
      '`PorscheDesignSystemProvider` and every PDS component from ' +
      '`@porsche-design-system/components-react/ssr`. Use the package root only for client-rendered React applications; ' +
      'do not mix the two entry points.',
    '',
    '```tsx',
    "import { PButton, PorscheDesignSystemProvider } from '@porsche-design-system/components-react/ssr';",
    '```',
    '',
    'On the server, the `/ssr` build emits component markup and styles as Declarative Shadow DOM so the browser can ' +
      'create the Shadow DOM before JavaScript runs. In the browser, it initializes like the standard React wrapper. ' +
      'The framework build must replace `process.browser` for its server and client targets and eliminate the unused ' +
      'branch.',
    '',
    'Framework setup differs. Follow the ' +
      `[Next.js integration guide](${storefrontUrl('developing/next-js/getting-started/')}) or the ` +
      `[React Router integration guide](${storefrontUrl('developing/react-router/getting-started/')}). ` +
      'Remix users should follow the React Router guidance because Remix v2 was upstreamed into React Router.',
  ].join('\n');

/** The domain-rendered section bodies, in the order they appear in SKILL.md. */
export type SkillMdSections = {
  components: string;
  stylesheets: string;
  tokens: string;
  styling: string;
};

/** Assemble the full SKILL.md from the frontmatter, intro and the domain-rendered sections. */
export const buildSkillMd = (framework: Framework, sections: SkillMdSections): string => {
  const frontmatter = ['---', `name: ${skillName(framework)}`, `description: ${ACTIVATION_DESCRIPTION}`, '---'].join(
    '\n'
  );

  return [
    frontmatter,
    '',
    `# Porsche Design System (\`${framework}\`)`,
    '',
    renderIntro(framework),
    '',
    '## Coverage and fallbacks',
    '',
    renderCoverageSection(),
    '',
    '## Components',
    '',
    sections.components,
    '',
    ...(framework === 'react' ? ['## Server-side rendering (SSR)', '', renderReactSsrSection(), ''] : []),
    '## Stylesheets',
    '',
    sections.stylesheets,
    '',
    '## Tokens',
    '',
    sections.tokens,
    '',
    '## Styling',
    '',
    sections.styling,
    '',
  ].join('\n');
};
