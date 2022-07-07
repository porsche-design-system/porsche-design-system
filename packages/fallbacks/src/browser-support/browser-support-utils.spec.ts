import { hasPorscheDesignSystemBrowserSupport } from './browser-support-utils';

type BrowserFeatures = {
  IntersectionObserver: boolean;
  MutationObserver: boolean;
  customElements: boolean;
};

const scenarios: BrowserFeatures[] = [
  { IntersectionObserver: true, MutationObserver: true, customElements: true },
  { IntersectionObserver: false, MutationObserver: true, customElements: true },
  { IntersectionObserver: false, MutationObserver: false, customElements: true },
  { IntersectionObserver: true, MutationObserver: false, customElements: true },
  { IntersectionObserver: true, MutationObserver: false, customElements: false },
  { IntersectionObserver: true, MutationObserver: true, customElements: false },
  { IntersectionObserver: false, MutationObserver: true, customElements: false },
  { IntersectionObserver: false, MutationObserver: false, customElements: false },
];

describe('hasPorscheDesignSystemBrowserSupport()', () => {
  it.each<BrowserFeatures>(scenarios)(
    'should return correct porsche design system browser support status for %s',
    (scenario) => {
      const { IntersectionObserver, MutationObserver, customElements } = scenario;

      jest.spyOn(global, 'window', 'get').mockImplementation(() => {
        return {
          ...(IntersectionObserver ? { IntersectionObserver: 'some IntersectionObserver constructor' } : null),
          ...(MutationObserver ? { MutationObserver: 'some MutationObserver constructor' } : null),
          ...(customElements ? { customElements: 'some customElements registry' } : null),
        } as unknown as Window & typeof globalThis;
      });

      expect(hasPorscheDesignSystemBrowserSupport()).toMatchSnapshot();
    }
  );
});
