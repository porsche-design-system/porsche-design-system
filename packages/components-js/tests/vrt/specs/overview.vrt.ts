import { getVisualRegressionOverviewTester, vrtTest } from '@porsche-design-system/shared/testing';
import {
  openPrefixedPopover,
  openPopoverAndSetBackground,
} from '@porsche-design-system/shared-src/src/testing/puppeteer-vrt-helper';

const openPopovers = async (page): Promise<void> => {
  await openPopoverAndSetBackground(page);
  return openPrefixedPopover(page);
};

it('should have no visual regression', async () => {
  expect(
    await vrtTest(getVisualRegressionOverviewTester(), 'overview', '/#overview', {
      scenario: openPopovers,
      initialViewportHeight: 1000,
    })
  ).toBeFalsy();
});
