import { newSpecPage } from '@stencil/core/testing';
import { ButtonRegular } from '../../src/components/action/button-regular/button-regular';

describe('Component <p-button-regular>', () => {

  it('should build', () => {
    expect(new ButtonRegular()).toBeTruthy();
  });

  it('should render correctly in default mode with shadow dom', async () => {
    const page = await newSpecPage({
      components: [ButtonRegular],
      html: `<p-button-regular>Button regular</p-button-regular>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.querySelector('.p-button-regular')).toBeFalsy();
    expect(page.root.shadowRoot.querySelector('.p-button-regular')).toBeTruthy();
    expect(page.root).toMatchSnapshot();
  });

  it('should render correctly in link mode with shadow dom', async () => {
    const page = await newSpecPage({
      components: [ButtonRegular],
      html: `<p-button-regular href="https://ui.porsche.com">Button regular</p-button-regular>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('a')).toBeTruthy();
  });

  it('should render with type of submit', async () => {
    const page = await newSpecPage({
      components: [ButtonRegular],
      html: `<p-button-regular type="submit">Button regular</p-button-regular>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('button')).toEqualAttribute('type','submit');
  });

  it('should not render with target of blank if in button mode', async () => {
    const page = await newSpecPage({
      components: [ButtonRegular],
      html: `<p-button-regular target="blank">Button regular</p-button-regular>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('[target="_blank"]')).toBeFalsy();
  });

  it('should render with target of blank if in link mode', async () => {
    const page = await newSpecPage({
      components: [ButtonRegular],
      html: `<p-button-regular href="https://ui.porsche.com" target="blank">Button regular</p-button-regular>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('a')).toEqualAttribute('target','_blank');
  });

  it('should have a disabled attribute in button mode', async () => {
    const page = await newSpecPage({
      components: [ButtonRegular],
      html: `<div></div>`
    });

    const component = page.doc.createElement('p-button-regular');

    (component as any).disabled = true;
    page.root.appendChild(component);
    await page.waitForChanges();

    expect(page.rootInstance.disabled).toBe(true);
  });

  it('should have an aria-disabled attribute in link mode', async () => {
    const page = await newSpecPage({
      components: [ButtonRegular],
      html: `<p-button-regular href="https://ui.porsche.com" disabled>Button regular</p-button-regular>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('a')).toEqualAttribute('aria-disabled','true');
  });

  it('should emit on click', async() => {
    const page = await newSpecPage({
      components: [ButtonRegular],
      html: `<p-button-regular>Button regular</p-button-regular>`,
    });
    const button = page.root.shadowRoot.querySelector('button');
    const buttonSpy = jest.fn();
    page.win.addEventListener('pClick', buttonSpy);
    await button.click();
    await page.waitForChanges();
    expect(buttonSpy).toHaveBeenCalled();
  });
});
