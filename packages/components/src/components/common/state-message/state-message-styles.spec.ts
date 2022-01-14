import { getFunctionalComponentStateMessageStyles } from './state-message-styles';

describe('getFunctionalComponentStateMessageStyles()', () => {
  it.each<Parameters<typeof getFunctionalComponentStateMessageStyles>>([
    ['light', 'none'],
    ['light', 'success'],
    ['light', 'error'],
    ['dark', 'none'],
    ['dark', 'success'],
    ['dark', 'error'],
  ])('should return correct JssStyle for theme: %s and state: %s', (theme, state) => {
    expect(getFunctionalComponentStateMessageStyles(theme, state)).toMatchSnapshot();
  });
});
