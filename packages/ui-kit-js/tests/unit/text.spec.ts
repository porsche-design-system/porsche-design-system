import { newSpecPage } from '@stencil/core/testing';
import { Text } from '../../src/components/basic/typography/text/text';

describe('Component <p-text>', () => {

  it('builds', () => {
    expect(new Text()).toBeTruthy();
  });

  it('should render correctly in default mode with shadow dom', async () => {
    const page = await newSpecPage({
      components: [Text],
      html: `<p-text>Text</p-text>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.querySelector('.p-text')).toBeFalsy();
    expect(page.root.shadowRoot.querySelector('.p-text')).toBeTruthy();
    expect(page.root).toMatchSnapshot();
  });

  it('should render correctly with tag of <span>', async () => {
    const page = await newSpecPage({
      components: [Text],
      html: `<p-text tag="span">Headline</p-text>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('span')).toBeTruthy();
  });
});
