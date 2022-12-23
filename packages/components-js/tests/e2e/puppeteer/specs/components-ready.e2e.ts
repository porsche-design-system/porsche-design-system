import type { Page } from 'puppeteer';
import type { TagName } from '@porsche-design-system/shared';
import { setContentWithDesignSystem } from '../helpers';

describe('componentsReady', () => {
  let page: Page;
  beforeEach(async () => (page = await browser.newPage()));
  afterEach(async () => await page.close());

  const getReadyAmount = (selector?: string): Promise<number> =>
    page.evaluate((selector: string) => {
      const el = selector ? document.querySelector(selector) : undefined;
      return (window as any).porscheDesignSystem.componentsReady(el);
    }, selector);

  const addComponent = (tagName: TagName) =>
    page.evaluate((tagName: string) => {
      const el = document.createElement(tagName);
      document.body.appendChild(el);
    }, tagName);

  it('should work for no component', async () => {
    await setContentWithDesignSystem(page, ``);
    expect(await getReadyAmount()).toBe(0);
  });

  it('should work for single component', async () => {
    await setContentWithDesignSystem(page, `<p-button>Button</p-button>`);
    expect(await getReadyAmount()).toBe(1);
  });

  it('should work for multiple components', async () => {
    await setContentWithDesignSystem(page, `<p-button>Button1</p-button><p-button>Button2</p-button>`);
    expect(await getReadyAmount()).toBe(2);
  });

  it('should work for prefixed component', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <script type="text/javascript">porscheDesignSystem.load({ prefix: 'my-prefix' });</script>
      <my-prefix-p-button>Button</my-prefix-p-button>`
    );
    expect(await getReadyAmount()).toBe(1);
  });

  it('should work for nested component', async () => {
    await setContentWithDesignSystem(page, `<div><p-button>Button</p-button></div>`);
    expect(await getReadyAmount()).toBe(1);
  });

  it('should work with HTMLElement parameter', async () => {
    await setContentWithDesignSystem(
      page,
      `<p-button>Button</p-button><div id="sidebar"><p-button>Button</p-button></div>`
    );
    expect(await getReadyAmount('#sidebar')).toBe(1);
    expect(await getReadyAmount()).toBe(2); // for document.body
  });

  it('should ignore other custom web components', async () => {
    await setContentWithDesignSystem(page, '<x-button>hi</x-button>');
    expect(await getReadyAmount()).toBe(0);
  });

  it('should work when called multiple times', async () => {
    await setContentWithDesignSystem(page, `<p-button>Button</p-button>`);
    expect(await getReadyAmount()).toBe(1);
    expect(await getReadyAmount()).toBe(1);
    expect(await getReadyAmount()).toBe(1);
  });

  it('should work when a component is added later', async () => {
    await setContentWithDesignSystem(page, `<p-button>Button1</p-button><p-button>Button2</p-button>`);
    expect(await getReadyAmount()).toBe(2);

    await addComponent('p-text');
    expect(await getReadyAmount()).toBe(3);
  });

  it('should work in parallel', async () => {
    await setContentWithDesignSystem(page, ``);

    let val1, val2;
    await addComponent('p-text');

    getReadyAmount().then((x) => (val1 = x));
    getReadyAmount().then((x) => (val2 = x));

    expect(await getReadyAmount()).toBe(1);
    expect(val1).toBe(1);
    expect(val1).toBe(val2);

    await addComponent('p-button');

    getReadyAmount().then((x) => (val1 = x));
    getReadyAmount().then((x) => (val2 = x));

    expect(await getReadyAmount()).toBe(2);
    expect(val1).toBe(2);
    expect(val1).toBe(val2);
  });
});
