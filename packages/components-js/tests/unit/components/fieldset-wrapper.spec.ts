import { newSpecPage } from '@stencil/core/testing';
import { FieldsetWrapper } from '../../../src/components/form/fieldset-wrapper/fieldset-wrapper';

describe('Component <p-fieldset-wrapper>', () => {

  it('should render correctly in default mode with shadow dom', async () => {
    const page = await newSpecPage({
      components: [FieldsetWrapper],
      html: `<p-fieldset-wrapper label='Some label'></p-fieldset-wrapper>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.querySelector('.p-fieldset-wrapper')).toBeFalsy();
    expect(page.root.shadowRoot.querySelector('.p-fieldset-wrapper')).toBeTruthy();
  });
});
