import { getVisualRegressionOverviewTester, vrtTest } from '@porsche-design-system/shared/testing';
import { openPopoverAndSetBackground } from '../helpers';

const openPopovers = async (page): Promise<void> => {
  await openPopoverAndSetBackground(page);
  return page.evaluate(() => {
    document.querySelectorAll('my-prefix-p-popover').forEach((x) => {
      const button = x.shadowRoot.querySelector('my-prefix-p-button-pure').shadowRoot.querySelector('button');
      button.click();
    });
  });
};

it('should have no visual regression', async () => {
  expect(
    await vrtTest(getVisualRegressionOverviewTester(), 'overview', '/#overview', {
      scenario: openPopovers,
      initialViewportHeight: 1000,
    })
  ).toBeFalsy();
});
