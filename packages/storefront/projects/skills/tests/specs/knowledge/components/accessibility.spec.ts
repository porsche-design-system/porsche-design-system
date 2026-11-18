import type { PCheckboxProps } from '@porsche-design-system/components-react';
import { FRAMEWORKS, type Framework } from '@porsche-design-system/shared';
import { resolveExamplePayload } from '@porsche-design-system/story-generator';
import {
  renderA11yIntegrationExamples,
  type SkillAccessibilityExample,
} from '@skills/knowledge/components/accessibility';
import { describe, expect, it } from 'vitest';

// The snippets as the catalogue resolves them; resolving the payloads is tested in resolveExamplePayload.spec.ts.
const snippets = (properties: Partial<PCheckboxProps>): Record<Framework, string> =>
  Object.fromEntries(
    FRAMEWORKS.map((framework) => [
      framework,
      resolveExamplePayload(
        { kind: 'story', story: { generator: () => [{ tag: 'p-checkbox', properties }] } },
        framework,
        { tag: 'p-checkbox', key: 'hiddenLabel', side: 'antiPattern', framework }
      ),
    ])
  ) as Record<Framework, string>;

const hiddenLabel: SkillAccessibilityExample = {
  title: 'Hidden label without accessible name',
  antiPattern: snippets({ name: 'terms', hideLabel: true }),
  recommended: snippets({ name: 'terms', hideLabel: true, label: 'I accept the terms and conditions' }),
};

describe('renderA11yIntegrationExamples', () => {
  it('omits the section for no examples', () => {
    expect(renderA11yIntegrationExamples([], 'vanilla-js')).toBe('');
  });

  it('renders the section, heading, and anti-pattern/recommended labels in order', () => {
    const markdown = renderA11yIntegrationExamples([hiddenLabel], 'vanilla-js');
    const headingIndex = markdown.indexOf('## Integration examples');
    const nameIndex = markdown.indexOf('### Hidden label without accessible name');
    const antiIndex = markdown.indexOf('#### ❌ Anti-pattern');
    const recommendedIndex = markdown.indexOf('#### ✅ Recommended');

    expect(headingIndex).toBeGreaterThanOrEqual(0);
    expect(nameIndex).toBeGreaterThan(headingIndex);
    expect(antiIndex).toBeGreaterThan(nameIndex);
    expect(recommendedIndex).toBeGreaterThan(antiIndex);
  });

  it.each([
    ['vanilla-js', 'html'],
    ['angular', 'html'],
    ['react', 'tsx'],
    ['vue', 'html'],
  ] as const)('uses the %s fence language for %s', (framework, fence) => {
    const markdown = renderA11yIntegrationExamples([hiddenLabel], framework);
    expect(markdown).toContain(`\`\`\`${fence}`);
  });

  it('writes the snippets of the selected framework verbatim', () => {
    for (const framework of FRAMEWORKS) {
      const markdown = renderA11yIntegrationExamples([hiddenLabel], framework);
      expect(markdown).toContain(hiddenLabel.antiPattern[framework]);
      expect(markdown).toContain(hiddenLabel.recommended[framework]);
    }
  });
});
