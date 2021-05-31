import { getVisualRegressionStatesTester, getVisualRegressionTester, testOptions } from '../helpers';
import {
  CSS_ANIMATION_DURATION,
  forceFocused,
  forceFocusedHovered,
  forceHovered,
  getBody,
  setContentWithDesignSystem,
} from '../../e2e/helpers';

describe('Textarea Wrapper', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'textarea-wrapper',
        async () => {
          await vrt.goTo('/#textarea-wrapper');
        },
        testOptions
      )
    ).toBeFalsy();
  });
  it('should have no visual regression for :hover + :focus-visible', async () => {
    const vrt = getVisualRegressionStatesTester();
    expect(
      await vrt.test('textarea-wrapper-states', async () => {
        const page = await vrt.getPage();

        const head = `
          <link rel="stylesheet" href="styles.css" />
          <style type="text/css">p-textarea-wrapper:not(:last-child) { margin-bottom: 16px; }</style>`;

        const getElements = (): string => `
          <p-textarea-wrapper label="Some label" message="Some error validation message.">
            <textarea name="some-name"></textarea>
          </p-textarea-wrapper>
          <p-textarea-wrapper label="Some label" state="error" message="Some error validation message.">
            <textarea name="some-name"></textarea>
          </p-textarea-wrapper>
          <p-textarea-wrapper label="Some label" state="success" message="Some success validation message.">
            <textarea name="some-name"></textarea>
          </p-textarea-wrapper>`;

        await setContentWithDesignSystem(page, getBody(getElements), { injectIntoHead: head });

        await forceHovered(page, '.hovered > p-textarea-wrapper textarea');
        await forceFocused(page, '.focused > p-textarea-wrapper textarea');
        await forceFocusedHovered(page, '.focused-hovered > p-textarea-wrapper textarea');

        //wait for all style transitions to finish
        await page.waitForTimeout(CSS_ANIMATION_DURATION);
      })
    ).toBeFalsy();
  });
});
