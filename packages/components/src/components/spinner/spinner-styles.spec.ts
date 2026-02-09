import { getComponentCss } from './spinner-styles';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['small', ],
    ['medium', ],
    ['large', ],
    ['inherit', ],
    [{ base: 'medium', xs: 'small', s: 'medium', m: 'small', l: 'medium', xl: 'small' }, ],
    ['small', ],
    ['medium', ],
    ['large', ],
    ['inherit', ],
    [{ base: 'medium', xs: 'small', s: 'medium', m: 'small', l: 'medium', xl: 'small' }, ],
  ])('should return correct css for size: %j', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
