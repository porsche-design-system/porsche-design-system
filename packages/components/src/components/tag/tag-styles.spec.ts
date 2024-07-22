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
    getColors('background-surface', 'light');

    expect(getInvertedThemedColorsSpy).not.toHaveBeenCalled();
    expect(getThemedBackgroundColorSpy).toHaveBeenCalledWith('background-surface', themedColors);
    expect(getThemedBackgroundHoverColorSpy).toHaveBeenCalledWith('background-surface', themedColors, 'light');
  });

  it('should for tagColor: primary call getInvertedThemedColorsSpy(), getThemedBackgroundColor() and getThemedBackgroundHoverColor() with correct parameters', () => {
    const getInvertedThemedColorsSpy = jest.spyOn(colorsUtils, 'getInvertedThemedColors');
    const getThemedBackgroundColorSpy = jest.spyOn(tagSharedUtils, 'getThemedBackgroundColor');
    const getThemedBackgroundHoverColorSpy = jest.spyOn(tagUtils, 'getThemedBackgroundHoverColor');

    const themedColors = getThemedColors('light');
    getColors('primary', 'light');

    expect(getInvertedThemedColorsSpy).toHaveBeenCalledWith('light');
    expect(getThemedBackgroundColorSpy).toHaveBeenCalledWith('primary', themedColors);
    expect(getThemedBackgroundHoverColorSpy).toHaveBeenCalledWith('primary', themedColors, 'light');
  });

  it.each<[Exclude<TagColor, TagColorDeprecated>, Theme]>([
    ['primary', 'light'],
    ['background-base', 'light'],
    ['primary', 'dark'],
    ['background-base', 'dark'],
  ])('should return correct colors for tagColor: %s and theme: %s', (tagColor, theme) => {
    expect(getColors(tagColor, theme)).toMatchSnapshot();
  });
});

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['background-base', true, true, 'light'],
    ['background-base', false, true, 'light'],
    ['primary', true, true, 'light'],
    ['notification-success-soft', true, true, 'light'],
    ['notification-warning-soft', true, true, 'light'],
    ['notification-error-soft', true, true, 'light'],
    ['notification-info-soft', true, true, 'light'],
    ['background-surface', true, true, 'light'],
    ['background-frosted', true, true, 'light'],
    ['background-base', true, true, 'dark'],
    ['background-base', false, true, 'dark'],
    ['primary', true, true, 'dark'],
    ['notification-success-soft', true, true, 'dark'],
    ['notification-warning-soft', true, true, 'dark'],
    ['notification-error-soft', true, true, 'dark'],
    ['notification-info-soft', true, true, 'dark'],
    ['background-surface', true, true, 'dark'],
    ['background-frosted', true, true, 'dark'],
  ])('should return correct css for color: %s, isFocusable: %s, hasIcon: %s and theme: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
