import type { VisualRegressionTester } from '@porsche-design-system/visual-regression-tester';

export const vrtTest = (vrt: VisualRegressionTester, snapshotId: string, url: string, options?: any) => {
  return vrt.test(
    snapshotId,
    async () => {
      await vrt.goTo(url);
      await vrt.getPage().evaluate(() => (window as any).porscheDesignSystem.componentsReady());
    },
    options
  );
};
