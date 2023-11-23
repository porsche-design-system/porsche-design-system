import { getFunctionalComponentStateMessageStyles } from './state-message-styles';
import { getCss } from '../../../utils';

describe('getFunctionalComponentStateMessageStyles()', () => {
  it.each<Parameters<typeof getFunctionalComponentStateMessageStyles>>([
    ['light', 'none'],
    ['light', 'success'],
    ['light', 'error'],
    ['dark', 'none'],
    ['dark', 'success'],
    ['dark', 'error'],
  ])('should return correct JssStyle for theme: %s and state: %s', (...args) => {
    expect(getCss(getFunctionalComponentStateMessageStyles(...args))).toMatchSnapshot();
  });
});
