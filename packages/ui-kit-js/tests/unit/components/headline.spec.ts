import { newSpecPage } from '@stencil/core/testing';
import { Headline } from '../../../src/components/basic/typography/headline/headline';

describe('Component <p-headline>', () => {

  it('should build', () => {
    expect(new Headline()).toBeTruthy();
  });

  it('should render correctly in default mode with shadow dom', async () => {
    const page = await newSpecPage({
      components: [Headline],
      html: `<p-headline>Some headline</p-headline>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.querySelector('h1.p-headline')).toBeFalsy();
    expect(page.root.shadowRoot.querySelector('h1.p-headline')).toBeTruthy();
    expect(page.root).toMatchSnapshot();
  });

  it('should render correctly with tag of <h3>', async () => {
    const page = await newSpecPage({
      components: [Headline],
      html: `<p-headline tag="h3">Some headline</p-headline>`,
    });
    expect(page.root.shadowRoot.querySelector('h3.p-headline')).toBeTruthy();
  });
});
