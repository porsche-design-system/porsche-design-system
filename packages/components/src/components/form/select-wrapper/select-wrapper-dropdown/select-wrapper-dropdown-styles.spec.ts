import { getButtonStyles, getComponentCss, getFilterStyles, getListStyles } from './select-wrapper-dropdown-styles';
import type { DropdownDirectionInternal } from '../select-wrapper/select-wrapper-utils';
import type { FormState, Theme } from '../../../../types';
import { getCss } from '../../../../utils';

describe('getButtonStyles()', () => {
  it.each<[boolean, FormState, Theme, boolean]>([
    [false, 'none', 'light', true],
    [false, 'none', 'dark', false],
    [false, 'success', 'light', true],
    [false, 'success', 'dark', false],
    [false, 'error', 'light', true],
    [false, 'error', 'dark', false],
    [true, 'none', 'light', true],
    [true, 'none', 'dark', false],
    [true, 'success', 'light', true],
    [true, 'success', 'dark', false],
    [true, 'error', 'light', true],
    [true, 'error', 'dark', false],
  ])(
    'should return correct css for disabled: %o, state: %o, theme: %o and isOpen: %o',
    (disabled, state, theme, isOpen) => {
      expect(getCss(getButtonStyles(disabled, state, theme, isOpen))).toMatchSnapshot();
    }
  );
});

describe('getFilterStyles()', () => {
  it.each<[boolean, FormState, Theme]>([
    [false, 'none', 'light'],
    [false, 'none', 'dark'],
    [false, 'success', 'light'],
    [false, 'success', 'dark'],
    [false, 'error', 'light'],
    [false, 'error', 'dark'],
    [true, 'none', 'light'],
    [true, 'none', 'dark'],
    [true, 'success', 'light'],
    [true, 'success', 'dark'],
    [true, 'error', 'light'],
    [true, 'error', 'dark'],
  ])('should return correct css for disabled: %o, state: %o and theme: %o', (disabled, state, theme) => {
    expect(getCss(getFilterStyles(disabled, state, theme))).toMatchSnapshot();
  });
});

describe('getListStyles()', () => {
  it.each<[DropdownDirectionInternal, boolean, Theme]>([
    ['down', true, 'light'],
    ['down', false, 'light'],
    ['down', true, 'dark'],
    ['down', false, 'dark'],
    ['up', true, 'light'],
    ['up', false, 'light'],
    ['up', true, 'dark'],
    ['up', false, 'dark'],
  ])('should return correct css for direction: %o, isOpen: %o and theme: %o', (direction, isOpen, theme) => {
    expect(getCss(getListStyles(direction, isOpen, theme))).toMatchSnapshot();
  });
});

describe('getComponentCss()', () => {
  it.each<[DropdownDirectionInternal, boolean, boolean, FormState, boolean, Theme]>([
    ['down', true, false, 'none', false, 'light'],
    ['down', false, false, 'none', false, 'light'],
    ['down', true, false, 'none', true, 'light'],
    ['down', false, false, 'none', true, 'light'],
    ['up', true, false, 'none', false, 'light'],
    ['up', false, false, 'none', false, 'light'],
    ['up', true, false, 'none', true, 'light'],
    ['up', false, false, 'none', true, 'light'],
    ['down', true, true, 'none', false, 'light'],
    ['down', false, true, 'none', false, 'light'],
    ['down', true, true, 'none', true, 'light'],
    ['down', false, true, 'none', true, 'light'],
    ['up', true, true, 'none', false, 'light'],
    ['up', false, true, 'none', false, 'light'],
    ['up', true, true, 'none', true, 'light'],
    ['up', false, true, 'none', true, 'light'],
  ])(
    'should return correct css for direction: %o, isOpen: %o and theme: %o',
    (direction, isOpen, disabled, state, filter, theme) => {
      expect(getComponentCss(direction, isOpen, disabled, state, filter, theme)).toMatchSnapshot();
    }
  );
});
