import * as colorsUtils from '../../styles/colors';
import * as tagSharedUtils from './tag-shared-utils';
import * as tagUtils from './tag-utils';
import { getColors, getComponentCss } from './tag-styles';
import { getThemedColors } from '../../styles';
import type { Theme } from '../../types';
import type { TagColor, TagColorDeprecated } from './tag-utils';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';

describe('getColors()', () => {
  it('should for tagColor: background-surface not call getInvertedThemedColorsSpy(), but call getThemedBackgroundColor() and getThemedBackgroundHoverColor() with correct parameters', () => {
    const getInvertedThemedColorsSpy = jest.spyOn(colorsUtils, 'getInvertedThemedColors');
    const getThemedBackgroundColorSpy = jest.spyOn(tagSharedUtils, 'getThemedBackgroundColor');
    const getThemedBackgroundHoverColorSpy = jest.spyOn(tagUtils, 'getThemedBackgroundHoverColor');

    const themedColors = getThemedColors('light');
    getColors(themedColors, 'background-surface', 'light');

    expect(getInvertedThemedColorsSpy).not.toBeCalled();
    expect(getThemedBackgroundColorSpy).toBeCalledWith('background-surface', themedColors);
    expect(getThemedBackgroundHoverColorSpy).toBeCalledWith('background-surface', themedColors, 'light');
  });

  it('should for tagColor: primary call getInvertedThemedColorsSpy(), getThemedBackgroundColor() and getThemedBackgroundHoverColor() with correct parameters', () => {
    const getInvertedThemedColorsSpy = jest.spyOn(colorsUtils, 'getInvertedThemedColors');
    const getThemedBackgroundColorSpy = jest.spyOn(tagSharedUtils, 'getThemedBackgroundColor');
    const getThemedBackgroundHoverColorSpy = jest.spyOn(tagUtils, 'getThemedBackgroundHoverColor');

    const themedColors = getThemedColors('light');
    getColors(themedColors, 'primary', 'light');

    expect(getInvertedThemedColorsSpy).toBeCalledWith('light');
    expect(getThemedBackgroundColorSpy).toBeCalledWith('primary', themedColors);
    expect(getThemedBackgroundHoverColorSpy).toBeCalledWith('primary', themedColors, 'light');
  });

  it.each<[Exclude<TagColor, TagColorDeprecated>, Theme]>([
    ['primary', 'light'],
    ['background-base', 'light'],
    ['primary', 'dark'],
    ['background-base', 'dark'],
  ])('should return correct colors for tagColor: %s and theme: %s', (tagColor, theme) => {
    const themedColors = getThemedColors(theme);
    expect(getColors(themedColors, tagColor, theme)).toMatchSnapshot();
  });
});

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['background-base', true, 'light'],
    ['background-base', false, 'light'],
    ['primary', true, 'light'],
    ['notification-success-soft', true, 'light'],
    ['notification-warning-soft', true, 'light'],
    ['notification-error-soft', true, 'light'],
    ['notification-info-soft', true, 'light'],
    ['background-surface', true, 'light'],
    ['background-base', true, 'dark'],
    ['background-base', false, 'dark'],
    ['primary', true, 'dark'],
    ['notification-success-soft', true, 'dark'],
    ['notification-warning-soft', true, 'dark'],
    ['notification-error-soft', true, 'dark'],
    ['notification-info-soft', true, 'dark'],
    ['background-surface', true, 'dark'],
  ])('should return correct css for color: %s, isFocusable: %s and theme: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
