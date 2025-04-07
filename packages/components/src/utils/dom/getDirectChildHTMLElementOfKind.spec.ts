import { getDirectChildHTMLElementOfKind } from './getDirectChildHTMLElementOfKind';

it('should return direct child elements of specific type', () => {
  const parent = document.createElement('p-drilldown');
  const selector = 'p-drilldown-item';
  const child1 = document.createElement('p-drilldown-item');
  const child2 = document.createElement('p-drilldown-item');
  const child3 = document.createElement('span');
  parent.append(child1, child2, child3);

  expect(getDirectChildHTMLElementOfKind(parent, selector)).toEqual([child1, child2]);
});

it('should return empty array if there is no child element', () => {
  const parent = document.createElement('p-drilldown');
  const selector = 'p-drilldown-item';

  expect(getDirectChildHTMLElementOfKind(parent, selector)).toEqual([]);
});

it('should return empty array for nested child elements of specific type', () => {
  const parent = document.createElement('p-drilldown');
  const selector = 'p-drilldown-item';
  const child = document.createElement('div');
  const nestedChild1 = document.createElement('p-drilldown-item');
  const nestedChild2 = document.createElement('p-drilldown-item');
  child.append(nestedChild1, nestedChild2);
  parent.append(child);

  expect(getDirectChildHTMLElementOfKind(parent, selector)).toEqual([]);
});
