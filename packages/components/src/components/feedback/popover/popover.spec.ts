import { Popover } from './popover';

describe('popover', () => {
  describe('componentWillLoad', () => {
    it('should call warnIfCaptionIsUndefined()', () => {
      const spy = jest.spyOn(document, 'addEventListener');
      const component = new Popover();
      component.componentDidLoad();

      expect(spy).toBeCalledWith('click', expect.anything());
    });
  });

  describe('disconnectedCallback', () => {
    it('should call warnIfCaptionIsUndefined()', () => {
      const spy = jest.spyOn(document, 'removeEventListener');
      const component = new Popover();
      component.disconnectedCallback();

      expect(spy).toBeCalledWith('click', expect.anything());
    });
  });
});
