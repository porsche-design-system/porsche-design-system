import {
  getSlottedPLinksOrThrow,
  setRequiredPropsOfSlottedLinks,
  throwIfSlotIsNotPLink,
} from './link-tile-model-signature-utils';
import * as getPrefixedTagNamesUtils from '../../utils/tag-name';
import * as getNamedSlotOrThrowUtils from '../../utils/validation/getNamedSlotOrThrow';
import * as linkTileModelSignatureUtils from './link-tile-model-signature-utils';

describe('setRequiredPropsOfSlottedLinks()', () => {
  it('should set correct theme and variant on passed links', () => {
    const primaryLink: HTMLPLinkElement = document.createElement('p-link');
    const secondaryLink: HTMLPLinkElement = document.createElement('p-link');
    primaryLink.slot = 'primary';
    secondaryLink.slot = 'secondary';

    setRequiredPropsOfSlottedLinks([primaryLink, secondaryLink]);

    expect(primaryLink.theme).toBe('dark');
    expect(secondaryLink.theme).toBe('dark');
    expect(primaryLink.variant).toBe('primary');
    expect(secondaryLink.variant).toBe('secondary');
  });
});

describe('throwIfSlotIsNotPLink()', () => {
  const host = document.createElement('div');
  const link = document.createElement('p-link');

  it('should call getPrefixedTagNames() with correct parameters', () => {
    const spy = jest.spyOn(getPrefixedTagNamesUtils, 'getPrefixedTagNames');

    throwIfSlotIsNotPLink(host, link, 'primary');

    expect(spy).toBeCalledWith(host);
  });

  it('should call getPrefixedTagNames() with correct parameters', () => {
    const spy = jest.spyOn(getPrefixedTagNamesUtils, 'getTagName');

    throwIfSlotIsNotPLink(host, link, 'primary');

    expect(spy).toBeCalledWith(link);
  });

  it('should throw error if slot is not "p-link"', () => {
    const slot = document.createElement('a');

    expect(() => throwIfSlotIsNotPLink(host, slot, 'primary')).toThrow();
  });

  it('should not throw error if return value of getTagName === getPrefixedTagNames().pLink', () => {
    expect(() => throwIfSlotIsNotPLink(host, link, 'primary')).not.toThrow();
  });
});

describe('getSlottedPLinksOrThrow()', () => {
  it('should call getNamedSlotOrThrow() with correct parameters', () => {
    jest.spyOn(linkTileModelSignatureUtils, 'throwIfSlotIsNotPLink').mockImplementation(jest.fn());

    const spy = jest.spyOn(getNamedSlotOrThrowUtils, 'getNamedSlotOrThrow').mockImplementation(jest.fn());
    const host = document.createElement('div');

    getSlottedPLinksOrThrow(host);

    expect(spy).toHaveBeenNthCalledWith(1, host, 'primary');
    expect(spy).toHaveBeenNthCalledWith(2, host, 'secondary');
  });

  it('should call throwIfSlotIsNotPLink() with correct parameters', () => {
    const namedSlotMock = document.createElement('div');
    jest.spyOn(getNamedSlotOrThrowUtils, 'getNamedSlotOrThrow').mockReturnValue(namedSlotMock);

    const spy = jest.spyOn(linkTileModelSignatureUtils, 'throwIfSlotIsNotPLink').mockImplementation(jest.fn());
    const host = document.createElement('div');

    getSlottedPLinksOrThrow(host);

    expect(spy).toHaveBeenNthCalledWith(1, host, namedSlotMock, 'primary');
    expect(spy).toHaveBeenNthCalledWith(2, host, namedSlotMock, 'secondary');
  });

  it('should return "primary" and "secondary" slot', () => {
    const host = document.createElement('div');
    const primaryLink = document.createElement('p-link');
    primaryLink.slot = 'primary';
    const secondaryLink = document.createElement('p-link');
    secondaryLink.slot = 'secondary';

    host.appendChild(primaryLink);
    host.append(secondaryLink);

    expect(getSlottedPLinksOrThrow(host)).toEqual([primaryLink, secondaryLink]);
  });
});
