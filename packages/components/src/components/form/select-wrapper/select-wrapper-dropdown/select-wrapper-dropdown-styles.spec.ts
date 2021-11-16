import { getButtonStyles, getComponentCss, getFilterStyles, getListStyles } from './select-wrapper-dropdown-styles';
import type { DropdownDirectionInternal } from '../select-wrapper/select-wrapper-utils';
import type { FormState, Theme } from '../../../../types';
import { getCss } from '../../../../utils';

describe('getButtonStyles()', () => {
  it.each<[boolean, FormState, Theme]>([
    [true, 'none', 'light'],
    [false, 'none', 'dark'],
    [true, 'success', 'light'],
    [false, 'success', 'dark'],
    [true, 'error', 'light'],
    [false, 'error', 'dark'],
  ])('should return correct css for isOpen: %o, state: %o and theme: %o', (isOpen, state, theme) => {
    expect(getCss(getButtonStyles(isOpen, state, theme))).toMatchSnapshot();
  });
});

describe('getFilterStyles()', () => {
  it.each<[boolean, boolean, FormState, Theme]>([
    [true, false, 'none', 'light'],
    [false, false, 'none', 'dark'],
    [true, false, 'success', 'light'],
    [false, false, 'success', 'dark'],
    [true, false, 'error', 'light'],
    [false, false, 'error', 'dark'],
    [true, true, 'none', 'light'],
    [false, true, 'none', 'dark'],
    [true, true, 'success', 'light'],
    [false, true, 'success', 'dark'],
    [true, true, 'error', 'light'],
    [false, true, 'error', 'dark'],
  ])(
    'should return correct css for isOpen: %o, disabled: %o, state: %o and theme: %o',
    (isOpen, disabled, state, theme) => {
      expect(getCss(getFilterStyles(isOpen, disabled, state, theme))).toMatchSnapshot();
    }
  );
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
  ])('should return correct css for direction: %s, isOpen: %s and theme: %s', (direction, isOpen, theme) => {
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
    'should return correct css for direction: %s, isOpen: %s, disabled: %s, state: %s, filter: %s and theme: %s',
    (direction, isOpen, disabled, state, filter, theme) => {
      expect(getComponentCss(direction, isOpen, disabled, state, filter, theme)).toMatchSnapshot();
    }
  );
});
