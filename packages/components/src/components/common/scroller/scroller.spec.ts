import { Scroller } from './scroller';

describe('componentDidLoad', () => {
  it('should call initIntersectionObserver()', () => {
    const component = new Scroller();
    const spy = jest.spyOn(component, 'initIntersectionObserver' as any);

    try {
      component.componentDidLoad();
    } catch {}

    expect(spy).toBeCalledTimes(1);
  });
});

describe('componentShouldUpdate', () => {
  it('should return true if prop name does not match scrollToPosition', () => {
    const component = new Scroller();
    expect(component.componentShouldUpdate(0, 0, 'theme')).toBe(true);
  });

  it('should return true if prop name matches "scrollToPosition" and isPrevHidden and isNextHidden are false', () => {
    const component = new Scroller();
    component['isPrevHidden'] = false;
    component['isNextHidden'] = false;
    expect(component.componentShouldUpdate(0, 0, 'scrollToPosition')).toBe(true);
  });

  it('should return false if prop name matches "scrollToPosition" and isPrevHidden is true', () => {
    const component = new Scroller();
    component['isPrevHidden'] = true;
    expect(component.componentShouldUpdate(0, 0, 'scrollToPosition')).toBe(false);
  });

  it('should return false if prop name matches "scrollToPosition" and isNextHidden is true', () => {
    const component = new Scroller();
    component['isNextHidden'] = true;
    expect(component.componentShouldUpdate(0, 0, 'scrollToPosition')).toBe(false);
  });
});
