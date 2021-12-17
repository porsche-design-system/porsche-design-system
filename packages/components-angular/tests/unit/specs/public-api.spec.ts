import {
  componentsReady,
  PorscheDesignSystemModule,
  ToastManager,
  IconName,
  TabChangeEvent,
} from '../../../projects/components-wrapper/src/public-api';

it('should expose componentsReady()', () => {
  expect(typeof componentsReady).toBe('function');
});

it('should expose PorscheDesignSystemModule()', () => {
  expect(typeof PorscheDesignSystemModule).toBe('function');
});

it('should expose ToastManager()', () => {
  expect(typeof ToastManager).toBe('function');
});

it('should expose types from root', () => {
  const icon: IconName = '360';
  const event: TabChangeEvent = { activeTabIndex: 1 };
  expect(icon).toBe('360');
  expect(event).toEqual({ activeTabIndex: 1 });
});
