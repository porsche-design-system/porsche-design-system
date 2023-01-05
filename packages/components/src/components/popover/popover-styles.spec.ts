import { getComponentCss, getSlottedCss } from './popover-styles';
import { POPOVER_DIRECTIONS, PopoverDirection } from './popover-utils';

xdescribe('getComponentCss()', () => {
  it.each<PopoverDirection>(POPOVER_DIRECTIONS)('should return correct css for direction: %s', (direction) => {
    expect(getComponentCss(direction)).toMatchSnapshot();
  });
});

xdescribe('getSlottedCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-popover');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-popover');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });
});
