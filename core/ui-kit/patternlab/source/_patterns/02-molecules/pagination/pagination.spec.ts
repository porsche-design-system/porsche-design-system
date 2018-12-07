import 'jasmine';
import { VisualRegressionTester } from '@myporsche/myservices-visual-regression-tester';
import { getVisualRegressionTester } from '../../../../../vrt/helpers/setup';

describe('Pagination', () => {
  let visualRegressionTester: VisualRegressionTester;

  beforeAll(async () => {
    visualRegressionTester = await getVisualRegressionTester();
  });

  it('should have no visual regression | variant:many pages | state:default', async () => {
    expect(await visualRegressionTester.test('pagination~default', async () => {
      await visualRegressionTester.goTo('/02-molecules-pagination-pagination-04-many-pages/02-molecules-pagination-pagination-04-many-pages.rendered.html?disableCSSAnimations');
    })).toBeFalsy();
  });

  it('should have no visual regression | variant:many pages | state:hover', async () => {
    expect(await visualRegressionTester.test('pagination~default-hover', async () => {
      await visualRegressionTester.goTo('/02-molecules-pagination-pagination-04-many-pages/02-molecules-pagination-pagination-04-many-pages.rendered.html?disableCSSAnimations');
      await visualRegressionTester.hover('.pagination__item:nth-child(1) .pagination__goto');
    })).toBeFalsy();
  });

  it('should have no visual regression | variant:many pages | state:focus', async () => {
    expect(await visualRegressionTester.test('pagination~default-focus', async () => {
      await visualRegressionTester.goTo('/02-molecules-pagination-pagination-04-many-pages/02-molecules-pagination-pagination-04-many-pages.rendered.html?disableCSSAnimations');
      await visualRegressionTester.focus('.pagination__item:nth-child(1) .pagination__goto');
    })).toBeFalsy();
  });

  it('should have no visual regression | variant:many pages inverted | state:default', async () => {
    expect(await visualRegressionTester.test('pagination~default-inverted', async () => {
      await visualRegressionTester.goTo('/02-molecules-pagination-pagination-08-many-pages-inverted/02-molecules-pagination-pagination-08-many-pages-inverted.rendered.html?disableCSSAnimations');
    })).toBeFalsy();
  });

  it('should have no visual regression | variant:many pages inverted | state:hover', async () => {
    expect(await visualRegressionTester.test('pagination~default-inverted-hover', async () => {
      await visualRegressionTester.goTo('/02-molecules-pagination-pagination-08-many-pages-inverted/02-molecules-pagination-pagination-08-many-pages-inverted.rendered.html?disableCSSAnimations');
      await visualRegressionTester.hover('.pagination__item:nth-child(1) .pagination__goto');
    })).toBeFalsy();
  });

  it('should have no visual regression | variant:many pages inverted | state:focus', async () => {
    expect(await visualRegressionTester.test('pagination~default-inverted-focus', async () => {
      await visualRegressionTester.goTo('/02-molecules-pagination-pagination-08-many-pages-inverted/02-molecules-pagination-pagination-08-many-pages-inverted.rendered.html?disableCSSAnimations');
      await visualRegressionTester.focus('.pagination__item:nth-child(1) .pagination__goto');
    })).toBeFalsy();
  });
});
