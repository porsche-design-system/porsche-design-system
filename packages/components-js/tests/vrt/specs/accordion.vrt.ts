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

        const getElementsMarkup: GetThemedMarkup = (theme) => `
          <p-accordion theme="${theme}" heading="Some heading">
            ${content}
          </p-accordion>
          <p-accordion theme="${theme}" heading="Some heading" open="true">
            <div ${theme === 'dark' && 'style="color: white"'}>
            ${content}
            </div>
          </p-accordion>
          <p-accordion theme="${theme}" open="true">
            <span slot="heading">Some <i>italic</i> and <em>emphasis</em> heading with <a href="#">Link</a></span>
            <div ${theme === 'dark' && 'style="color: white"'}>
             Some <i>italic</i> and <em>emphasis</em> content with <a href="#">Link</a>. ${content}
            </div>
          </p-accordion>`;

        await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup));

        await forceHoveredState(page, `.hovered > p-accordion >>> p-headline`);
        await forceHoveredState(page, `.hovered > p-accordion > span a`);
        await forceHoveredState(page, `.hovered > p-accordion > div a`);

        await forceFocusedState(page, `.focused > p-accordion >>> button`);
        await forceFocusedState(page, `.focused > p-accordion > span a`);
        await forceFocusedState(page, `.focused > p-accordion > div a`);

        await forceFocusedState(page, `.focused-hovered > p-accordion >>> button`);
        await forceHoveredState(page, `.focused-hovered > p-accordion >>> p-headline`);
        await forceFocusedHoveredState(page, `.focused-hovered > p-accordion > span a`);
        await forceFocusedHoveredState(page, `.focused-hovered > p-accordion > div a`);
      })
    ).toBeFalsy();
  });
});
