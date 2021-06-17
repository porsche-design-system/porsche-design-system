import {
  forceFocusedHoveredStateOnDifferentSelectors,
  forceFocusedState,
  forceHoveredState,
  getThemedBodyMarkup,
  GetThemedMarkup,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  setContentWithDesignSystem,
  testOptions,
} from '../helpers';

describe('Accordion', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'accordion',
        async () => {
          await vrt.goTo('/#text'); // to ensure fonts are already loaded before js is initialized
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
        const hoverElementSelector = 'p-accordion >>> p-headline';
        const focusElementSelector = 'p-accordion >>> button';

        const getElementsMarkup: GetThemedMarkup = (theme) => `
          <p-accordion theme="${theme}" heading="Some heading">
            <p>
             Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
             sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
            </p>
          </p-accordion>
          <p-accordion theme="${theme}" heading="Some heading" open="true">
            <p ${theme === 'dark' && 'style="color: white"'}>
             Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
             sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
            </p>
          </p-accordion>`;

        await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup));

        await forceHoveredState(page, `.hovered > ${hoverElementSelector}`);
        await forceFocusedState(page, `.focused > ${focusElementSelector}`);
        await forceFocusedHoveredStateOnDifferentSelectors(
          page,
          `.focused-hovered > ${hoverElementSelector}`,
          `.focused-hovered > ${focusElementSelector}`
        );
      })
    ).toBeFalsy();
  });
});
