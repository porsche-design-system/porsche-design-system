import type { HeadingSize } from './heading-utils';
import { getHeadingTagName, hasSlottedHeadingTag, isHeadingSizeType } from './heading-utils';
import * as headingUtils from './heading-utils';
import * as domUtils from '../../utils/dom/getHTMLElement';

describe('isHeadingSizeType()', () => {
  it.each<[HeadingSize | string, boolean]>([
    ['large-title', true],
    ['xx-large', true],
    ['headline-1', false],
    ['inherit', true],
  ])('should for size: %s return: %s', (size, result) => {
    expect(isHeadingSizeType(size)).toBe(result);
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
  it('should return div if hasSlottedHeadingTag() is true', () => {
    const host = document.createElement('p-heading');
    host.innerHTML = '<h3>Some h3</h3>';
    jest.spyOn(headingUtils, 'hasSlottedHeadingTag').mockReturnValue(true);

    expect(getHeadingTagName(host)).toBe('div');
  });

  it('should return tag value if hasSlottedHeadingTag() is false and tag is passed', () => {
    const host = document.createElement('p-heading');
    jest.spyOn(headingUtils, 'hasSlottedHeadingTag').mockReturnValue(false);

    expect(getHeadingTagName(host, 'xx-large', 'h4')).toBe('h4');
  });

  it('should return h1 if hasSlottedHeadingTag() is false, tag is not passed and isHeadingSizeType() is false', () => {
    const host = document.createElement('p-heading');
    jest.spyOn(headingUtils, 'hasSlottedHeadingTag').mockReturnValue(false);
    jest.spyOn(headingUtils, 'isHeadingSizeType').mockReturnValue(false);

    expect(getHeadingTagName(host, 'headline-1')).toBe('h1');
  });

  it('should return h2 if hasSlottedHeadingTag() is false, tag is not passed and isHeadingSizeType() is true', () => {
    const host = document.createElement('p-heading');
    jest.spyOn(headingUtils, 'hasSlottedHeadingTag').mockReturnValue(false);
    jest.spyOn(headingUtils, 'isHeadingSizeType').mockReturnValue(true);

    expect(getHeadingTagName(host, 'x-large')).toBe('h2');
  });
});
