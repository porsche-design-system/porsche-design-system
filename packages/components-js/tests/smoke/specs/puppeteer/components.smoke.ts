import type { Page } from 'puppeteer';
import { setContentWithDesignSystem } from './helpers';
import { getComponentChunkLinks } from '@porsche-design-system/components-js/partials';

describe('components', () => {
  let page: Page;
  beforeEach(async () => (page = await browser.newPage()));
  afterEach(async () => await page.close());

  it('should not emit lifecycleDOMEvents', async () => {
    const COUNTER_KEY = 'lifecycleCounter';
    const content = `
<script>
  window['${COUNTER_KEY}'] = 0;
  ['componentWillLoad', 'componentDidLoad', 'componentWillUpdate', 'componentDidUpdate'].forEach((event) => {
    window.addEventListener(\`stencil_\${event}\`, () => {
      window['${COUNTER_KEY}']++;
    });
  })
</script>

<p-content-wrapper>
  <p-marque></p-marque>
  <p-heading size="xx-large">Some Headline</p-heading>
  <p-button>Some label</p-button>
</p-content-wrapper>`;

    const getCountedEvents = (): Promise<number> =>
      page.evaluate((COUNTER_KEY: string) => window[COUNTER_KEY], COUNTER_KEY);

    await setContentWithDesignSystem(page, content);

    expect(await getCountedEvents()).toBe(0);

    await page.evaluate(() => {
      const event = new CustomEvent('stencil_componentWillUpdate');
      window.dispatchEvent(event);
    });

    expect(await getCountedEvents()).toBe(1);
  });
});

describe('chunk preloading', () => {
  let page: Page;
  beforeEach(async () => (page = await browser.newPage()));
  afterEach(async () => await page.close());

  it('should load porsche-design-system.v2.x.HASH.js chunk only once', async () => {
    await page.setRequestInterception(true);

    const requests: string[] = [];
    page.on('request', (req) => {
      const url = req.url();

      if (url.includes('cdn.ui.porsche') && url.endsWith('.js')) {
        requests.push(url);
      }
      req.continue();
    });

    const headContent = getComponentChunkLinks(); // only preload core
    await setContentWithDesignSystem(page, '', undefined, headContent);

    expect(requests.length).toBe(1);
    expect(requests[0]).toContain('porsche-design-system.v');
  });
});
