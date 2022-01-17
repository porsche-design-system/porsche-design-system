import {
  componentsReady,
  PorscheDesignSystemProvider,
  skipCheckForPorscheDesignSystemProviderDuringTests,
  skipPorscheDesignSystemCDNRequestsDuringTests,
  useToastManager,
} from '../../../projects/components-wrapper/src/public-api';

it('should expose componentsReady()', () => {
  expect(typeof componentsReady).toBe('function');
});

it('should expose PorscheDesignSystemProvider()', () => {
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
