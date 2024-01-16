import { getComponentCss } from './table-styles';
import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([['dark'], ['light']])(
    'should return correct css for theme: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
