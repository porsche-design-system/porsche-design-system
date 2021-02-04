import { Page } from 'puppeteer';
import { setContentWithDesignSystem } from '../helpers';
import { browser } from '../config';

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
  <p-headline variant="headline-1">Some Headline</p-headline>
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
