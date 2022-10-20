import { getVisualRegressionStatesTester } from '@porsche-design-system/shared/testing';
import {
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
  getBodyMarkup,
  GetMarkup,
  setContentWithDesignSystem,
} from '../helpers';

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('link-tile-states', async () => {
      const page = vrt.getPage();

      const head = `
        <style>
          .grid {
            display: grid;
            grid-template-columns: 48% 48%;
            column-gap: 1rem;
          }
        </style>`;

      const getElementsMarkup: GetMarkup = () => `
        <div class="grid">
          <p-link-tile href="#" label="Some Label" description="Default">
            <img src="./assets/porsche_beach.jpg" alt="Beach" />
          </p-link-tile>
          <p-link-tile href="#" label="Some Label" description="Default" compact="true">
            <img src="./assets/porsche_beach.jpg" alt="Beach" />
          </p-link-tile>
        </div>`;

      await setContentWithDesignSystem(page, getBodyMarkup(getElementsMarkup), { injectIntoHead: head });

      await forceHoverState(page, '.hover > div > p-link-tile >>> .root');
      await forceHoverState(page, '.hover > div > p-link-tile >>> p-link >>> .root');
      await forceHoverState(page, '.hover > div > p-link-tile >>> p-link-pure >>> .root');
      await forceFocusState(page, '.focus > div > p-link-tile >>> a');
      await forceHoverState(page, '.focus-hover > div > p-link-tile >>> p-link >>> .root');
      await forceHoverState(page, '.focus-hover > div > p-link-tile >>> p-link-pure >>> .root');
      await forceHoverState(page, '.focus-hover > div > p-link-tile >>> .root');
      await forceFocusHoverState(page, '.focus-hover > div > p-link-tile >>> a');
    })
  ).toBeFalsy();
});
