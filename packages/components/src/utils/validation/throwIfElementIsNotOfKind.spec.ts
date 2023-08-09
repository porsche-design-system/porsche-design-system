import * as getPrefixedTagNamesUtils from '../tag-name';
import { getPrefixedTagNames } from '../tag-name';
import { throwIfElementIsNotOfKind } from './throwIfElementIsNotOfKind';

const host = document.createElement('div');
const link = document.createElement('p-link');

it('should call getPrefixedTagNames() with correct parameters', () => {
  const spy = jest.spyOn(getPrefixedTagNamesUtils, 'getPrefixedTagNames');
  throwIfElementIsNotOfKind(host, link, 'p-link');

  expect(spy).toBeCalledWith(host);
});

it('should call getTagName() with correct parameters', () => {
  const spy = jest.spyOn(getPrefixedTagNamesUtils, 'getTagName');
  throwIfElementIsNotOfKind(host, link, 'p-link');

  expect(spy).toBeCalledWith(link);
});

it('should throw error if return value of getPrefixedTagNames() !== getTagName()', () => {
  const prefixedTagNameMock = { ...getPrefixedTagNames(host), pLink: 'p-link' };
  jest.spyOn(getPrefixedTagNamesUtils, 'getPrefixedTagNames').mockReturnValue(prefixedTagNameMock);
  const slot = document.createElement('a');

  expect(() => throwIfElementIsNotOfKind(host, slot, 'p-link')).toThrowErrorMatchingInlineSnapshot(
    `"[Porsche Design System] child a of div has to be a p-link."`
  );
});

it('should not throw error if slot is of kind', () => {
  expect(() => throwIfElementIsNotOfKind(host, link, 'p-link')).not.toThrow();
});

it('should not throw error if prefixed slot is of kind', () => {
  const prefixedHost = document.createElement('prefixed-p-link-tile-model-signature');
  const prefixedLink = document.createElement('prefixed-p-link');
  expect(() => throwIfElementIsNotOfKind(prefixedHost, prefixedLink, 'p-link')).not.toThrow();
});
