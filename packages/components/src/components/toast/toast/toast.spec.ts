import { Toast } from './toast';
import { toastManager } from './toast-manager';

describe('connectedCallback', () => {
  it('should call toastManager.register() with correct parameters', () => {
    const spy = jest.spyOn(toastManager, 'register');
    const component = new Toast();
    component.host = document.createElement('p-toast');
    component.host.attachShadow({ mode: 'open' });
    component.connectedCallback();

    expect(spy).toBeCalledWith(component.host, expect.anything());
  });
});

describe('componentDidLoad', () => {
  it('should call addEventListener() on host with correct parameters', () => {
    const component = new Toast();
    component.host = document.createElement('p-toast');
    const spy = jest.spyOn(component.host, 'addEventListener');
    component.componentDidLoad();

    expect(spy).toBeCalledWith('dismiss', expect.anything());
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
