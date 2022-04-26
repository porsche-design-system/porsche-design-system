import { getComponentCss } from './table-head-cell-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [undefined, undefined, false, false],
    [undefined, undefined, true, false],
    [false, 'asc', false, false],
    [true, 'asc', false, false],
    [false, 'desc', false, false],
    [true, 'desc', false, false],
    [true, 'desc', false, true],
  ])('should return correct css for active: %s, direction: %s, hideLabel: %s and multiline: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
