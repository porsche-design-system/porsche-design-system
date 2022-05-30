import { Scroller } from './scroller';

describe('componentDidLoad', () => {
  it('should call initIntersectionObserver()', () => {
    const component = new Scroller();
    const spy = jest.spyOn(component, 'initIntersectionObserver' as any);

    try {
      component.componentDidLoad();
    } catch (e) {}

    expect(spy).toBeCalledTimes(1);
  });
});
