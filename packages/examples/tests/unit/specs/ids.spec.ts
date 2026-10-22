import { TAG_NAMES } from '@porsche-design-system/shared';
import { getExampleIdError } from '../../../lib/ids';
import { exampleList } from '../../../src/catalogue';
import type { ExampleKind } from '../../../src/types';

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

  it('follow the rules of their kind (lib/ids.ts)', () => {
    expect(
      exampleList.flatMap(({ id, kind }) => {
        const error = getExampleIdError(id, kind);
        return error ? [`${kind}: ${id} ${error}`] : [];
      })
    ).toEqual([]);
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
