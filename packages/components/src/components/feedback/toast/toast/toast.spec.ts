import { Toast } from './toast';
import { toastManager } from './toast-manager';

describe('connectedCallback', () => {
  it('should call toastManager.register()', () => {
    const spy = jest.spyOn(toastManager, 'register');
    const component = new Toast();
    component.host = document.createElement('p-toast');
    component.connectedCallback();

    expect(spy).toBeCalledWith(component.host, expect.anything());
  });
});

describe('componentDidLoad', () => {
  it('should call addEventListener on host', () => {
    const component = new Toast();
    component.host = document.createElement('p-toast');
    const spy = jest.spyOn(component.host, 'addEventListener');
    component.componentDidLoad();

    expect(spy).toBeCalledWith('dismiss', expect.anything());
  });
});

describe('componentShouldUpdate', () => {
  it('should return true if not offsetBottom or theme', () => {
    const component = new Toast();
    expect(component.componentShouldUpdate(null, null, 'someOtherProp' as any)).toBe(true);
  });

  it('should return false for offsetBottom or theme', () => {
    const component = new Toast();
    expect(component.componentShouldUpdate(null, null, 'offsetBottom')).toBe(false);
    expect(component.componentShouldUpdate(null, null, 'theme')).toBe(false);
  });
});

describe('disconnectedCallback', () => {
  it('should call toastManager.unregister()', () => {
    const spy = jest.spyOn(toastManager, 'unregister');
    const component = new Toast();
    component['manager'] = toastManager;
    component.disconnectedCallback();

    expect(spy).toBeCalledWith();
  });
});
