import * as getShadowRootHTMLElementUtil from './getShadowRootHTMLElement';
import { getScrollerElements } from './getScrollerElements';
import * as getHTMLElementUtil from './getHTMLElement';

describe('getScrollerElements()', () => {
  it('should call getShadowRootHTMLElement with correct selectors', () => {
    const spy = jest.spyOn(getShadowRootHTMLElementUtil, 'getShadowRootHTMLElement').mockImplementationOnce(() => {
      return {} as Element;
    });
    jest.spyOn(getHTMLElementUtil, 'getHTMLElement').mockImplementationOnce(() => {
      return {} as Element;
    });

    const scroller = document.createElement('p-scroller');
    getScrollerElements(scroller);

    expect(spy).toBeCalledWith(scroller, '.scroll-area');
    expect(spy).toBeCalledWith(scroller, '.gradient');
  });
});
