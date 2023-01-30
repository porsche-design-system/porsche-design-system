import { openPopoversAndHighlightSpacer, vrtTest } from '@porsche-design-system/shared/testing';
import { getVisualRegressionStatesTester } from 'shared/src/testing/vrt';

const components = ['checkbox-wrapper', 'radio-button-wrapper', 'link', 'button', 'tag-dismissible', 'spinner', 'popover'];

it.each(components)('should have no visual regression for scaled component %s', async (component) => {
  expect(
    await vrtTest(getVisualRegressionStatesTester(), `${component}-scaling`, `/#${component}`, {
      scenario: async (page) => {
        if (component === 'popover') {
          await openPopoversAndHighlightSpacer(page);
        }
        const client = await page.target().createCDPSession();
        await client.send('Page.enable');
        await client.send('Page.setFontSizes', {
          fontSizes: {
            standard: 32,
            fixed: 48,
          },
        });
      },
    })
  ).toBeFalsy();
});
