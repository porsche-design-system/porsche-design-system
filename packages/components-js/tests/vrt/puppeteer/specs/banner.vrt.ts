import {
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
  getThemedBodyMarkup,
  GetThemedMarkup,
  setContentWithDesignSystem,
} from '../helpers';
import {
  extendedViewports,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  vrtTest,
} from '@porsche-design-system/shared/testing';

// TODO: (banner state hover test is flaky) we shouldn't rely on retries since computed result has to be deterministic
jest.retryTimes(3);

it.each(extendedViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), 'banner', '/#banner', {
      scenario: async (page) => {
        await page.mouse.click(0, 0); // click top left corner of the page to remove focus on modal
      },
    })
  ).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('banner-states', async () => {
      const page = vrt.getPage();

      const head = `
        <style>
          body { display: grid; grid-template-columns: repeat(2, 50%); }
          .playground { transform: translate3d(0, 0, 0); height: 20rem; }
        </style>`;

      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <p-banner open="true" state="neutral" theme="${theme}">
          <span slot="title">
            Slotted title
            <span>
              and some slotted, deeply nested <a href="#">anchor</a>.
            </span>
          </span>
          <span slot="description">
            Slotted description
            <span>
              and some slotted, deeply nested <a href="#">anchor</a>.
            </span>
          </span>
        </p-banner>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), { injectIntoHead: head });

      await forceHoverState(page, '.hover p-banner span a');
      // TODO: support for 3rd level of shadow DOM is missing
      // await forceHoveredState(page, '.hover p-banner >>> p-inline-notification >>> p-button-pure >>> button');
      await forceFocusState(page, '.focus p-banner span a');
      // await forceFocusedState(page, '.focus p-banner >>> p-inline-notification >>> p-button-pure >>> button');
      await forceFocusHoverState(page, '.focus-hover p-banner span a');
      // await forceFocusedHoveredState(page, '.focus-hover p-banner >>> p-inline-notification >>> p-button-pure >>> button');
    })
  ).toBeFalsy();
});
