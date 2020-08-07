import { newSpecPage } from '@stencil/core/testing';
import { LinkPure } from '../../../src/components/navigation/link-pure/link-pure';

describe('Component <p-link-pure>', () => {

  it('should render correctly in default mode with shadow dom', async () => {
    const page = await newSpecPage({
      components: [LinkPure],
      html: `<p-link-pure href="https://designsystem.porsche.com">Some label</p-link-pure>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.querySelector('.p-link-pure')).toBeFalsy();
    expect(page.root.shadowRoot.querySelector('.p-link-pure')).toBeTruthy();
  });

  it('should render with href attribute', async () => {
    const page = await newSpecPage({
      components: [LinkPure],
      html: `<p-link-pure href="https://designsystem.porsche.com">Some label</p-link-pure>`,
    });
    expect(page.root.shadowRoot.querySelector('a')).toEqualAttribute('href', 'https://designsystem.porsche.com');
  });

  it('should render with target attribute of "_blank"', async () => {
    const page = await newSpecPage({
      components: [LinkPure],
      html: `<p-link-pure href="https://designsystem.porsche.com" target="_blank">Some label</p-link-pure>`,
    });
    expect(page.root.shadowRoot.querySelector('a')).toEqualAttribute('target', '_blank');
  });

  it('should render with download attribute of "picture"', async () => {
    const page = await newSpecPage({
      components: [LinkPure],
      html: `<p-link-pure href="https://designsystem.porsche.com" download="picture">Some label</p-link-pure>`,
    });
    expect(page.root.shadowRoot.querySelector('a')).toEqualAttribute('download', 'picture');
  });

  it('should render with <span> tag instead of <a>', async () => {
    const page = await newSpecPage({
      components: [LinkPure],
      html: `<p-link-pure>Some label</p-link-pure>`,
    });
    expect(page.root.shadowRoot.querySelector('span.p-link-pure')).toBeTruthy();
  });
});

