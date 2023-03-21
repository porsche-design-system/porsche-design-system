import * as getPrefixedTagNamesUtils from '../tag-name';
import { throwIfElementIsNotOfKind } from './throwIfElementIsNotOfKind';

const host = document.createElement('div');
const link = document.createElement('p-link') as unknown as HTMLSlotElement;

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

it('should throw error if slot is not of kind', () => {
  const slot = document.createElement('a') as unknown as HTMLSlotElement;

  expect(() => throwIfElementIsNotOfKind(host, slot, 'p-button')).toThrow();
});

it('should not throw error if slot is of kind', () => {
  expect(() => throwIfElementIsNotOfKind(host, link, 'p-link')).not.toThrow();
});

it('should not throw error if prefixed slot is of kind', () => {
  const prefixedHost = document.createElement('prefixed-p-link-tile-model-signature');
  const prefixedLink = document.createElement('prefixed-p-link') as unknown as HTMLSlotElement;
  expect(() => throwIfElementIsNotOfKind(prefixedHost, prefixedLink, 'p-link')).not.toThrow();
});
