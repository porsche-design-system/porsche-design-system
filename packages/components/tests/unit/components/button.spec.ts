import { newSpecPage } from '@stencil/core/testing';
import { Button } from '../../../src/components/action/button/button';

describe('Component <p-button>', () => {

  it('should render correctly in default mode with shadow dom', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: `<p-button>Some label</p-button>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.querySelector('.p-button')).toBeFalsy();
    expect(page.root.shadowRoot.querySelector('.p-button')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('button')).toEqualAttribute('aria-busy', null);
  });

  it('should render with type of submit', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: `<p-button type="submit">Some label</p-button>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('button')).toEqualAttribute('type', 'submit');
  });

  it('should render with disabled tabbable capabilities', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: `<p-button tabbable="false">Some label</p-button>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('button')).toEqualAttribute('tabindex', '-1');
  });

  it('should have a disabled prop in button mode', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: `<div></div>`
    });

    const component = page.doc.createElement('p-button');

    (component as any).disabled = true;
    page.root.appendChild(component);
    await page.waitForChanges();

    expect(page.rootInstance.disabled).toBe(true);
  });

  it('should have a disabled prop in loading state', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: `<p-button loading="true">Some label</p-button>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('button')).toEqualAttribute('disabled', '');
    expect(page.root.shadowRoot.querySelector('button')).toEqualAttribute('aria-busy', 'true');
  });
});
