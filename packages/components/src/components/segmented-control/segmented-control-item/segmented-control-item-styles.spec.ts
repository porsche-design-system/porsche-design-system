import { getComponentCss } from './segmented-control-item-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, true, true, 'light'],
    [true, false, true, true, 'light'],
    [true, true, true, true, 'light'],
    [false, true, true, true, 'light'],
    [false, false, false, true, 'light'],
    [false, false, false, true, 'dark'],
    [false, false, true, false, 'light'],
    [true, false, true, false, 'light'],
    [true, true, true, false, 'light'],
    [false, true, true, false, 'light'],
    [false, false, false, false, 'light'],
    [false, false, false, false, 'dark'],
  ])(
    'should return correct css for isDisabled: %s, isSelected: %s, hasIcon: %s, hasSlottedContent: %s and theme: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
