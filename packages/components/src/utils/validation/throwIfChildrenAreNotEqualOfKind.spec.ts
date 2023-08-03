import { throwIfChildrenAreNotEqualOfKind } from './throwIfChildrenAreNotEqualOfKind';

it('should throw correct error message when children are not of equal HTMLElements', () => {
  const parent = document.createElement('p-tabs-bar');
  const child1 = document.createElement('a');
  const child2 = document.createElement('button');
  parent.append(child1, child2);

  expect(() => throwIfChildrenAreNotEqualOfKind(parent, [child1, child2])).toThrow(
    '[Porsche Design System] child HTMLElements of p-tabs-bar should not be mixed. Use only the same kind of HTMLElement.'
  );
});

it('should not throw error when children are of equal HTMLElements', () => {
  const parent = document.createElement('p-tabs-bar');
  const child1 = document.createElement('a');
  const child2 = document.createElement('a');

  expect(() => throwIfChildrenAreNotEqualOfKind(parent, [child1, child2])).not.toThrow();
});
