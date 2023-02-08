import { getComponentCss } from './tabs-item-styles';
import * as focusVisibleFallbackUtils from '../../../styles/focus-visible-fallback';

xdescribe('getComponentCss()', () => {
  it('should call getFocusVisibleFallback()', () => {
    const spy = jest.spyOn(focusVisibleFallbackUtils, 'getFocusVisibleFallback');
    getComponentCss('light');

    expect(spy).toBeCalledWith(expect.anything());
  });

  it.each<Parameters<typeof getComponentCss>>([['light'], ['dark']])(
    'should return correct css for theme: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
