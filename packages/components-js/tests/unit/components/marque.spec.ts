import { newSpecPage } from '@stencil/core/testing';
import { Marque } from '../../../src/components/basic/marque/marque';

describe('Component <p-marque>', () => {

  it('should render correctly in default mode with shadow dom', async () => {
    const page = await newSpecPage({
      components: [Marque],
      html: `<p-marque></p-marque>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.querySelector('.p-marque')).toBeFalsy();
    expect(page.root.shadowRoot.querySelector('.p-marque')).toBeTruthy();
  });
});
