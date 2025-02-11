import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './popover-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([['light'], ['dark']])(
    'should return correct css for theme: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
