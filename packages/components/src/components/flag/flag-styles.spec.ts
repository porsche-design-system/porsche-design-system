import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './flag-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([['2xs'], ['xs'], ['sm'], ['md'], ['lg'], ['xl'], ['inherit']])(
    'should return correct css for size: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
