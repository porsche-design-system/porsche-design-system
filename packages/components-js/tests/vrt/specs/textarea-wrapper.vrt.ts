import { getVisualRegressionStatesTester, getVisualRegressionTester, testOptions } from '../helpers';
import {
  forceFocusedState,
  forceFocusedHoveredState,
  forceHoveredState,
  getBodyMarkup,
  GetMarkup,
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
          <style type="text/css">
            p-textarea-wrapper:not(:last-child) { margin-bottom: 16px; }
            textarea { min-height: initial; }
          </style>`;

        const getElementsMarkup: GetMarkup = () => `
          <p-textarea-wrapper label="Some label" message="Some error validation message.">
            <textarea name="some-name"></textarea>
          </p-textarea-wrapper>
          <p-textarea-wrapper label="Disabled">
            <textarea name="some-name" disabled>Disabled</textarea>
          </p-textarea-wrapper>
          <p-textarea-wrapper label="Readonly">
            <textarea name="some-name" readonly>Readonly</textarea>
          </p-textarea-wrapper>
          <p-textarea-wrapper label="Some label" state="error" message="Some error validation message.">
            <textarea name="some-name"></textarea>
          </p-textarea-wrapper>
          <p-textarea-wrapper label="Some label" state="success" message="Some success validation message.">
            <textarea name="some-name"></textarea>
          </p-textarea-wrapper>
          <p-textarea-wrapper>
            <span slot="label">Some label with a <a href="#">link</a>.</span>
            <span slot="description">Some description with a <a href="#">link</a>.</span>
            <textarea name="some-name"></textarea>
          </p-textarea-wrapper>
          <p-textarea-wrapper label="Some label" description="Some description" state="error">
            <textarea name="some-name"></textarea>
            <span slot="message">Some error message with a <a href="#">link</a>.</span>
          </p-textarea-wrapper>
          <p-textarea-wrapper label="Some label" description="Some description" state="success">
            <textarea name="some-name"></textarea>
            <span slot="message">Some success message with a <a href="#">link</a>.</span>
          </p-textarea-wrapper>`;

        await setContentWithDesignSystem(page, getBodyMarkup(getElementsMarkup), { injectIntoHead: head });

        await forceHoveredState(page, '.hovered > p-textarea-wrapper textarea');
        await forceHoveredState(page, '.hovered > p-textarea-wrapper span a');
        await forceFocusedState(page, '.focused > p-textarea-wrapper textarea');
        await forceFocusedState(page, '.focused > p-textarea-wrapper span a');
        await forceFocusedHoveredState(page, '.focused-hovered > p-textarea-wrapper textarea');
        await forceFocusedHoveredState(page, '.focused-hovered > p-textarea-wrapper span a');
      })
    ).toBeFalsy();
  });
});
