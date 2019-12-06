import { newSpecPage } from '@stencil/core/testing';
import { Button } from '../../../src/components/action/button/button';

describe('Component <p-button>', () => {

  it('should build', () => {
    expect(new Button()).toBeTruthy();
  });

  it('should render correctly in default mode with shadow dom', async (done) => {
    const page = await newSpecPage({
      components: [Button],
      html: `<p-button>Some label</p-button>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.querySelector('.p-button')).toBeFalsy();
    expect(page.root.shadowRoot.querySelector('.p-button')).toBeTruthy();
    expect(page.root).toMatchSnapshot();
    done();
  });

  it('should render with type of submit', async (done) => {
    const page = await newSpecPage({
      components: [Button],
      html: `<p-button type="submit">Some label</p-button>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('button')).toEqualAttribute('type','submit');
    done();
  });

  it('should render with disabled tabbable capabilities', async (done) => {
    const page = await newSpecPage({
      components: [Button],
      html: `<p-button tabbable="false">Some label</p-button>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('button')).toEqualAttribute('tabindex','-1');
    done();
  });

  it('should have a disabled prop in button mode', async (done) => {
    const page = await newSpecPage({
      components: [Button],
      html: `<div></div>`
    });

    const component = page.doc.createElement('p-button');

    (component as any).disabled = true;
    page.root.appendChild(component);
    await page.waitForChanges();

    expect(page.rootInstance.disabled).toBe(true);
    done();
  });

  it('should have a disabled prop in loading state', async (done) => {
    const page = await newSpecPage({
      components: [Button],
      html: `<p-button loading="true">Some label</p-button>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('button')).toEqualAttribute('disabled','');
    done();
  });
});
