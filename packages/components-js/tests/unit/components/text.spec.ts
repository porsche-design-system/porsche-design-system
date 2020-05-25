import { newSpecPage } from '@stencil/core/testing';
import { Text } from '../../../src/components/basic/typography/text/text';

describe('Component <p-text>', () => {

  it('should render correctly in default mode with shadow dom', async () => {
    const page = await newSpecPage({
      components: [Text],
      html: `<p-text>Some text</p-text>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.querySelector('p.p-text')).toBeFalsy();
    expect(page.root.shadowRoot.querySelector('p.p-text')).toBeTruthy();
  });

  it('should render correctly with tag of <span>', async () => {
    const page = await newSpecPage({
      components: [Text],
      html: `<p-text tag="span">Some text</p-text>`,
    });
    expect(page.root.shadowRoot.querySelector('span.p-text')).toBeTruthy();
  });

  it('should render correctly with tag of <p> if tag is set as slot', async () => {
    const page = await newSpecPage({
      components: [Text],
      html: `<p-text><p>Some text</p></p-text>`,
    });
    expect(page.root.shadowRoot.querySelector('div.p-text')).toBeTruthy();
  });
});
