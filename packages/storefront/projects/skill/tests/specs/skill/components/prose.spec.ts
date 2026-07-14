import { beforeAll, describe, expect, it } from 'vitest';
import { type ComponentProseSource, renderComponentProse } from '@skill/components/prose';
import { compileComponentDocsMeta } from '../../../data/skill/componentProseFixtures';

describe('renderComponentProse', () => {
  let proseMap: Record<string, ComponentProseSource>;

  beforeAll(async () => {
    proseMap = await compileComponentDocsMeta();
  });

  it('emits a single tag H1 followed by the introduction, usage and accessibility sections', () => {
    const { markdown } = renderComponentProse('p-button', proseMap['p-button']);

    expect(markdown.match(/^# /gm)).toHaveLength(1);
    expect(markdown).toMatch(/^# p-button\n/);
    expect(markdown).toContain('The `p-button` component is essential');
    expect(markdown).toContain('## Usage');
    expect(markdown).toContain('## Accessibility support');
    // The redundant `# Button` H1 from the usage/accessibility pages is stripped.
    expect(markdown).not.toContain('# Button');
    expect(markdown).not.toContain('<');
  });

  it('renders the notes section when present', () => {
    const { markdown } = renderComponentProse('p-button', proseMap['p-button']);

    expect(markdown).toContain('## Notes');
    expect(markdown).toContain('### Form attribute');
    expect(markdown).toContain('Use the `form` attribute');
  });

  it('omits the notes section when a component has none', () => {
    const { markdown } = renderComponentProse('p-accordion', proseMap['p-accordion']);

    expect(markdown).not.toContain('## Notes');
  });

  it('throws on degraded prose instead of emitting it, naming the source section', () => {
    expect(() => renderComponentProse('p-degraded', proseMap['p-degraded'])).toThrow(
      /rendered to nothing meaningful for p-degraded › introduction/
    );
  });

  it('snapshots the full prose body for a representative component', () => {
    expect(renderComponentProse('p-button', proseMap['p-button']).markdown).toMatchSnapshot();
  });
});
