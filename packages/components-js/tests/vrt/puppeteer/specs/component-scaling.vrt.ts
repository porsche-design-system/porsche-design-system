import { getVisualRegressionStatesTester, vrtTest } from '@porsche-design-system/shared/testing';

const components = ['checkbox-wrapper', 'radio-button-wrapper', 'text-field-wrapper'];

it.each(components)('should have no visual regression for scaled component %s', async (component) => {
  expect(
    await vrtTest(getVisualRegressionStatesTester(), `${component}-scaling`, `/#${component}`, {
      scenario: async (page) => {
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
