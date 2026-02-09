import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './wordmark-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([['small'], ['inherit'], ['small'], ['inherit']])(
    'should return correct css for size: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
