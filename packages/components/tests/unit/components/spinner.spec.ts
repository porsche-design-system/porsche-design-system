import { newSpecPage } from '@stencil/core/testing';
import { Spinner } from '../../../src/components/feedback/spinner/spinner';

describe('Component <p-spinner>', () => {

  it('should render correctly in default mode with shadow dom', async () => {
    const page = await newSpecPage({
      components: [Spinner],
      html: `<p-spinner></p-spinner>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.querySelector('.p-spinner')).toBeFalsy();
    expect(page.root.shadowRoot.querySelector('.p-spinner')).toBeTruthy();
  });
});
