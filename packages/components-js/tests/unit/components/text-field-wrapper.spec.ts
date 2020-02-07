import { newSpecPage } from '@stencil/core/testing';
import { TextFieldWrapper } from '../../../src/components/form/text-field-wrapper/text-field-wrapper';

describe('Component <p-text-field-wrapper>', () => {

  it('should build', () => {
    expect(new TextFieldWrapper()).toBeTruthy();
  });

  it('should render correctly in default mode with shadow dom', async (done) => {
    const page = await newSpecPage({
      components: [TextFieldWrapper],
      html: `<p-text-field-wrapper label="Some label"><input type="text" name="some-name"></p-text-field-wrapper>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.querySelector('.p-text-field-wrapper__wrapper')).toBeFalsy();
    expect(page.root.shadowRoot.querySelector('.p-text-field-wrapper__wrapper')).toBeTruthy();
    expect(page.root).toMatchSnapshot();
    done();
  });
});
