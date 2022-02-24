import { getComponentCss } from './tabs-item-styles';
import * as focusVisibleFallbackUtils from '../../../../styles/focus-visible-fallback';

describe('getComponentCss()', () => {
  it('should call getFocusVisibleFallback()', () => {
    const spy = jest.spyOn(focusVisibleFallbackUtils, 'getFocusVisibleFallback');
    getComponentCss('light');

    expect(spy).toHaveBeenCalledWith(expect.anything());
  });

  it.each<Parameters<typeof getComponentCss>>([['light'], ['dark'], ['light-electric']])(
    'should return correct css for theme: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
