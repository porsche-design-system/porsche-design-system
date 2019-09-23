import { newSpecPage } from '@stencil/core/testing';
import { ButtonIcon } from '../../src/components/action/button-icon/button-icon';

describe('Component <p-button-icon>', () => {

  it('builds', () => {
    expect(new ButtonIcon()).toBeTruthy();
  });

  it('should render correctly in default mode with shadow dom', async () => {
    const page = await newSpecPage({
      components: [ButtonIcon],
      html: `<p-button-icon></p-button-icon>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.querySelector('.p-button-icon')).toBeFalsy();
    expect(page.root.shadowRoot.querySelector('.p-button-icon')).toBeTruthy();
    expect(page.root).toMatchSnapshot();
  });

  it('should render correctly in link mode with shadow dom', async () => {
    const page = await newSpecPage({
      components: [ButtonIcon],
      html: `<p-button-icon href="https://ui.porsche.com"></p-button-icon>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('a')).toBeTruthy();
  });

  it('should render with type of submit', async () => {
    const page = await newSpecPage({
      components: [ButtonIcon],
      html: `<p-button-icon type="submit"></p-button-icon>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('button')).toEqualAttribute('type','submit');
  });

  it('should render with an aria label text', async () => {
    const page = await newSpecPage({
      components: [ButtonIcon],
      html: `<p-button-icon label="Text string"></p-button-icon>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('button')).toEqualAttribute('aria-label','Text string');
  });

  it('should not render with target of blank if in button mode', async () => {
    const page = await newSpecPage({
      components: [ButtonIcon],
      html: `<p-button-icon target="blank"></p-button-icon>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('[target="_blank"]')).toBeFalsy();
  });

  it('should render with target of blank if in link mode', async () => {
    const page = await newSpecPage({
      components: [ButtonIcon],
      html: `<p-button-icon href="https://ui.porsche.com" target="blank"></p-button-icon>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('a')).toEqualAttribute('target','_blank');
  });

  it('has a disabled prop in button mode', async () => {
    const page = await newSpecPage({
      components: [ButtonIcon],
      html: `<div></div>`
    });

    const component = page.doc.createElement('p-button-icon');

    (component as any).disabled = true;
    page.root.appendChild(component);
    await page.waitForChanges();

    expect(page.rootInstance.disabled).toBe(true);
  });

  it('has an aria-disabled attribute in link mode', async () => {
    const page = await newSpecPage({
      components: [ButtonIcon],
      html: `<p-button-icon href="https://ui.porsche.com" disabled></p-button-icon>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('a')).toEqualAttribute('aria-disabled','true');
  });

  it('should emit on click', async() => {
    const page = await newSpecPage({
      components: [ButtonIcon],
      html: `<p-button-icon>Button regular</p-button-icon>`,
    });
    const button = page.root.shadowRoot.querySelector('button');
    const buttonSpy = jest.fn();
    page.win.addEventListener('pClick', buttonSpy);
    await button.click();
    await page.waitForChanges();
    expect(buttonSpy).toHaveBeenCalled();
  });
});

