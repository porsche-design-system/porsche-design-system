import { Page } from 'puppeteer';
import { getBrowser, initAddEventListener, setContentWithDesignSystem } from '../helpers';

describe('componentsReady', () => {
  let page: Page;

  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const getReadyAmount = (): Promise<number> =>
    page.evaluate(() => (window as any).porscheDesignSystem.componentsReady());

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

  it('should ignore other custom web components', async () => {
    await setContentWithDesignSystem(page, '<x-button>hi</x-button>');
    expect(await getReadyAmount()).toBe(0);
  });

  it('should work when called mulitple times', async () => {
    await setContentWithDesignSystem(page, `<p-button>Button</p-button>`);
    expect(await getReadyAmount()).toBe(1);
    expect(await getReadyAmount()).toBe(1);
    expect(await getReadyAmount()).toBe(1);
  });
});
