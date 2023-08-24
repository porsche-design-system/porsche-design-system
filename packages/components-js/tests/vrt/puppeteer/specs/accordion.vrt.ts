import {
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
  getThemedBodyMarkup,
  GetThemedMarkup,
  setContentWithDesignSystem,
} from '../helpers';
import {
  defaultViewports,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  vrtTest,
} from '@porsche-design-system/shared/testing';
import type { Theme } from '@porsche-design-system/utilities-v2';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), 'accordion', '/#accordion', {
      scenario: async (page) => {
        await page.click('#native-select');
        await page.evaluate(() => (window as any).componentsReady());
      },
    })
  ).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('accordion-states', async () => {
      const page = vrt.getPage();

      const content = `Slotted content`;

      const head = `
        <style>
          body { display: grid; grid-template-columns: repeat(2, 50%); }
        </style>`;

      const getElementsMarkup: GetThemedMarkup = (theme: Theme) => `
        <p-accordion theme="${theme}" heading="Heading">
          ${content}
        </p-accordion>
        <p-accordion theme="${theme}" heading="Heading" open="true">
          ${content}
        </p-accordion>
        <p-accordion theme="${theme}" heading="Heading" open="true">
          ${content}
          <span>
            and some slotted, deeply nested <a href="#">anchor</a>.
          </span>
        </p-accordion>
        <p-accordion theme="${theme}" heading="Heading (compact=true)" open="true" compact="true">
           ${content}
        </p-accordion>
        <p-accordion theme="${theme}" heading="Heading (compact=true)" open="true" compact="true">
          <p-link-pure href="https://www.porsche.com" theme="${theme}">Some link</p-link-pure>
          <br />
          <p-link-pure href="https://www.porsche.com" theme="${theme}">Some link</p-link-pure>
        </p-accordion>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), { injectIntoHead: head });

      await forceHoverState(page, '.hover p-accordion >>> button');
      await forceHoverState(page, '.hover p-accordion > p-link-pure >>> a');
      await forceHoverState(page, '.hover p-accordion a');

      await forceFocusState(page, '.focus p-accordion >>> button');
      await forceFocusState(page, '.focus p-accordion > p-link-pure >>> a');
      await forceFocusState(page, '.focus p-accordion a');

      await forceFocusHoverState(page, '.focus-hover p-accordion >>> button');
      await forceFocusHoverState(page, '.focus-hover p-accordion > p-link-pure >>> a');
      await forceFocusHoverState(page, '.focus-hover p-accordion a');
    })
  ).toBeFalsy();
});
