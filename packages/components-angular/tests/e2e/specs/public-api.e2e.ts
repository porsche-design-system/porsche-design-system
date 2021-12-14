import { componentsReady, PorscheDesignSystemModule, ToastManager } from '@porsche-design-system/components-angular';

it('should expose componentsReady()', () => {
  expect(typeof componentsReady).toBe('function');
});

it('should expose PorscheDesignSystemModule()', () => {
  expect(typeof PorscheDesignSystemModule).toBe('function');
});

it('should expose ToastManager()', () => {
  expect(typeof ToastManager).toBe('function');
});
