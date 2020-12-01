import { Page } from 'puppeteer';
import { addEventListener, getBrowser, initAddEventListener, selectNode, setContentWithDesignSystem } from '../helpers';

describe('componentsReady', () => {
  let page: Page;

  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const isReady = () =>
    page.evaluate(async () => {
      await (window as any).porscheDesignSystem.componentsReady();
      return true;
    });

  it('should work for no component', async () => {
    await setContentWithDesignSystem(page, ``);
    expect(await isReady()).toBeTrue();
  });

  it('should work for single component', async () => {
    await setContentWithDesignSystem(page, `<p-button>Button</p-button>`);
    expect(await isReady()).toBeTrue();
  });

  it('should work for multiple components', async () => {
    await setContentWithDesignSystem(page, `<p-button>Button1</p-button><p-button>Button2</p-button>`);
    expect(await isReady()).toBeTrue();
  });

  it('should work for componentDidUpdate', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-tabs-bar>
        <button>Tab 1</button>
        <button>Tab 2</button>
        <button>Tab 3</button>
      </p-tabs-bar>`
    );

    expect(await isReady()).toBeTrue();

    const host = await selectNode(page, 'p-tabs-bar');
    const [button1, button2, button3] = await host.$$('button');

    let eventCounter = 0;
    await addEventListener(host, 'tabChange', () => eventCounter++);

    await button2.click();
    expect(await isReady()).toBeTrue();
    expect(eventCounter).toBe(1);
  });

  xit('should ignore other stencil libraries', async () => {
    const COUNTER_KEY = 'COUNTER_KEY';
    await page.evaluate((COUNTER_KEY: string): void => {
      window[COUNTER_KEY] = 0;
      console.log('addEventListener');
      window.addEventListener('stencil_componentWillUpdate', (e: CustomEvent) => {
        console.log(e);
        window[COUNTER_KEY]++;
      });
    }, COUNTER_KEY);

    const getCounter = (): Promise<number> =>
      page.evaluate((COUNTER_KEY: string): number => window[COUNTER_KEY], COUNTER_KEY);

    // expect(await getCounter()).toBe(0);
    await setContentWithDesignSystem(page, '<p-button>hi</p-button>');
    // expect(await getCounter()).toBe(0);
    // expect(await isReady()).toBeTrue();

    await page.evaluate(() => {
      const ev = new CustomEvent('stencil_componentWillUpdate', {
        bubbles: true,
        composed: true,
        detail: {
          namespace: 'someNamespace',
        },
      });
      const x = document.querySelector('p-button').dispatchEvent(ev);
      console.log('dispatched', x);
    });

    await page.waitForTimeout(3000);
    expect(await getCounter()).toBe(1);
    expect(await isReady()).toBeTrue();
  });
});
