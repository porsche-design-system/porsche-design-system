import { getDirectAndOnlyChildOfKindHTMLElementOrThrow } from './getDirectAndOnlyChildOfKindHTMLElementOrThrow';
import * as getDirectChildHTMLElementsUtils from '../dom/getDirectChildHTMLElements';

it('should call getDirectChildHTMLElements() with correct parameters', () => {
  const spy = jest
    .spyOn(getDirectChildHTMLElementsUtils, 'getDirectChildHTMLElements')
    .mockReturnValue([document.createElement('button')]);
  const parent = document.createElement('div');
  const selector = 'a,button';

  getDirectAndOnlyChildOfKindHTMLElementOrThrow(parent, selector);

  expect(spy).toBeCalledWith(parent, selector);
});

it('should return first result of getDirectChildHTMLElements()', () => {
  const parent = document.createElement('div');
  const child = document.createElement('a');
  jest.spyOn(getDirectChildHTMLElementsUtils, 'getDirectChildHTMLElements').mockReturnValue([child]);

  expect(getDirectAndOnlyChildOfKindHTMLElementOrThrow(parent, 'a')).toBe(child);
});

const errorMessage = '"div has to contain a single direct child of: a"';

it('should throw error if there is more than 1 child', () => {
  const parent = document.createElement('div');
  const child1 = document.createElement('a');
  const child2 = document.createElement('a');
  parent.append(child1, child2);

  expect(() => getDirectAndOnlyChildOfKindHTMLElementOrThrow(parent, 'a')).toThrowErrorMatchingInlineSnapshot(
    errorMessage
  );
});

it('should throw error if there is no child', () => {
  const parent = document.createElement('div');

  expect(() => getDirectAndOnlyChildOfKindHTMLElementOrThrow(parent, 'a')).toThrowErrorMatchingInlineSnapshot(
    errorMessage
  );
});

it('should throw error if there is a nested child', () => {
  const parent = document.createElement('div');
  const child = document.createElement('span');
  const nestedChild = document.createElement('a');
  child.append(nestedChild);
  parent.append(child);

  expect(() => getDirectAndOnlyChildOfKindHTMLElementOrThrow(parent, 'a')).toThrowErrorMatchingInlineSnapshot(
    errorMessage
  );
});
