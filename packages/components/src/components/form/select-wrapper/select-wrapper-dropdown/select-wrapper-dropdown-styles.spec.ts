import { getButtonStyles, getComponentCss, getFilterStyles, getListStyles } from './select-wrapper-dropdown-styles';
import type { DropdownDirectionInternal } from '../select-wrapper/select-wrapper-utils';
import type { FormState, Theme } from '../../../../types';

describe('getButtonStyles()', () => {
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
    expect(getButtonStyles(disabled, state, theme)).toMatchSnapshot();
  });
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
    expect(getFilterStyles(disabled, state, theme)).toMatchSnapshot();
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
    expect(getListStyles(direction, isOpen, theme)).toMatchSnapshot();
  });
});

describe('getComponentCss()', () => {
  it.each<[DropdownDirectionInternal, boolean, FormState, boolean, Theme]>([
    ['down', true, 'none', false, 'light'],
    ['down', false, 'none', false, 'light'],
    ['down', true, 'none', true, 'light'],
    ['down', false, 'none', true, 'light'],
    ['up', true, 'none', false, 'light'],
    ['up', false, 'none', false, 'light'],
    ['up', true, 'none', true, 'light'],
    ['up', false, 'none', true, 'light'],
  ])(
    'should return correct css for direction: %o, isOpen: %o and theme: %o',
    (direction, isOpen, state, filter, theme) => {
      expect(getComponentCss(direction, isOpen, state, filter, theme)).toMatchSnapshot();
    }
  );
});
