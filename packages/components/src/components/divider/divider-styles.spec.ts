import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './divider-styles';
import { DIVIDER_COLORS, DIVIDER_DIRECTIONS } from './divider-utils';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    // full color × direction matrix, sourced from the const arrays so new values are covered automatically
    ...DIVIDER_COLORS.flatMap((color) =>
      DIVIDER_DIRECTIONS.map((direction) => [color, direction] as Parameters<typeof getComponentCss>)
    ),
    [
      'contrast-low',
      { base: 'horizontal', xs: 'vertical', s: 'horizontal', m: 'vertical', l: 'horizontal', xl: 'vertical' },
    ],
  ])('should return correct css for color: %s and orientation: %j', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
