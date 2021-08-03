import { getComponentCss } from './select-wrapper-dropdown-styles';
import { DropdownDirectionInternal } from './select-wrapper-utils';
import { Theme } from '../../../types';

describe('getComponentCss()', () => {
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
    expect(getComponentCss(direction, isOpen, theme)).toMatchSnapshot();
  });
});
