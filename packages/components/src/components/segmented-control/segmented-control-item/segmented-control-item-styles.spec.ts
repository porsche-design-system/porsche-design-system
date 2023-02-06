import { getComponentCss } from './segmented-control-item-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, 'background-default', true, 'light'],
    [true, false, 'background-default', true, 'light'],
    [true, true, 'background-default', true, 'light'],
    [false, true, 'background-default', true, 'light'],
    [false, false, 'background-surface', false, 'light'],
    [false, false, 'background-default', false, 'dark'],
    [false, false, 'background-surface', false, 'dark'],
  ])(
    'should return correct css for isDisabled: %s, isSelected: %s, bgColor: %s, icon: %s, iconSource: %s and theme: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
