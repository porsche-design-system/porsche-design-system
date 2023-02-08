import type { HeadlineVariantDeprecated } from './headline-utils';
import { getHeadlineTagType, isHeadlineVariantType } from './headline-utils';
import * as headingUtils from '../heading/heading-utils';
import * as headlineUtils from './headline-utils';

describe('isHeadlineVariantType()', () => {
  it.each<[HeadlineVariantDeprecated, boolean]>([
    ['large-title', true],
    ['headline-1', true],
    ['heading-1', false],
    ['inherit', false],
    ['small', false],
  ])('should for variant: %s return: %s', (variant, result) => {
    expect(isHeadlineVariantType(variant)).toBe(result);
  });
});

describe('getHeadlineTagName()', () => {
  it('should return div if slottedHeadingTag() is true', () => {
    const host = document.createElement('p-heading');
    host.innerHTML = '<h3>Some h3</h3>';
    jest.spyOn(headingUtils, 'hasSlottedHeadingTag').mockReturnValue(true);

    expect(getHeadlineTagType(host)).toBe('div');
  });

  it('should return tag value if hasSlottedHeadingTag() is false and tag is passed', () => {
    const host = document.createElement('p-heading');
    jest.spyOn(headingUtils, 'hasSlottedHeadingTag').mockReturnValue(false);

    expect(getHeadlineTagType(host, 'headline-1', 'h4')).toBe('h4');
  });

  it('should return h1 if hasSlottedHeadingTag() is false, tag is not passed and getHeadlineTagName() is false', () => {
    const host = document.createElement('p-heading');
    jest.spyOn(headingUtils, 'hasSlottedHeadingTag').mockReturnValue(false);
    jest.spyOn(headlineUtils, 'isHeadlineVariantType').mockReturnValue(false);

    expect(getHeadlineTagType(host, 'small')).toBe('h1');
  });

  it('should return h2 if hasSlottedHeadingTag() is false, tag is not passed and isHeadlineVariantType() is true', () => {
    const host = document.createElement('p-heading');
    jest.spyOn(headingUtils, 'hasSlottedHeadingTag').mockReturnValue(false);
    jest.spyOn(headlineUtils, 'isHeadlineVariantType').mockReturnValue(true);

    expect(getHeadlineTagType(host, 'headline-2')).toBe('h2');
  });
});
