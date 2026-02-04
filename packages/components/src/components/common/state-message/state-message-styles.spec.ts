import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getCss } from '../../../utils';
import { getFunctionalComponentStateMessageStyles } from './state-message-styles';

describe('getFunctionalComponentStateMessageStyles()', () => {
  it.each<Parameters<typeof getFunctionalComponentStateMessageStyles>>([
    ['none'],
    ['success'],
    ['error'],
    ['none'],
    ['success'],
    ['error'],
  ])('should return correct JssStyle for theme: %s and state: %s', (...args) => {
    validateCssAndMatchSnapshot(getCss(getFunctionalComponentStateMessageStyles(...args)));
  });
});
