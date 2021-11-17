import { Toast } from './toast';
import { toastManager } from './toast-manager';

describe('connectedCallback', () => {
  it('should call toastManager.register() and have this.manager defined', () => {
    const spy = jest.spyOn(toastManager, 'register');
    const component = new Toast();
    component.host = document.createElement('p-toast');

    expect(component['manager']).toBeUndefined();
    component.connectedCallback();

    expect(spy).toBeCalledWith(component.host);
    expect(component['manager']).toEqual(toastManager);
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
  it('should return true if not offsetBottom', () => {
    const component = new Toast();
    expect(component.componentShouldUpdate(null, null, 'theme' as any)).toBe(true);
  });

  it('should return false for offsetBottom', () => {
    const component = new Toast();
    expect(component.componentShouldUpdate(null, null, 'offsetBottom')).toBe(false);
  });
});

describe('componentDidRender', () => {
  it('should call toastManager.startTimeout()', () => {
    const spy = jest.spyOn(toastManager, 'startTimeout');
    const component = new Toast();
    component['manager'] = toastManager;
    component.componentDidRender();

    expect(spy).toBeCalledWith();
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
