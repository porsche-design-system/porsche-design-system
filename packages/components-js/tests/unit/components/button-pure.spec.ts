import { newSpecPage } from '@stencil/core/testing';
import { ButtonPure } from '../../../src/components/action/button-pure/button-pure';

describe('Component <p-button-pure>', () => {

  it('should build', () => {
    expect(new ButtonPure()).toBeTruthy();
  });

  it('should render correctly in default mode with shadow dom', async (done) => {
    const page = await newSpecPage({
      components: [ButtonPure],
      html: `<p-button-pure>Some label</p-button-pure>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.querySelector('.p-button-pure')).toBeFalsy();
    expect(page.root.shadowRoot.querySelector('.p-button-pure')).toBeTruthy();
    expect(page.root).toMatchSnapshot();
    done();
  });

  it('should render with type of submit', async (done) => {
    const page = await newSpecPage({
      components: [ButtonPure],
      html: `<p-button-pure type="submit">Some label</p-button-pure>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('button')).toEqualAttribute('type','submit');
    done();
  });

  it('should render with disabled tabbable capabilities', async (done) => {
    const page = await newSpecPage({
      components: [ButtonPure],
      html: `<p-button-pure tabbable="false">Some label</p-button-pure>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('button')).toEqualAttribute('tabindex','-1');
    done();
  });

  it('should have a disabled prop in button mode', async (done) => {
    const page = await newSpecPage({
      components: [ButtonPure],
      html: `<div></div>`
    });

    const component = page.doc.createElement('p-button-pure');

    (component as any).disabled = true;
    page.root.appendChild(component);
    await page.waitForChanges();

    expect(page.rootInstance.disabled).toBe(true);
    done();
  });

  it('should have a disabled prop in loading state', async (done) => {
    const page = await newSpecPage({
      components: [ButtonPure],
      html: `<p-button-pure loading="true">Some label</p-button-pure>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('button')).toEqualAttribute('disabled','');
    done();
  });
});
