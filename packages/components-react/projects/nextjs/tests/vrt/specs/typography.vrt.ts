import { getVisualRegressionOverviewTester, vrtTest } from '@porsche-design-system/shared/testing';

it('should have no visual regression for font family fallback strategy', async () => {
  expect(
    await vrtTest(getVisualRegressionOverviewTester(), 'typography-fallback', '/typography-fallback', {
      javaScriptEnabled: false,
    })
  ).toBeFalsy();
});

it('should have no visual regression for latin charset', async () => {
  expect(
    await vrtTest(getVisualRegressionOverviewTester(), 'typography-latin', '/typography-latin', {
      javaScriptEnabled: false,
    })
  ).toBeFalsy();
});

it('should have no visual regression greek and coptic charset', async () => {
  expect(
    await vrtTest(getVisualRegressionOverviewTester(), 'typography-greek-and-coptic', '/typography-greek-and-coptic', {
      javaScriptEnabled: false,
    })
  ).toBeFalsy();
});

it('should have no visual regression cyril charset', async () => {
  expect(
    await vrtTest(getVisualRegressionOverviewTester(), 'typography-cyril', '/typography-cyril', {
      javaScriptEnabled: false,
    })
  ).toBeFalsy();
});
