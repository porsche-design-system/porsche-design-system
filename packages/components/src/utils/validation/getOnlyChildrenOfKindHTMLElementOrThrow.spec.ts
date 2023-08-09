import { getOnlyChildrenOfKindHTMLElementOrThrow } from './getOnlyChildrenOfKindHTMLElementOrThrow';
import * as getDirectChildHTMLElementsUtils from '../dom/getDirectChildHTMLElements';

it('should call getDirectChildHTMLElements() with correct parameters and return its first result', () => {
  const parent = document.createElement('div');
  const child1 = document.createElement('a');
  const child2 = document.createElement('span');
  parent.append(child1, child2);

  const spy = jest.spyOn(getDirectChildHTMLElementsUtils, 'getDirectChildHTMLElements').mockReturnValue([child1]);
  const selector = 'a,button';

  const result = getOnlyChildrenOfKindHTMLElementOrThrow(parent, selector);
  expect(result[0]).toBe(child1);
  expect(spy).toBeCalledWith(parent, selector);
});

it('should not throw error if there is exactly 1 child of kind', () => {
  const parent = document.createElement('div');
  const child1 = document.createElement('a');
  parent.append(child1);

  expect(() => getOnlyChildrenOfKindHTMLElementOrThrow(parent, 'a')).not.toThrow();
});

it('should not throw error if there are only children of kind', () => {
  const parent = document.createElement('div');
  const child1 = document.createElement('a');
  const child2 = document.createElement('a');
  parent.append(child1, child2);

  expect(() => getOnlyChildrenOfKindHTMLElementOrThrow(parent, 'a,button')).not.toThrow();
});

it('should throw error if there are children not of kind', () => {
  const parent = document.createElement('div');
  const child1 = document.createElement('button');
  const child2 = document.createElement('a');
  parent.append(child1, child2);

  expect(() => getOnlyChildrenOfKindHTMLElementOrThrow(parent, 'a,button')).toThrowErrorMatchingInlineSnapshot(
    '"[Porsche Design System] child HTMLElements of div are invalid. Expected all of: a or button."'
  );
});
