import { getComponentCss } from './content-wrapper-styles';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([['full'], ['fluid'], ['extended'], ['basic'], ['narrow']])(
    'should return correct css for width: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
