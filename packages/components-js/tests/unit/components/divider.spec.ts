
import { newSpecPage } from '@stencil/core/testing';
import { Divider } from '../../../src/components/layout/divider/divider';

describe('Component <p-divider>', () => {

  it('should build', () => {
    expect(new Divider()).toBeTruthy();
  });

  it('should render correctly in default mode with shadow dom', async () => {
    const page = await newSpecPage({
      components: [Divider],
      html: `<p-divider></p-divider>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.querySelector('.p-divider')).toBeFalsy();
    expect(page.root.shadowRoot.querySelector('.p-divider')).toBeTruthy();
    expect(page.root).toMatchSnapshot();
  });
});
