import { getComponentCss } from './table-head-cell-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [undefined, undefined, false, false, 'light'],
    [undefined, undefined, true, false, 'light'],
    [false, 'asc', false, false, 'light'],
    [true, 'asc', false, false, 'light'],
    [false, 'desc', false, false, 'dark'],
    [true, 'desc', false, false, 'dark'],
    [true, 'desc', false, true, 'dark'],
  ])(
    'should return correct css for active: %s, direction: %s, hideLabel: %s, multiline: %s and theme: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
