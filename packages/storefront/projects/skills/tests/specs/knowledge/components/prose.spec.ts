import { renderComponentProse } from '@skills/knowledge/components/prose';
import { describe, expect, it } from 'vitest';
import { componentDocsMeta as proseMap } from '../../../data/knowledge/componentProseFixtures';

describe('renderComponentProse', () => {
  it('omits the notes section when a component has none', () => {
    const { markdown } = renderComponentProse('p-accordion', proseMap['p-accordion']);

    expect(markdown).not.toContain('## Notes');
  });

  it('links accessibility integration examples and returns their separate reference content', () => {
    const { markdown, accessibilityMarkdown } = renderComponentProse('p-accordion', proseMap['p-accordion']);

    expect(markdown).toContain('## Integration examples');
    expect(markdown).toContain('[accessibility integration examples](./accessibility.md)');
    expect(markdown).not.toContain('Accordion summary without semantic heading');
    expect(accessibilityMarkdown).toContain('# p-accordion accessibility integration examples');
    expect(accessibilityMarkdown).toContain('Accordion summary without semantic heading');
  });

  it('omits an all-pass accessibility test matrix', () => {
    const { markdown } = renderComponentProse('p-accordion', proseMap['p-accordion']);

    expect(markdown).not.toContain('AXE-Core');
  });

  it('throws on degraded prose instead of emitting it, naming the source section', () => {
    expect(() => renderComponentProse('p-degraded', proseMap['p-degraded'])).toThrow(
      /rendered to nothing meaningful for p-degraded › introduction/
    );
  });

  it('renders representative component prose', () => {
    expect(renderComponentProse('p-button', proseMap['p-button']).markdown).toMatchSnapshot();
  });
});
