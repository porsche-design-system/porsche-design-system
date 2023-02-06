import { getComponentCss } from './segmented-control-item-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, 'background-default', 'increase', undefined, 'light'],
    [true, false, 'background-default', 'increase', undefined, 'light'],
    [true, true, 'background-default', undefined, 'iconSource', 'light'],
    [false, true, 'background-default', undefined, 'iconSource', 'light'],
    [false, false, 'background-surface', 'question', undefined, 'light'],
    [false, false, 'background-default', 'lock', undefined, 'dark'],
    [false, false, 'background-surface', undefined, undefined, 'dark'],
  ])(
    'should return correct css for isDisabled: %s, isSelected: %s, bgColor: %s, icon: %s, iconSource: %s and theme: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
