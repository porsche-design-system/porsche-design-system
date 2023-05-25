import {
  furtherExtendedViewports,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  vrtTest,
} from '@porsche-design-system/shared/testing';
import {
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
  getBodyMarkup,
  GetMarkup,
  setContentWithDesignSystem,
} from '../helpers';

it.each(furtherExtendedViewports)('should have no visual regression for flyout for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), 'flyout', '/#flyout', {
      scenario: async (page) => {
        await page.mouse.click(0, 0); // click top left corner of the page to remove focus on flyout

        // const flyouts = await page.evaluate(() => document.querySelector('.scroll').shadowRoot);
        // console.log(flyouts);

        // const flyouts = await page.$$('.scroll');
        // flyouts.forEach(async (flyout) => {
        //   const f = await page.evaluate((el) => el.querySelector('.root'), flyout);
        //   console.log(f);
        // });

        // Scroll down all flyouts with class "scroll"
        await page.$$eval('.scroll p-flyout', (flyouts) => {
          flyouts.forEach((flyout) => {
            console.log(flyout.shadowRoot);
            const root = flyout.shadowRoot.querySelector('DIV.root');
            root.scrollTo(0, root.scrollHeight);
            root.dispatchEvent(new Event('scroll'));
          });
        });
      },
    })
  ).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('flyout-states', async () => {
      const page = vrt.getPage();

      const head = `
        <style>
          .playground {
            height: 300px;
            transform: translate3d(0, 0, 0);
          }
        </style>`;

      const getElementsMarkup: GetMarkup = () => `
        <p-flyout open="true">
          <div slot="heading">
            Some slotted heading
            <span>
              and some slotted, deeply nested <a href="#">anchor</a>.
            </span>
          </div>
          Some content
          <span>
            and some slotted, deeply nested <a href="#">anchor</a>.
          </span>
        </p-flyout>`;

      await setContentWithDesignSystem(page, getBodyMarkup(getElementsMarkup), {
        injectIntoHead: head,
      });

      await forceHoverState(page, '.hover p-flyout a');
      await forceHoverState(page, '.hover p-flyout >>> p-button-pure');
      await forceHoverState(page, '.hover p-flyout >>> p-button-pure >>> button');
      await forceFocusState(page, '.focus p-flyout a');
      await forceFocusState(page, '.focus p-flyout >>> p-button-pure >>> button');
      await forceFocusHoverState(page, '.focus-hover p-flyout a');
      await forceFocusHoverState(page, '.focus-hover p-flyout >>> p-button-pure');
      await forceFocusHoverState(page, '.focus-hover p-flyout >>> p-button-pure >>> button');
    })
  ).toBeFalsy();
});
