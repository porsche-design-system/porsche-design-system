import {
  forceFocusedHoveredState,
  forceFocusedState,
  forceHoveredState,
  getThemedBodyMarkup,
  GetThemedMarkup,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  setContentWithDesignSystem,
  testOptions,
} from '../helpers';
import { Theme } from '@porsche-design-system/utilities';

describe('Accordion', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'accordion',
        async () => {
          await vrt.goTo('/#accordion');
        },
        testOptions
      )
    ).toBeFalsy();
  });

  it('should have no visual regression for :hover + :focus-visible', async () => {
    const vrt = getVisualRegressionStatesTester();
    expect(
      await vrt.test('accordion-states', async () => {
        const page = await vrt.getPage();

        const content = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
             sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`;

        const getColorInlineStyle = (theme: Theme) => (theme === 'dark' ? ' style="color: white"' : '');

        const getElementsMarkup: GetThemedMarkup = (theme) => `
          <p-accordion theme="${theme}" heading="Some heading">
            ${content}
          </p-accordion>
          <p-accordion theme="${theme}" heading="Some heading" open="true">
            <div${getColorInlineStyle(theme)}>
              ${content}
            </div>
          </p-accordion>
          <p-accordion theme="${theme}" heading="Some compact accordion" open="true" compact="true">
            <div${getColorInlineStyle(theme)}>
              ${content}
            </div>
          </p-accordion>
          <p-accordion theme="${theme}" heading="Some navigation like accordion" open="true" compact="true">
            <p-link-pure href="https://www.porsche.com" theme="${theme}">Some link</p-link-pure>
            <br />
            <p-link-pure href="https://www.porsche.com" theme="${theme}">Some link</p-link-pure>
          </p-accordion>`;

        await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup));

        await forceHoveredState(page, '.hovered > p-accordion >>> button');
        await forceHoveredState(page, '.hovered > p-accordion > p-link-pure >>> a');

        await forceFocusedState(page, '.focused > p-accordion >>> button');
        await forceFocusedState(page, '.focused > p-accordion > p-link-pure >>> a');

        await forceFocusedHoveredState(page, '.focused-hovered > p-accordion >>> button');
        await forceFocusedHoveredState(page, '.focused-hovered > p-accordion > p-link-pure >>> a');
      })
    ).toBeFalsy();
  });
});
