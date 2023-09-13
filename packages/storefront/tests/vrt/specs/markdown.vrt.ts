import { defaultViewports, getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';
import { mainViewSelector } from '../helpers';
import { forceFocusState } from '../../../../components-js/tests/vrt/puppeteer/helpers';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), 'markdown', '/markdown', {
      prefersColorScheme: 'light',
      elementSelector: mainViewSelector,
      // focus first of two links
      scenario: (page) => forceFocusState(page, 'a[href="https://designsystem.porsche.com/"]:not([title])'),
    })
  ).toBeFalsy();
});

it('should have no visual regression for viewport 1000 in auto dark mode', async () => {
  expect(
    await vrtTest(getVisualRegressionTester(1000), 'markdown-dark', '/markdown', {
      prefersColorScheme: 'dark',
      elementSelector: mainViewSelector,
      // focus first of two links
      scenario: (page) => forceFocusState(page, 'a[href="https://designsystem.porsche.com/"]:not([title])'),
    })
  ).toBeFalsy();
});
