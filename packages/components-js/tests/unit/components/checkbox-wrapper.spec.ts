import { newSpecPage } from '@stencil/core/testing';
import { CheckboxWrapper } from '../../../src/components/form/checkbox/checkbox-wrapper';

describe('Component <p-checkbox-wrapper>', () => {

  it('should build', () => {
    expect(new CheckboxWrapper()).toBeTruthy();
  });

  it('should render correctly in default mode with shadow dom', async () => {
    const page = await newSpecPage({
      components: [CheckboxWrapper],
      html: `<p-checkbox-wrapper><input type="checkbox" name="some-name"/></p-checkbox-wrapper>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.querySelector('.p-checkbox-wrapper__icon-wrapper')).toBeFalsy();
    expect(page.root.shadowRoot.querySelector('.p-checkbox-wrapper__icon-wrapper')).toBeTruthy();
  });

  // TODO: add test for checked and disabled when changed programmatically
});
