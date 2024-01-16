import { getComponentCss, getKeyframesMobile, KeyframesDirection } from './toast-styles';
import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';

describe('getKeyframesMobile()', () => {
  it.each<[KeyframesDirection, string]>([
    ['in', '--p-bottom-var'],
    ['out', '--p-bottom-var'],
  ])('should return correct JssStyle for direction: %s and bottomVar: %s', (direction, bottomVar) => {
    expect(getKeyframesMobile(direction, bottomVar)).toMatchSnapshot();
  });
});

describe('getComponentCss()', () => {
  it('should return correct css', () => {
    validateCssAndMatchSnapshot(getComponentCss());
  });
});
