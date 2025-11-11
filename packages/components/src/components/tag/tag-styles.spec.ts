import { vi } from 'vitest';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getThemedColors } from '../../styles';
import * as colorsUtils from '../../styles/colors';
import type { Theme } from '../../types';
import * as tagSharedUtils from './tag-shared-utils';
import { getColors, getComponentCss } from './tag-styles';
import type { TagColor, TagColorDeprecated } from './tag-utils';
import * as tagUtils from './tag-utils';

describe('getColors()', () => {
  it('should for tagColor: background-surface not call getInvertedThemedColorsSpy(), but call getThemedBackgroundColor() and getThemedBackgroundHoverColor() with correct parameters', () => {
    const getInvertedThemedColorsSpy = vi.spyOn(colorsUtils, 'getInvertedThemedColors');
    const getThemedBackgroundColorSpy = vi.spyOn(tagSharedUtils, 'getThemedBackgroundColor');
    const getThemedBackgroundHoverColorSpy = vi.spyOn(tagUtils, 'getThemedBackgroundHoverColor');

    const themedColors = getThemedColors('light');
    getColors('background-surface', 'light');

    expect(getInvertedThemedColorsSpy).not.toHaveBeenCalled();
    expect(getThemedBackgroundColorSpy).toHaveBeenCalledWith('background-surface', themedColors);
    expect(getThemedBackgroundHoverColorSpy).toHaveBeenCalledWith('background-surface', themedColors, 'light');
  });

  it('should for tagColor: primary call getInvertedThemedColorsSpy(), getThemedBackgroundColor() and getThemedBackgroundHoverColor() with correct parameters', () => {
    const getInvertedThemedColorsSpy = vi.spyOn(colorsUtils, 'getInvertedThemedColors');
    const getThemedBackgroundColorSpy = vi.spyOn(tagSharedUtils, 'getThemedBackgroundColor');
    const getThemedBackgroundHoverColorSpy = vi.spyOn(tagUtils, 'getThemedBackgroundHoverColor');

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
    ['background-base', false, true, true, 'light'],
    ['background-base', false, false, true, 'light'],
    ['background-base', true, false, true, 'light'],
    ['background-base', true, false, false, 'light'],
    ['primary', false, true, true, 'light'],
    ['notification-success-soft', false, true, true, 'light'],
    ['notification-warning-soft', false, true, true, 'light'],
    ['notification-error-soft', false, true, true, 'light'],
    ['notification-info-soft', false, true, true, 'light'],
    ['background-surface', false, true, true, 'light'],
    ['background-frosted', false, true, true, 'light'],
    ['background-base', false, true, true, 'dark'],
    ['background-base', false, false, true, 'dark'],
    ['primary', false, true, true, 'dark'],
    ['notification-success-soft', false, true, true, 'dark'],
    ['notification-warning-soft', false, true, true, 'dark'],
    ['notification-error-soft', false, true, true, 'dark'],
    ['notification-info-soft', false, true, true, 'dark'],
    ['background-surface', false, true, true, 'dark'],
    ['background-frosted', false, true, true, 'dark'],
  ])('should return correct css for color: %s, compact: %s, isFocusable: %s, hasIcon: %s and theme: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
