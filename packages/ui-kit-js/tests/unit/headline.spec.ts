import { newSpecPage } from '@stencil/core/testing';
import { Headline } from '../../src/components/basic/typography/headline/headline';

describe('Component <p-headline>', () => {

  it('builds', () => {
    expect(new Headline()).toBeTruthy();
  });

  it('should render correctly in default mode with shadow dom', async () => {
    const page = await newSpecPage({
      components: [Headline],
      html: `<p-headline>Headline</p-headline>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.querySelector('.p-headline')).toBeFalsy();
    expect(page.root.shadowRoot.querySelector('.p-headline')).toBeTruthy();
    expect(page.root).toMatchSnapshot();
  });

  it('should render correctly with tag of <h3>', async () => {
    const page = await newSpecPage({
      components: [Headline],
      html: `<p-headline tag="h3">Headline</p-headline>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('h3')).toBeTruthy();
  });
});
