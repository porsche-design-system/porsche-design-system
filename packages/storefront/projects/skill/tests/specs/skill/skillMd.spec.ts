import { describe, expect, it } from 'vitest';
import type { ComponentRosterEntry } from '@skill/components/reference';
import { renderComponentsSection } from '@skill/components/section';
import { renderStylesheetsSection, renderStylingSection, renderTokensSection } from '@skill/packageSkills';
import { ACTIVATION_DESCRIPTION, buildSkillMd as renderSkillMd, skillName } from '@skill/skillMd';
import { FRAMEWORKS, type Framework } from '@skill/support/skillTree';

const buildSkillMd = (framework: Framework, roster: readonly ComponentRosterEntry[] = []): string =>
  renderSkillMd(framework, {
    components: renderComponentsSection(framework, roster),
    stylesheets: renderStylesheetsSection(framework),
    tokens: renderTokensSection(),
    styling: renderStylingSection(),
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

  it('renders only the current topical sections in order', () => {
    const markdown = buildSkillMd('react', [{ tag: 'p-button', summary: 'x' }]);

    expect(markdown).toMatch(/## Components[\s\S]*## Stylesheets[\s\S]*## Tokens[\s\S]*## Styling/);
    expect(markdown).not.toMatch(/## (Getting started|Reference map|Core rules|Partials|Upgrades & migration)/);
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
