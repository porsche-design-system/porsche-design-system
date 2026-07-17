import { describe, expect, it } from 'vitest';
import { renderComponentProse } from '@skill/components/prose';
import { componentDocsMeta as proseMap } from '../../../data/skill/componentProseFixtures';

describe('renderComponentProse', () => {
  it('omits the notes section when a component has none', () => {
    const { markdown } = renderComponentProse('p-accordion', proseMap['p-accordion']);

    expect(markdown).not.toContain('## Notes');
  });

  it('omits unresolved accessibility integration examples', () => {
    const { markdown } = renderComponentProse('p-accordion', proseMap['p-accordion']);

    expect(markdown).not.toContain('## Integration examples');
    expect(markdown).toContain('Each panel must have a meaningful, unique label.');
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
