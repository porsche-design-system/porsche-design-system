import { getButtonStyles, getComponentCss, getFilterStyles, getListStyles } from './select-wrapper-dropdown-styles';
import { getCss } from '../../../utils';

describe('getButtonStyles()', () => {
  it.each<Parameters<typeof getButtonStyles>>([
    ['down', true, 'none', 'light'],
    ['down', true, 'success', 'light'],
    ['down', true, 'error', 'light'],
    ['up', true, 'none', 'dark'],
    ['up', true, 'success', 'dark'],
    ['up', true, 'error', 'dark'],
    ['down', false, 'none', 'light'],
    ['down', false, 'success', 'light'],
    ['down', false, 'error', 'light'],
    ['up', false, 'none', 'dark'],
    ['up', false, 'success', 'dark'],
    ['up', false, 'error', 'dark'],
  ])(
    'should return correct css for direction: %s, isOpen: %s, state: %s and theme: %s',
    (direction, isOpen, state, theme) => {
      expect(getCss(getButtonStyles(direction, isOpen, state, theme))).toMatchSnapshot();
    }
  );
});

describe('getFilterStyles()', () => {
  it.each<Parameters<typeof getFilterStyles>>([
    ['down', true, 'none', true, 'light'],
    ['up', true, 'none', true, 'dark'],
    ['down', true, 'none', false, 'light'],
    ['up', true, 'none', false, 'dark'],
    ['down', true, 'success', true, 'light'],
    ['up', true, 'success', true, 'dark'],
    ['down', true, 'success', false, 'light'],
    ['up', true, 'success', false, 'dark'],
    ['down', true, 'error', true, 'light'],
    ['up', true, 'error', true, 'dark'],
    ['down', true, 'error', false, 'light'],
    ['up', true, 'error', false, 'dark'],
    ['down', false, 'none', true, 'light'],
    ['up', false, 'none', true, 'dark'],
    ['down', false, 'none', false, 'light'],
    ['up', false, 'none', false, 'dark'],
    ['down', false, 'success', true, 'light'],
    ['up', false, 'success', true, 'dark'],
    ['down', false, 'success', false, 'light'],
    ['up', false, 'success', false, 'dark'],
    ['down', false, 'error', true, 'light'],
    ['up', false, 'error', true, 'dark'],
    ['down', false, 'error', false, 'light'],
    ['up', false, 'error', false, 'dark'],
  ])(
    'should return correct css for direction: %s, isOpen: %s,  state: %s, disabled: %s and theme: %s',
    (direction, isOpen, state, disabled, theme) => {
      expect(getCss(getFilterStyles(direction, isOpen, state, disabled, theme))).toMatchSnapshot();
    }
  );
});

describe('getListStyles()', () => {
  it.each<Parameters<typeof getListStyles>>([
    ['down', 'light'],
    ['down', 'light'],
    ['down', 'dark'],
    ['down', 'dark'],
    ['up', 'light'],
    ['up', 'light'],
    ['up', 'dark'],
    ['up', 'dark'],
  ])('should return correct css for direction: %s, isOpen: %s and theme: %s', (direction, theme) => {
    expect(getCss(getListStyles(direction, theme))).toMatchSnapshot();
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
