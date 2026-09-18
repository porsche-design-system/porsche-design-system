import type { ComponentRosterEntry } from '@skills/knowledge/components/reference';
import { renderComponentsSection } from '@skills/knowledge/components/section';
import { renderStylesheetsSection, renderStylingSection, renderTokensSection } from '@skills/knowledge/packageSkills';
import {
  ACTIVATION_DESCRIPTION,
  renderDeprecationsSection,
  buildSkillMd as renderSkillMd,
  skillName,
} from '@skills/knowledge/skillMd';
import { FRAMEWORKS, type Framework } from '@skills/shared/skillTree';
import { localPorscheDesignSystemVersion } from '@skills/shared/version';
import { describe, expect, it } from 'vitest';

const buildSkillMd = (framework: Framework, roster: readonly ComponentRosterEntry[] = []): string =>
  renderSkillMd(framework, {
    components: renderComponentsSection(framework, roster),
    stylesheets: renderStylesheetsSection(framework),
    tokens: renderTokensSection(),
    styling: renderStylingSection(),
    deprecations: renderDeprecationsSection(),
  });

describe('buildSkillMd', () => {
  it.each(FRAMEWORKS)('emits the %s package frontmatter', (framework) => {
    expect(buildSkillMd(framework)).toContain(
      `---\nname: ${skillName(framework)}\ndescription: ${ACTIVATION_DESCRIPTION}\n---`
    );
  });

  it('keeps the activation description on one frontmatter-safe line', () => {
    expect(ACTIVATION_DESCRIPTION).not.toMatch(/\n|: /);
  });

  it.each(FRAMEWORKS)('stays model-invocable for %s', (framework) => {
    // The opposite of the audit skill, deliberately. This skill exists to fire broadly on frontend
    // work — including work a user never thought to connect to PDS — so disabling model invocation
    // here would silently remove most of its value.
    expect(buildSkillMd(framework)).not.toContain('disable-model-invocation');
  });

  it('renders only the current topical sections in order', () => {
    const markdown = buildSkillMd('react', [{ tag: 'p-button', summary: 'x' }]);

    expect(markdown).toMatch(
      /## Coverage and fallbacks[\s\S]*## Components[\s\S]*## Server-side rendering \(SSR\)[\s\S]*## Stylesheets[\s\S]*## Tokens[\s\S]*## Styling[\s\S]*## Deprecations/
    );
    expect(markdown).not.toMatch(/## (Getting started|Reference map|Core rules|Partials|Upgrades & migration)/);
  });

  it.each(FRAMEWORKS)('renders version-safe coverage fallbacks for %s', (framework) => {
    const markdown = buildSkillMd(framework);
    const storefrontUrl = `https://designsystem.porsche.com/v${localPorscheDesignSystemVersion}/`;
    const componentSourceUrl =
      `https://github.com/porsche-design-system/porsche-design-system/tree/v${localPorscheDesignSystemVersion}/` +
      'packages/components/src/components';

    expect(markdown).toContain(`This skill was generated for \`${localPorscheDesignSystemVersion}\``);
    expect(markdown).toContain(`[exact-version Porsche Design System Storefront](${storefrontUrl})`);
    expect(markdown).toContain('https://github.com/porsche-design-system/examples');
    expect(markdown).toContain(`[exact-version component source](${componentSourceUrl})`);
    expect(markdown).toContain('The underlying Stencil component implementation is not included in the npm package');
    expect(markdown).toContain('minified, content-hashed CDN artifacts as a debugging fallback');
    expect(markdown).toContain('read `../../CHANGELOG.md`');
  });

  it('renders SSR guidance only for React', () => {
    const markdown = buildSkillMd('react');
    const storefrontUrl = `https://designsystem.porsche.com/v${localPorscheDesignSystemVersion}/`;

    expect(markdown).toContain('Next.js, Remix, or React Router with SSR enabled');
    expect(markdown).toContain(
      "import { PButton, PorscheDesignSystemProvider } from '@porsche-design-system/components-react/ssr';"
    );
    expect(markdown).toContain(`${storefrontUrl}developing/next-js/getting-started/`);
    expect(markdown).toContain(`${storefrontUrl}developing/react-router/getting-started/`);

    for (const framework of FRAMEWORKS.filter((fw) => fw !== 'react')) {
      expect(buildSkillMd(framework)).not.toContain('## Server-side rendering (SSR)');
    }
  });

  it('inlines the component roster with skill-root-relative links', () => {
    const markdown = buildSkillMd('react', [
      { tag: 'p-button', summary: 'The button component.' },
      { tag: 'p-accordion', summary: 'Reveals or hides sections.' },
    ]);

    expect(markdown).toContain(
      '| `p-button` | The button component. | [p-button.md](references/components/p-button/p-button.md) |'
    );
    expect(markdown).toContain('2 components');
  });

  it('escapes pipe characters in roster summaries', () => {
    expect(buildSkillMd('vue', [{ tag: 'p-x', summary: 'a | b' }])).toContain('a \\| b');
  });
});
