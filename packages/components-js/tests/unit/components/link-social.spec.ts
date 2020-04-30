import { newSpecPage } from '@stencil/core/testing';
import { LinkSocial } from '../../../src/components/navigation/link-social/link-social';

describe('Component <p-link-social>', () => {

  it('should render correctly in default mode with shadow dom', async () => {
    const page = await newSpecPage({
      components: [LinkSocial],
      html: `<p-link-social href="https://www.some-url.com">Some label</p-link-social>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.querySelector('.p-link-social')).toBeFalsy();
    expect(page.root.shadowRoot.querySelector('.p-link-social')).toBeTruthy();
  });

  it('should render with href attribute', async () => {
    const page = await newSpecPage({
      components: [LinkSocial],
      html: `<p-link-social href="https://www.some-url.com">Some label</p-link-social>`,
    });
    expect(page.root.shadowRoot.querySelector('a')).toEqualAttribute('href', 'https://www.some-url.com');
  });

  it('should render with target attribute of "_blank"', async () => {
    const page = await newSpecPage({
      components: [LinkSocial],
      html: `<p-link-social href="https://www.some-url.com" target="_blank">Some label</p-link-social>`,
    });
    expect(page.root.shadowRoot.querySelector('a')).toEqualAttribute('target', '_blank');
  });

  it('should render with rel attribute of "nofollow noopener"', async () => {
    const page = await newSpecPage({
      components: [LinkSocial],
      html: `<p-link-social href="https://www.some-url.com" rel="nofollow noopener">Some label</p-link-social>`,
    });
    expect(page.root.shadowRoot.querySelector('a')).toEqualAttribute('rel', 'nofollow noopener');
  });

  it('should render with <span> tag instead of <a>', async () => {
    const page = await newSpecPage({
      components: [LinkSocial],
      html: `<p-link-social>Some label</p-link-social>`,
    });
    expect(page.root.shadowRoot.querySelector('span.p-link-social')).toBeTruthy();
  });
});
