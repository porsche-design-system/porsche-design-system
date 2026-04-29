import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getComponentCss } from './radio-group-option-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    // state = none
    [false, false, 'none'],
    [false, true, 'none'],
    [true, false, 'none'],
    [true, true, 'none'],

    [false, false, 'none'],
    [false, true, 'none'],
    [true, false, 'none'],
    [true, true, 'none'],

    // state = success
    [false, false, 'success'],
    [false, true, 'success'],
    [true, false, 'success'],
    [true, true, 'success'],

    [false, false, 'success'],
    [false, true, 'success'],
    [true, false, 'success'],
    [true, true, 'success'],

    // state = error
    [false, false, 'error'],
    [false, true, 'error'],
    [true, false, 'error'],
    [true, true, 'error'],

    [false, false, 'error'],
    [false, true, 'error'],
    [true, false, 'error'],
    [true, true, 'error'],
  ])('should return correct css for disabled: %s, loading: %s and state: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
