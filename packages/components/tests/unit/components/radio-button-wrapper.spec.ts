import { newSpecPage } from '@stencil/core/testing';
import { RadioButtonWrapper } from '../../../src/components/form/radio-button-wrapper/radio-button-wrapper';

describe('Component <p-radio-button-wrapper>', () => {

  it('should render correctly in default mode with shadow dom', async () => {
    const page = await newSpecPage({
      components: [RadioButtonWrapper],
      html: `<p-radio-button-wrapper label='Some label'><input type='radio' name='some-name'/></p-radio-button-wrapper>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.querySelector('.p-radio-button-wrapper__fake-radio-button')).toBeFalsy();
    expect(page.root.shadowRoot.querySelector('.p-radio-button-wrapper__fake-radio-button')).toBeTruthy();
  });
});
