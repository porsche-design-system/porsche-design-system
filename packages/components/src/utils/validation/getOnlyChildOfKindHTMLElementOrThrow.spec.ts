import { getOnlyChildOfKindHTMLElementOrThrow } from './getOnlyChildOfKindHTMLElementOrThrow';
import * as getDirectChildHTMLElementsUtils from '../dom/getDirectChildHTMLElements';

it('should call getDirectChildHTMLElements() with correct parameters and return its first result', () => {
  const parent = document.createElement('div');
  const child1 = document.createElement('a');
  const child2 = document.createElement('span');
  parent.append(child1, child2);

  const spy = jest.spyOn(getDirectChildHTMLElementsUtils, 'getDirectChildHTMLElements').mockReturnValue([child1]);
  const selector = 'a,button';

  const result = getOnlyChildOfKindHTMLElementOrThrow(parent, selector);
  expect(result).toBe(child1);
  expect(spy).toBeCalledWith(parent, selector);
});

const errorMessage = '"div has to contain a single direct child of: a"';

it('should throw error if there is more than 1 child of same kind', () => {
  const parent = document.createElement('div');
  const child1 = document.createElement('a');
  const child2 = document.createElement('a');
  parent.append(child1, child2);

  expect(() => getOnlyChildOfKindHTMLElementOrThrow(parent, 'a')).toThrowErrorMatchingInlineSnapshot(errorMessage);
});

it('should not throw error if there is exactly 1 child of kind', () => {
  const parent = document.createElement('div');
  const child1 = document.createElement('a');
  const child2 = document.createElement('span');
  parent.append(child1, child2);

  expect(() => getOnlyChildOfKindHTMLElementOrThrow(parent, 'a')).not.toThrow();
});

it('should throw error if there is no child', () => {
  const parent = document.createElement('div');

  expect(() => getOnlyChildOfKindHTMLElementOrThrow(parent, 'a')).toThrowErrorMatchingInlineSnapshot(errorMessage);
});

it('should throw error if there is only a nested child', () => {
  const parent = document.createElement('div');
  const child = document.createElement('div');
  const nestedChild = document.createElement('a');
  child.append(nestedChild);
  parent.append(child);

  // TODO: workaround until jsdom actually returns null for this case
  // https://github.com/jsdom/jsdom/issues/2998
  jest.spyOn(parent, 'querySelectorAll').mockReturnValue(document.createDocumentFragment().querySelectorAll('*'));

  expect(() => getOnlyChildOfKindHTMLElementOrThrow(parent, 'a')).toThrowErrorMatchingInlineSnapshot(errorMessage);
});
