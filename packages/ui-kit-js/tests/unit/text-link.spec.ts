import { newSpecPage } from '@stencil/core/testing';
import { TextLink } from '../../src/components/action/text-link/text-link';

describe('Component <p-text-link>', () => {

  it('should build', () => {
    expect(new TextLink()).toBeTruthy();
  });

  it('should render correctly in default mode with shadow dom', async () => {
    const page = await newSpecPage({
      components: [TextLink],
      html: `<p-text-link href="https://ui.porsche.com">Text Link</p-text-link>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.querySelector('a.p-text-link')).toBeFalsy();
    expect(page.root.shadowRoot.querySelector('a.p-text-link')).toBeTruthy();
    expect(page.root).toMatchSnapshot();
  });

  it('should render with href attribute', async () => {
    const page = await newSpecPage({
      components: [TextLink],
      html: `<p-text-link href="https://ui.porsche.com">Text Link</p-text-link>`,
    });
    expect(page.root.shadowRoot.querySelector('a')).toEqualAttribute('href','https://ui.porsche.com');
  });

  it('should render with target attribute of "_blank"', async () => {
    const page = await newSpecPage({
      components: [TextLink],
      html: `<p-text-link href="https://ui.porsche.com" target="blank">Text Link</p-text-link>`,
    });
    expect(page.root.shadowRoot.querySelector('a')).toEqualAttribute('target','_blank');
  });

  it('should render with download attribute of "picture"', async () => {
    const page = await newSpecPage({
      components: [TextLink],
      html: `<p-text-link href="https://ui.porsche.com" download="picture">Text Link</p-text-link>`,
    });
    expect(page.root.shadowRoot.querySelector('a')).toEqualAttribute('download','picture');
  });

  it('should render with <span> tag instead of <a>', async () => {
    const page = await newSpecPage({
      components: [TextLink],
      html: `<p-text-link tag="span">Text Link</p-text-link>`,
    });
    expect(page.root.shadowRoot.querySelector('span.p-text-link')).toBeTruthy();
  });
});
