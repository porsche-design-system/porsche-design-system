import { getFunctionalComponentStateMessageStyles } from './state-message-styles';
import { getCss } from '../../../utils';
import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';

describe('getFunctionalComponentStateMessageStyles()', () => {
  it.each<Parameters<typeof getFunctionalComponentStateMessageStyles>>([
    ['light', 'none'],
    ['light', 'success'],
    ['light', 'error'],
    ['dark', 'none'],
    ['dark', 'success'],
    ['dark', 'error'],
  ])('should return correct JssStyle for theme: %s and state: %s', (...args) => {
    validateCssAndMatchSnapshot(getCss(getFunctionalComponentStateMessageStyles(...args)));
  });
});
