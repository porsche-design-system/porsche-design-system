import { getVisualRegressionOverviewTester, vrtTest } from '@porsche-design-system/shared/testing';

it('should have no visual regression', async () => {
  expect(
    await vrtTest(getVisualRegressionOverviewTester(), 'typography-fallback-strategy', '/#typography-fallback-strategy')
  ).toBeFalsy();
});

it('should have no visual regression', async () => {
  expect(
    await vrtTest(
      getVisualRegressionOverviewTester(),
      'typography-porsche-next-latin',
      '/#typography-porsche-next-latin'
    )
  ).toBeFalsy();
});

it('should have no visual regression', async () => {
  expect(
    await vrtTest(
      getVisualRegressionOverviewTester(),
      'typography-porsche-next-greek-and-coptic',
      '/#typography-porsche-next-greek-and-coptic'
    )
  ).toBeFalsy();
});

it('should have no visual regression', async () => {
  expect(
    await vrtTest(
      getVisualRegressionOverviewTester(),
      'typography-porsche-next-cyril',
      '/#typography-porsche-next-cyril'
    )
  ).toBeFalsy();
});
