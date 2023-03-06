import {
  componentsReady,
  PorscheDesignSystemProvider,
  skipCheckForPorscheDesignSystemProviderDuringTests,
  skipPorscheDesignSystemCDNRequestsDuringTests,
  useToastManager,
  IconName,
  TabsChangeEvent,
} from '../../../src/public-api';

it('should expose componentsReady()', () => {
  expect(typeof componentsReady).toBe('function');
});

it('should expose PorscheDesignSystemProvider', () => {
  expect(typeof PorscheDesignSystemProvider).toBe('function');
});

it('should expose skipCheckForPorscheDesignSystemProviderDuringTests()', () => {
  expect(typeof skipCheckForPorscheDesignSystemProviderDuringTests).toBe('function');
});

it('should expose useToastManager()', () => {
  expect(typeof useToastManager).toBe('function');
});

it('should expose skipPorscheDesignSystemCDNRequestsDuringTests()', () => {
  expect(typeof skipPorscheDesignSystemCDNRequestsDuringTests).toBe('function');
});

it('should expose types from root', () => {
  const icon: IconName = '360';
  const event: TabsChangeEvent = { activeTabIndex: 1 };
  expect(icon).toBe('360');
  expect(event).toEqual({ activeTabIndex: 1 });
});
