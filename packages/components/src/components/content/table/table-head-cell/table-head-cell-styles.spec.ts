import { getComponentCss } from './table-head-cell-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [undefined, undefined, false],
    [undefined, undefined, true],
    [false, 'asc', false],
    [true, 'asc', false],
    [false, 'desc', false],
    [true, 'desc', false],
  ])('should return correct css for active: %s, direction: %s and hideLabel: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
