import {
  getVisualRegressionStatesTester,
  openPopoversAndHighlightSpacer,
  vrtTest,
} from '@porsche-design-system/shared/testing';

const components = [
  'banner',
  'button',
  'button-pure',
  'checkbox-wrapper',
  'inline-notification',
  'link',
  'link-pure',
  'link-social',
  'pagination',
  'popover',
  'radio-button-wrapper',
  'select-wrapper',
  'spinner',
  'tag',
  'tag-dismissible',
  'text-field-wrapper',
  'textarea-wrapper',
  'toast-basic',
 'segmented-control'
];

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
