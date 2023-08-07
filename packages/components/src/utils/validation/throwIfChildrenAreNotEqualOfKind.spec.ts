import { throwIfChildrenAreNotEqualOfKind } from './throwIfChildrenAreNotEqualOfKind';

it('should throw correct error message when children are not of equal HTMLElements', () => {
  const parent = document.createElement('p-tabs-bar');
  const child1 = document.createElement('a');
  const child2 = document.createElement('button');
  parent.append(child1, child2);

  expect(() => throwIfChildrenAreNotEqualOfKind(parent, ['a', 'button'])).toThrow(
    '[Porsche Design System] child HTMLElements of p-tabs-bar should not be mixed. Use only one of the following allowed tag type(s): [a,button].'
  );
});

it('should not throw error when children are of equal HTMLElements', () => {
  const parent = document.createElement('p-tabs-bar');
  const child1 = document.createElement('a');
  const child2 = document.createElement('a');
  parent.append(child1, child2);

  expect(() => throwIfChildrenAreNotEqualOfKind(parent, ['a', 'button'])).not.toThrow();
});
