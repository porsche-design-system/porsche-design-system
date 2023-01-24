import { getButtonStyles, getComponentCss, getFilterStyles, getListStyles } from './select-wrapper-dropdown-styles';
import { getCss } from '../../../utils';

describe('getButtonStyles()', () => {
  it.each<Parameters<typeof getButtonStyles>>([
    [true, 'light'],
    [true, 'dark'],
    [false, 'light'],
    [false, 'dark'],
  ])('should return correct css for isOpen: %s and theme: %s', (isOpen, theme) => {
    expect(getCss(getButtonStyles(isOpen, theme))).toMatchSnapshot();
  });
});

describe('getFilterStyles()', () => {
  it.each<Parameters<typeof getFilterStyles>>([
    [true, true, 'light'],
    [true, true, 'dark'],
    [true, false, 'light'],
    [true, false, 'dark'],
    [false, true, 'light'],
    [false, true, 'dark'],
    [false, false, 'light'],
    [false, false, 'dark'],
  ])('should return correct css for isOpen: %s, disabled: %s and theme: %s', (isOpen, disabled, theme) => {
    expect(getCss(getFilterStyles(isOpen, disabled, theme))).toMatchSnapshot();
  });
});

describe('getListStyles()', () => {
  it.each<Parameters<typeof getListStyles>>([
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
  it.each<Parameters<typeof getComponentCss>>([
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
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
