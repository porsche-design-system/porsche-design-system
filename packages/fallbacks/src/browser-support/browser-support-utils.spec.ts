import { hasPorscheDesignSystemBrowserSupport } from './browser-support-utils';

type Scenario = {
  IntersectionObserver: boolean;
  MutationObserver: boolean;
  customElements: boolean;
  result: boolean;
};

const scenarios: Scenario[] = [
  { IntersectionObserver: true, MutationObserver: true, customElements: true, result: true },
  { IntersectionObserver: false, MutationObserver: true, customElements: true, result: false },
  { IntersectionObserver: false, MutationObserver: false, customElements: true, result: false },
  { IntersectionObserver: true, MutationObserver: false, customElements: true, result: false },
  { IntersectionObserver: true, MutationObserver: false, customElements: false, result: false },
  { IntersectionObserver: true, MutationObserver: true, customElements: false, result: false },
  { IntersectionObserver: false, MutationObserver: true, customElements: false, result: false },
  { IntersectionObserver: false, MutationObserver: false, customElements: false, result: false },
];

describe('hasPorscheDesignSystemBrowserSupport()', () => {
  it.each<Scenario>(scenarios)(
    'should return correct porsche design system browser support status for %s',
    (scenario) => {
      const { IntersectionObserver, MutationObserver, customElements, result } = scenario;

      jest.spyOn(global, 'window', 'get').mockImplementation(() => {
        return {
          ...(IntersectionObserver && { IntersectionObserver: 'some IntersectionObserver constructor' }),
          ...(MutationObserver && { MutationObserver: 'some MutationObserver constructor' }),
          ...(customElements && { customElements: 'some customElements registry' }),
        } as unknown as Window & typeof globalThis;
      });

      expect(hasPorscheDesignSystemBrowserSupport()).toBe(result);
    }
  );
});
