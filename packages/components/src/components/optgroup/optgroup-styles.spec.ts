import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './optgroup-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([[true], [false], [true], [false]])(
    'should return correct css for isDisabled: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
