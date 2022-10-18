import { getComponentCss, getSlottedCss } from './popover-styles';
import { POPOVER_DIRECTIONS, PopoverDirection } from './popover-utils';

describe('getComponentCss()', () => {
  it.each<PopoverDirection>(POPOVER_DIRECTIONS)('should return correct css for direction: %s', (direction) => {
    expect(getComponentCss(direction)).toMatchSnapshot();
  });
});

describe('getSlottedCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-popover');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-popover');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });
});
