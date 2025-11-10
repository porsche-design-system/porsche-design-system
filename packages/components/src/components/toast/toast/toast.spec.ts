import { vi } from 'vitest';
import { Toast } from './toast';
import { toastManager } from './toast-manager';

describe('connectedCallback', () => {
  it('should call toastManager.register() with correct parameters', () => {
    const spy = vi.spyOn(toastManager, 'register');
    const component = new Toast();
    component.host = document.createElement('p-toast');
    component.host.attachShadow({ mode: 'open' });
    component.connectedCallback();

    expect(spy).toHaveBeenCalledWith(component.host, expect.anything());
  });
});

describe('componentDidLoad', () => {
  it('should call addEventListener() on host with correct parameters', () => {
    const component = new Toast();
    component.host = document.createElement('p-toast');
    const spy = vi.spyOn(component.host, 'addEventListener');
    component.componentDidLoad();

    expect(spy).toHaveBeenCalledWith('dismiss', expect.anything());
  });
});

describe('componentShouldUpdate', () => {
  it('should return true if not offsetBottom or theme', () => {
    const component = new Toast();
    expect(component.componentShouldUpdate(null, null, 'someOtherProp' as any)).toBe(true);
  });

  it('should return false for theme', () => {
    const component = new Toast();
    expect(component.componentShouldUpdate(null, null, 'theme')).toBe(false);
  });
});

describe('disconnectedCallback', () => {
  it('should call toastManager.unregister()', () => {
    const spy = vi.spyOn(toastManager, 'unregister');
    const component = new Toast();
    component['manager'] = toastManager;
    component.disconnectedCallback();

    expect(spy).toHaveBeenCalledWith();
  });
});
