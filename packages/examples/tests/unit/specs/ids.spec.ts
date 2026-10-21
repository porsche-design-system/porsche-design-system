import { TAG_NAMES } from '@porsche-design-system/shared';
import { exampleList } from '../../../src/catalogue';
import type { ExampleKind } from '../../../src/types';

const EXAMPLE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)+$/;
const ACCESSIBILITY_ID = /^components\/[^/]+\/accessibility\/[^/]+$/;
const ids = exampleList.map(({ id }) => id);

describe('the ids of all projects', () => {
  it.each<ExampleKind>(['story', 'framework', 'accessibility', 'pattern', 'template'])(
    'include %s examples',
    (kind) => {
      expect(exampleList.some((example) => example.kind === kind)).toBe(true);
    }
  );

  it('are unique across the projects', () => {
    expect(ids.filter((id, index) => ids.indexOf(id) !== index)).toEqual([]);
  });

  it('are lowercase kebab-case segments joined by "/"', () => {
    expect(ids.filter((id) => !EXAMPLE_ID.test(id))).toEqual([]);
  });

  it('use "accessibility" for the accessibility examples only, as components/<component>/accessibility/<slug>', () => {
    const misplaced = exampleList.filter(
      ({ id, kind }) =>
        id.split('/').includes('accessibility') !== (kind === 'accessibility') ||
        (kind === 'accessibility' && !ACCESSIBILITY_ID.test(id))
    );
    expect(misplaced.map(({ id, kind }) => `${kind}: ${id}`)).toEqual([]);
  });

  it('use "default" as the last segment only, for a story or a framework example', () => {
    const misplaced = exampleList.filter(({ id, kind }) => {
      const segments = id.split('/');
      return (
        segments.slice(0, -1).includes('default') ||
        (segments.at(-1) === 'default' && kind !== 'story' && kind !== 'framework')
      );
    });
    expect(misplaced.map(({ id, kind }) => `${kind}: ${id}`)).toEqual([]);
  });
});

describe('the examples', () => {
  it('have a title', () => {
    expect(exampleList.filter(({ title }) => !title.trim()).map(({ id }) => id)).toEqual([]);
  });

  it('list PDS components only', () => {
    const unknown = exampleList.flatMap(({ id, components }) =>
      components
        .filter((component) => !(TAG_NAMES as readonly string[]).includes(component))
        .map((tag) => `${id}: ${tag}`)
    );
    expect(unknown).toEqual([]);
  });
});
