import { getVisualRegressionOverviewTester, vrtTest } from '@porsche-design-system/shared/testing';

it('should have no visual regression for font family fallback strategy', async () => {
  expect(
    await vrtTest(getVisualRegressionOverviewTester(), 'typography-fallback-strategy', '/#typography-fallback-strategy')
  ).toBeFalsy();
});

it('should have no visual regression for latin charset', async () => {
  expect(
    await vrtTest(getVisualRegressionOverviewTester(), 'typography-latin-U+0020-1EFF', '/#typography-latin-U+0020-1EFF')
  ).toBeFalsy();
  expect(
    await vrtTest(getVisualRegressionOverviewTester(), 'typography-latin-U+2000-26FF', '/#typography-latin-U+2000-26FF')
  ).toBeFalsy();
  expect(
    await vrtTest(getVisualRegressionOverviewTester(), 'typography-latin-U+FB00-FEFF', '/#typography-latin-U+FB00-FEFF')
  ).toBeFalsy();
});

it('should have no visual regression greek and coptic charset', async () => {
  expect(
    await vrtTest(getVisualRegressionOverviewTester(), 'typography-greek-and-coptic', '/#typography-greek-and-coptic')
  ).toBeFalsy();
});

it('should have no visual regression cyril charset', async () => {
  expect(await vrtTest(getVisualRegressionOverviewTester(), 'typography-cyril', '/#typography-cyril')).toBeFalsy();
});
