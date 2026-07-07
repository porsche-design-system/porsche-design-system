import { getComponentCss, getKeyframesMobile, type KeyframesDirection } from './toast-styles';
import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';

describe('getKeyframesMobile()', () => {
  it.each<[KeyframesDirection, string]>([
    ['in', '--_p-toast-a'],
    ['out', '--_p-toast-a'],
  ])('should return correct JssStyle for direction: %s and bottomVar: %s', (direction, bottomVar) => {
    expect(getKeyframesMobile(direction, bottomVar)).toMatchSnapshot();
  });
});

describe('getComponentCss()', () => {
  it('should return correct css', async () => {
    await validateCssAndMatchSnapshot(getComponentCss());
  });
});
