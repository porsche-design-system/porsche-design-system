import { getComponentCss } from './select-wrapper-dropdown-styles';
import type { DropdownDirectionInternal } from '../select-wrapper/select-wrapper-utils';
import type { Theme } from '../../../../types';

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
