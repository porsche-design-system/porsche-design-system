import type { HeadingVariant } from './heading-utils';
import { getHeadingTagName, hasSlottedHeadingTag, isHeadingVariantType } from './heading-utils';
import * as headingUtils from './heading-utils';
import * as domUtils from '../../utils/dom/getHTMLElement';

describe('isHeadingVariantType()', () => {
  it.each<[HeadingVariant, boolean]>([
    ['large-title', true],
    ['heading-1', true],
    ['headline-1', false],
    ['inherit', false],
    ['small', false],
  ])('should for variant: %s return: %s', (variant, result) => {
    expect(isHeadingVariantType(variant)).toBe(result);
  });
});

describe('hasSlottedHeadingTag()', () => {
  it('should call getHTMLElement() with correct parameter', () => {
    const host = document.createElement('p-heading');
    const spy = jest.spyOn(domUtils, 'getHTMLElement');

    hasSlottedHeadingTag(host);
    expect(spy).toBeCalledWith(host, ':first-child');
  });

  it('should return true if host has slotted heading tag', () => {
    const host = document.createElement('p-heading');
    host.innerHTML = '<h2>Some h2</h2>';

    expect(hasSlottedHeadingTag(host)).toBeTruthy();
  });

  it('should return false if host has no slotted heading', () => {
    const host = document.createElement('p-heading');
    host.innerHTML = '<div>Some div</div>';

    expect(hasSlottedHeadingTag(host)).toBeFalsy();
  });
});

describe('getHeadingTagName()', () => {
  it('should return div if slottedHeadingTag() is true', () => {
    const host = document.createElement('p-heading');
    host.innerHTML = '<h3>Some h3</h3>';
    jest.spyOn(headingUtils, 'hasSlottedHeadingTag').mockReturnValue(true);

    expect(getHeadingTagName(host)).toBe('div');
  });

  it('should return tag value if hasSlottedHeadingTag() is false and tag is passed', () => {
    const host = document.createElement('p-heading');
    jest.spyOn(headingUtils, 'hasSlottedHeadingTag').mockReturnValue(false);

    expect(getHeadingTagName(host, 'heading-1', 'h4')).toBe('h4');
  });

  it('should return h1 if hasSlottedHeadingTag() is false, tag is not passed and isHeadingVariantType() is false', () => {
    const host = document.createElement('p-heading');
    jest.spyOn(headingUtils, 'hasSlottedHeadingTag').mockReturnValue(false);
    jest.spyOn(headingUtils, 'isHeadingVariantType').mockReturnValue(false);

    expect(getHeadingTagName(host, 'small')).toBe('h1');
  });

  it('should return h2 if hasSlottedHeadingTag() is false, tag is not passed and isHeadingVariantType() is true', () => {
    const host = document.createElement('p-heading');
    jest.spyOn(headingUtils, 'hasSlottedHeadingTag').mockReturnValue(false);
    jest.spyOn(headingUtils, 'isHeadingVariantType').mockReturnValue(true);

    expect(getHeadingTagName(host, 'heading-2')).toBe('h2');
  });
});
