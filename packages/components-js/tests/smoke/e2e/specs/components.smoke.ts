import { test, expect } from '@playwright/test';
import { getComponentChunkLinks } from '@porsche-design-system/components-js/partials';
import { setContentWithDesignSystem } from '../helpers';

test.describe('components', () => {
  test('should not emit lifecycleDOMEvents', async ({ page }) => {
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

<p-crest></p-crest>
<p-heading size="xx-large">Some Headline</p-heading>
<p-button>Some label</p-button>
`;

    function getCountedEvents(): Promise<number> {
      return page.evaluate((COUNTER_KEY: string) => window[COUNTER_KEY], COUNTER_KEY);
    }

    await setContentWithDesignSystem(page, content);

    expect(await getCountedEvents()).toBe(0);

    await page.evaluate(() => {
      const event = new CustomEvent('stencil_componentWillUpdate');
      window.dispatchEvent(event);
    });

    expect(await getCountedEvents()).toBe(1);
  });
});

test.describe('chunk preloading', () => {
  test(`should load porsche-design-system.v3.x.HASH.js chunk only once`, async ({ page }) => {
    const requests: string[] = [];
    page.on('request', (req) => {
      const url = req.url();

      if (url.includes('cdn.ui.porsche') && url.endsWith('.js')) {
        requests.push(url);
      }
    });

    const headContent = getComponentChunkLinks(); // only preload core
    await setContentWithDesignSystem(page, '', undefined, headContent);

    expect(requests.length).toBe(1);
    expect(requests[0]).toContain('porsche-design-system.v');
  });
});
