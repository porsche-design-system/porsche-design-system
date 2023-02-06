import { getButtonStyles, getComponentCss, getFilterStyles, getListStyles } from './select-wrapper-dropdown-styles';
import { getCss } from '../../../utils';

describe('getButtonStyles()', () => {
  it.each<Parameters<typeof getButtonStyles>>([
    [true, 'none', 'light'],
    [true, 'success', 'light'],
    [true, 'error', 'light'],
    [true, 'none', 'dark'],
    [true, 'success', 'dark'],
    [true, 'error', 'dark'],
    [false, 'none', 'light'],
    [false, 'success', 'light'],
    [false, 'error', 'light'],
    [false, 'none', 'dark'],
    [false, 'success', 'dark'],
    [false, 'error', 'dark'],
  ])('should return correct css for isOpen: %s, state: %s and theme: %s', (isOpen, state, theme) => {
    expect(getCss(getButtonStyles(isOpen, state, theme))).toMatchSnapshot();
  });
});

describe('getFilterStyles()', () => {
  it.each<Parameters<typeof getFilterStyles>>([
    [true, 'none', true, 'light'],
    [true, 'none', true, 'dark'],
    [true, 'none', false, 'light'],
    [true, 'none', false, 'dark'],
    [true, 'success', true, 'light'],
    [true, 'success', true, 'dark'],
    [true, 'success', false, 'light'],
    [true, 'success', false, 'dark'],
    [true, 'error', true, 'light'],
    [true, 'error', true, 'dark'],
    [true, 'error', false, 'light'],
    [true, 'error', false, 'dark'],
    [false, 'none', true, 'light'],
    [false, 'none', true, 'dark'],
    [false, 'none', false, 'light'],
    [false, 'none', false, 'dark'],
    [false, 'success', true, 'light'],
    [false, 'success', true, 'dark'],
    [false, 'success', false, 'light'],
    [false, 'success', false, 'dark'],
    [false, 'error', true, 'light'],
    [false, 'error', true, 'dark'],
    [false, 'error', false, 'light'],
    [false, 'error', false, 'dark'],
  ])(
    'should return correct css for isOpen: %s,  state: %s, disabled: %s and theme: %s',
    (isOpen, state, disabled, theme) => {
      expect(getCss(getFilterStyles(isOpen, state, disabled, theme))).toMatchSnapshot();
    }
  );
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
    ['down', true, 'none', false, false, 'light'],
    ['down', false, 'none', false, false, 'light'],
    ['down', true, 'none', false, true, 'light'],
    ['down', false, 'none', false, true, 'light'],
    ['up', true, 'none', false, false, 'light'],
    ['up', false, 'none', false, false, 'light'],
    ['up', true, 'none', false, true, 'light'],
    ['up', false, 'none', false, true, 'light'],
    ['down', true, 'none', true, false, 'light'],
    ['down', false, 'none', true, false, 'light'],
    ['down', true, 'none', true, true, 'light'],
    ['down', false, 'none', true, true, 'light'],
    ['up', true, 'none', true, false, 'light'],
    ['up', false, 'none', true, false, 'light'],
    ['up', true, 'none', true, true, 'light'],
    ['up', false, 'none', true, true, 'light'],
  ])(
    'should return correct css for direction: %s, isOpen: %s, state: %s, disabled: %s, filter: %s and theme: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
