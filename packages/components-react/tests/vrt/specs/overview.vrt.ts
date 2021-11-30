import { getVisualRegressionOverviewTester, vrtTest } from '@porsche-design-system/shared/testing';
import {
  openPopoverAndSetBackground,
  openPrefixedPopover,
} from '@porsche-design-system/shared-src/src/testing/puppeteer-vrt-helper';
import type { Page } from 'puppeteer';

const openPopovers = async (page: Page): Promise<void> => {
  await openPopoverAndSetBackground(page);
  return openPrefixedPopover(page);
};

it('should have no visual regression', async () => {
  expect(
    await vrtTest(getVisualRegressionOverviewTester(), 'overview', '/overview', {
      scenario: openPopovers,
      initialViewportHeight: 1000,
    })
  ).toBeFalsy();
});
