import { newSpecPage } from '@stencil/core/testing';
import { Headline } from '../../../src/components/basic/typography/headline/headline';

describe('Component <p-headline>', () => {

  it('should render correctly in default mode with shadow dom', async () => {
    const page = await newSpecPage({
      components: [Headline],
      html: `<p-headline>Some headline</p-headline>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.querySelector('h1.p-headline')).toBeFalsy();
    expect(page.root.shadowRoot.querySelector('h1.p-headline')).toBeTruthy();
  });

  it('should render correctly with tag of <h3>', async () => {
    const page = await newSpecPage({
      components: [Headline],
      html: `<p-headline variant="headline-1" tag="h3">Some headline</p-headline>`,
    });
    expect(page.root.shadowRoot.querySelector('h3.p-headline')).toBeTruthy();
  });

  it('should render correctly with tag of <div> if tag is set as slot', async () => {
    const page = await newSpecPage({
      components: [Headline],
      html: `<p-headline variant="headline-1"><h3>Some headline</h3></p-headline>`,
    });
    expect(page.root.shadowRoot.querySelector('div.p-headline')).toBeTruthy();
  });
});
